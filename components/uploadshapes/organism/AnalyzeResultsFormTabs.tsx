'use client'
import React, { useState } from 'react'
import { Button } from '@nextui-org/react'
import useUploadShapesServices from '@/hooks/uploadshapes/useUploadShapesServices'
import { CreateShapesElements } from '@/types/uploadShapes'
import { CiRouter } from 'react-icons/ci'
import { PiPolygonBold } from 'react-icons/pi'
import _ from 'lodash'
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { AnalyzeResultsNewDevicesContentTab } from './AnalyzeResultsNewDevicesContentTab'
import { toast } from 'react-hot-toast'
import { AnalyzeResultsNewPolygonsContentTab } from './AnalyzeResultsNewPolygonsContentTab'
import useUploadShapes from '@/hooks/uploadshapes/useUploadShapes'

interface Props {
  setCreateShapesResult: Function
}

export enum polygonType {
  coverage = 'cobertura',
  blackhole = 'exclusión'
}

export const AnalyzeResultsFormTabs = ({ setCreateShapesResult }: Props) => {
  const { newPolygons, newDevices, setAnalyzeShapesResult } = useUploadShapes()
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const { createShapeElementsService } = useUploadShapesServices()

  const handleCreateElements = async () => {
    try {
      setIsCreating(true)
      const result = (await createShapeElementsService({
        newDevices: newDevices,
        newPolygons: newPolygons
      })) as CreateShapesElements
      setAnalyzeShapesResult({} as any)
      if (result.newDevices.length === 0 && result.newPolygons.length === 0)
        throw new Error('No se crearon elementos')
      setCreateShapesResult(result)
      toast.success('Elementos creados correctamente')
    } catch (error) {
      toast.error('Error al crear los elementos')
    } finally {
      setIsCreating(false)
    }
  }

  const isCreateElementsDisabled = () => {
    let isDisabled = true
    let completeDeviceDataCount = 0
    let completePolygonDataCount = 0
    if (newDevices.length === 0 && newPolygons.length === 0) return isDisabled
    newDevices.forEach((action) => {
      if (
        action.parentRelation?.deviceTypeId !== null &&
        action.parentRelation?.devicePortNumber !== null &&
        action.parentRelation?.parentPortId !== null
      ) {
        completeDeviceDataCount++
      }
    })
    newPolygons.forEach((action) => {
      if (action) {
        completePolygonDataCount++
      }
    })
    if (completeDeviceDataCount > 0 || completePolygonDataCount > 0)
      isDisabled = false
    return isDisabled
  }

  const countCompleteDeviceData = () => {
    let completeDeviceDataCount = 0
    newDevices.forEach((action) => {
      if (
        action.parentRelation?.deviceTypeId !== null &&
        action.parentRelation?.devicePortNumber !== null &&
        action.parentRelation?.parentPortId !== null
      ) {
        completeDeviceDataCount++
      }
    })
    return `${completeDeviceDataCount}/${newDevices.length}`
  }

  return (
    <div className='flex w-full flex-col'>
      <Tabs aria-label='Options' variant='bordered'>
        {newDevices.some((element) => element.hasConflict === false) && (
          <Tab
            key='newDevices'
            defaultChecked={true}
            title={
              <div className='flex items-center space-x-2'>
                <CiRouter className='h-6 w-6 text-green-500' />
                <span>
                  <p className='text-lg font-bold'>
                    Nuevos dispositivos {countCompleteDeviceData()}
                  </p>
                </span>
              </div>
            }
          >
            <Card>
              <CardBody>
                <AnalyzeResultsNewDevicesContentTab />
              </CardBody>
            </Card>
          </Tab>
        )}
        {newPolygons.length > 0 && (
          <Tab
            key='newExclutionPolygons'
            title={
              <div className='flex items-center space-x-2'>
                <PiPolygonBold className='h-6 w-6 text-green-500' />
                <PiPolygonBold className='h-6 w-6 text-red-500' />
                <span className='text-lg font-bold'>
                  <p className='text-lg font-bold'>Coberturas y Blackholes</p>
                </span>
              </div>
            }
          >
            <Card>
              <CardBody>
                <AnalyzeResultsNewPolygonsContentTab />
              </CardBody>
            </Card>
          </Tab>
        )}
      </Tabs>
      <div className='container grid grid-cols-12 gap-1'>
        <div className='col-start-6 col-span-2 justify-center'>
          <Button
            color='primary'
            className='bg-blue-500 text-white font-bold text-1xl px-4 py-4 rounded-lg w-full inline-flex items-center justify-center hover:bg-blue-600 transition-colors duration-300'
            onClick={handleCreateElements}
            endContent={<PlusCircleIcon />}
            isLoading={isCreating}
            isDisabled={isCreateElementsDisabled()}
          >
            Crear elementos
          </Button>
        </div>
      </div>
    </div>
  )
}
