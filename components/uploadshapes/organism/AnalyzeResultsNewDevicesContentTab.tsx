'use client'
import React, { useState, useEffect } from 'react'
import { Button, Card, CardBody } from '@nextui-org/react'
import DeviceTypePortSelect from '../../shared/DeviceTypePortSelect'
import DevicePortSelect from '../../shared/DevicePortSelect'
import { DevicePort, DeviceType, DeviceTypePort } from '@/types/devices'
import { NewDevice } from '@/types/uploadShapes'
import _ from 'lodash'
import {
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/20/solid'
import { TbPlugConnectedX, TbPlugConnected } from 'react-icons/tb'
import { twMerge } from 'tailwind-merge'
import { MapIcon } from '@heroicons/react/24/solid'
import { MarkerMap } from '@/types/map'
import MapPreviewModal from '../molecules/MapPreviewModal'
import useUploadShapes from '@/hooks/uploadshapes/useUploadShapes'

interface Props {}

export const AnalyzeResultsNewDevicesContentTab = ({}: Props) => {
  const {
    newDevices,
    setNewDevices,
    newDeviceSuggestions,
    deviceTypesSuggestions
  } = useUploadShapes()
  const [openMapPreview, setOpenMapPreview] = useState<boolean>(false)
  const [previewMarkers, setPreviewMarkers] = useState<MarkerMap[]>([])

  const handleSetDeviceTypePort = ({
    deviceType,
    port,
    deviceIdReference
  }: {
    deviceType: DeviceType
    port: DeviceTypePort
    deviceIdReference: any
  }) => {
    let newActions = _.cloneDeep(newDevices)
    newActions.forEach((action) => {
      if (action.id === deviceIdReference) {
        action.parentRelation!.devicePortNumber = port?.portNumber ?? null
        action.parentRelation!.deviceTypeId = deviceType?._id ?? null
      }
    })
    setNewDevices(newActions)
  }

  const handleSetConnection = ({
    port,
    deviceIdReference
  }: {
    port: DevicePort
    deviceIdReference: string
  }) => {
    let newActions = _.cloneDeep(newDevices)
    newActions.forEach((action) => {
      if (action.id === deviceIdReference) {
        action.parentRelation!.parentPortId = port.portId
      }
    })
    setNewDevices(newActions)
  }

  useEffect(() => {
    let newDeviceMarkers = [] as MarkerMap[]
    newDevices.forEach((device) => {
      if (device.newDeviceData.geoLocation !== undefined) {
        newDeviceMarkers.push({
          id: device.id,
          name: device.newDeviceData.name,
          geoLocation: device.newDeviceData.geoLocation
        })
      }
    })
    if (newDeviceMarkers.length > 0) {
      setPreviewMarkers(newDeviceMarkers)
    }
  }, [newDevices])

  return (
    <>
      <MapPreviewModal
        open={openMapPreview}
        setOpen={setOpenMapPreview}
        newPoints={previewMarkers}
      />
      {!_.isEmpty(newDevices) && (
        <div className='grid grid-cols-1 gap-2'>
          <div className='col-span-1 grid grid-cols-5 gap-4'>
            <div className='col-start-5 col-span-1 '>
              <Button
                //color={'primary'}
                className='bg-cyan-500 text-white font-bold text-1xl px-4 py-2 rounded-lg w-full inline-flex items-center justify-center hover:bg-blue-600 transition-colors duration-300'
                onClick={() => setOpenMapPreview(true)}
                endContent={<MapIcon />}
              >
                Previsualizar elementos
              </Button>
            </div>
          </div>
          <div className='col-span-1 grid grid-cols-6 gap-2'>
            {newDevices.map((newDevice: NewDevice, index: number) => {
              let deviceParentDefault = {} as any
              let deviceParentPortDefault = {} as any

              const oltCardName = newDevice.newDeviceData.oltCard?.name
              if (
                oltCardName !== undefined &&
                newDeviceSuggestions !== undefined
              ) {
                deviceParentDefault = newDeviceSuggestions.find(
                  (device: any) => device['name'] === oltCardName
                )
                deviceParentPortDefault = deviceParentDefault?.ports.find(
                  (port: DevicePort) =>
                    port.name === newDevice?.newDeviceData?.oltCardPort?.name
                )
              }
              let defaultDeviceType = {} as DeviceType
              if (newDevice.parentRelation?.deviceTypeId !== null) {
                let deviceType = deviceTypesSuggestions.find(
                  (deviceType) =>
                    deviceType._id === newDevice.parentRelation?.deviceTypeId
                )
                if (deviceType !== undefined) {
                  defaultDeviceType = deviceType
                }
              }

              let isDeviceDataComplete =
                newDevice.parentRelation?.devicePortNumber !== null &&
                newDevice.parentRelation?.parentPortId !== null &&
                newDevice.parentRelation?.deviceTypeId !== null
              return (
                <div className='col-span-2 space-x-4' key={index}>
                  <Card>
                    <CardBody>
                      <div className='grid grid-cols-5 gap-1'>
                        <div className='col-start-2 col-span-3  self-center'>
                          <h4 className='text-lg font-medium text-center m-1 text-blue-600'>
                            {newDevice.newDeviceData.name}
                          </h4>
                        </div>
                        <div className='col-start-5 col-span-1  self-center place-content-end flex m-1'>
                          {isDeviceDataComplete ? (
                            <CheckCircleIcon className=' fill-green-500 w-8' />
                          ) : (
                            <ExclamationCircleIcon className=' fill-gray-400 w-8' />
                          )}
                        </div>

                        <div className='col-span-5'>
                          <DeviceTypePortSelect
                            handleSelectPort={handleSetDeviceTypePort}
                            deviceIdReference={newDevice.id}
                            defaultDeviceType={defaultDeviceType}
                          />
                        </div>
                        <div className='col-span-5 align-middle flex place-content-left my-1 mt-4 '>
                          {!isDeviceDataComplete ? (
                            <TbPlugConnectedX size={'18px'} color={'#94a3b8'} />
                          ) : (
                            <TbPlugConnected color={'#22c55e'} />
                          )}
                          <h5
                            className={twMerge(
                              `font-bold text-[10px] ${
                                isDeviceDataComplete
                                  ? 'text-green-500'
                                  : 'text-gray-400'
                              }`
                            )}
                          >
                            Conectado a
                          </h5>
                        </div>
                        <div className='col-span-5'>
                          <DevicePortSelect
                            handleSelectPort={handleSetConnection}
                            defaultDevice={deviceParentDefault}
                            defaultDevicePort={deviceParentPortDefault}
                            deviceIdReference={newDevice.id}
                          />
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}
