'use client'
import React, { useRef, useState } from 'react'
import _ from 'lodash'
import { twMerge } from 'tailwind-merge'
import UploadSelectedFileCard from '../molecules/UploadSelectedFileCard'
import useUploadShapesServices from '@/hooks/uploadshapes/useUploadShapesServices'
import PageTitle from '@/components/shared/PageTitle'
import { Button } from '@nextui-org/react'
import {
  NewDevice,
  NewPolygon,
  AnalyzeShapesResult,
  CreateShapesElements
} from '@/types/uploadShapes'
import { CloudArrowUpIcon } from '@heroicons/react/24/solid'
import { AnalyzeResultsFormTabs } from './AnalyzeResultsFormTabs'
import { CreateShapesResultTable } from './CreateShapesResultTable'
import useUploadShapes from '@/hooks/uploadshapes/useUploadShapes'
import { Device, DevicePort, DeviceType } from '@/types/devices'
import toast from 'react-hot-toast'
import NoShapesFound from '../molecules/NoShapesFound'

// TODO: Validar contenido de zip
// TODO: Mensaje de warning si no es un zip
export default function UploadShapesForm() {
  const { analyzeShapesService } = useUploadShapesServices()
  const {
    analyzeShapesResult,
    setNewPolygons,
    setNewDevices,
    setNewDeviceSuggestions,
    setDeviceTypeSuggestions,
    setAnalyzeShapesResult
  } = useUploadShapes()
  const [selectedFiles, setselectedFiles] = useState<File[]>([])
  const [createShapesResult, setCreateShapesResult] =
    useState<CreateShapesElements>({} as CreateShapesElements)
  const [noNewShapesResults, setNoNewShapesResults] = useState<boolean>(false)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [dragActive, setDragActive] = useState<boolean>(false)
  const fileInput = useRef<HTMLInputElement>(null)
  const dragActiveClass = twMerge(
    'mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-blue-400  p-6 text-center h-80 justify-center',
    dragActive ? 'bg-blue-100' : 'bg-white'
  )

  const handleSetFiles = (files: FileList) => {
    const validFiles = Array.from(files).filter((file: any) => {
      return file.name.endsWith('.zip')
    }) as File[]
    if (validFiles.length === 0) return
    let newFiles = selectedFiles.concat(validFiles)
    setselectedFiles(newFiles)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const files = event.currentTarget.files ?? []
    if (files.length === 0) return
    const hasInvalidFiles = Array.from(files).some(
      (file: any) => !file.name.endsWith('.zip')
    )
    if (hasInvalidFiles) alert('Se descartaron los archivos que no son .zip')
    handleSetFiles(files as FileList)
  }

  const handleDeleteFile = (fileName: string) => {
    let newFiles = selectedFiles.filter((file) => file.name !== fileName)
    if (newFiles.length === 0) handleCleanFiles(true)
    else setselectedFiles(newFiles)
    if (fileInput.current) fileInput.current.value = ''
  }

  const handleDrag = function (e: any) {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = function (e: React.DragEvent<HTMLInputElement>) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const files = e.dataTransfer.files ?? ([] as File[])
    if (files.length === 0) return
    handleSetFiles(files)
  }

  const handleOnClickUpload = async () => {
    try {
      handleCleanFiles()
      setIsUploading(true)
      let result = (await analyzeShapesService({
        files: selectedFiles
      })) as AnalyzeShapesResult
      if (result) {
        if (result.newDevices.length === 0 && result.newPolygons.length === 0) {
          setNoNewShapesResults(true)
          return
        }
        setAnalyzeShapesResult(result)

        if (
          result.newDevices.length > 0 &&
          result.newDevices.some((element: any) => !element.hasConflict)
        ) {
          let devicesWithActions = createDeviceActions(
            result.newDevices,
            result.deviceHelpers,
            result.deviceTypeHelpers
          )
          setNewDevices(devicesWithActions)
          setNewDeviceSuggestions(result.deviceHelpers)
          setDeviceTypeSuggestions(result.deviceTypeHelpers)
        }
        if (
          result.newPolygons.length > 0 &&
          result.newPolygons.filter((element: any) => !element.hasConflict)
            .length > 0
        ) {
          let polygonsWithActions = createPolygonsActions(result.newPolygons)
          setNewPolygons(polygonsWithActions)
        }
      }
    } catch (error) {
      toast.error('Error al cargar los archivos')
      console.log(error)
    } finally {
      setIsUploading(false)
    }
  }

  const createPolygonsActions = (newPolygons: NewPolygon[]) => {
    let newPolygonsActions = newPolygons
      .filter((shape) => !shape.hasConflict)
      .map((element: NewPolygon) => {
        return {
          ...element,
          id: Math.random().toString(36).substring(2, 9)
        }
      })
    return newPolygonsActions
  }

  const createDeviceActions = (
    newDevices: NewDevice[],
    newDeviceSuggestions: Device[],
    deviceTypesSuggestions: DeviceType[]
  ) => {
    let newDevicesWithId = newDevices
      .filter((shape) => !shape.hasConflict)
      .map((element: NewDevice) => {
        let deviceParentDefault = {} as any
        let deviceParentPortDefault = {} as any
        let oltCardName = element?.newDeviceData?.oltCard?.name
        if (oltCardName !== undefined && newDeviceSuggestions !== undefined) {
          deviceParentDefault = newDeviceSuggestions.find(
            (device: any) => device['name'] === oltCardName
          )
          deviceParentPortDefault = deviceParentDefault?.ports.find(
            (port: DevicePort) =>
              port.name === element?.newDeviceData?.oltCardPort?.name
          )
        }
        let deviceTypeDefault
        let deviceTypePortDefault
        if (element.newDeviceData.suggestedDeviceTypeId !== undefined) {
          deviceTypeDefault = deviceTypesSuggestions?.find(
            (deviceType: DeviceType) =>
              deviceType._id === element.newDeviceData.suggestedDeviceTypeId
          )
          if (deviceTypeDefault) {
            deviceTypePortDefault = deviceTypeDefault?.ports.find(
              (port) => port?.isSlave === true
            )
          }
        }
        return {
          ...element,
          id: Math.random().toString(36).substring(2, 9),
          parentRelation: {
            deviceTypeId: deviceTypeDefault?._id ?? null,
            devicePortNumber: deviceTypePortDefault?.portNumber ?? null,
            parentPortId: deviceParentPortDefault?.portId ?? null
          }
        } as NewDevice
      })
    return newDevicesWithId
  }

  const handleCleanFiles = (includeZips: boolean = false) => {
    setCreateShapesResult({} as CreateShapesElements)
    setAnalyzeShapesResult({} as AnalyzeShapesResult)
    setNewDeviceSuggestions([])
    setDeviceTypeSuggestions([])
    setNewDevices([])
    setNewPolygons([])
    setNoNewShapesResults(false)
    if (includeZips) setselectedFiles([])
  }

  return (
    <div className='container grid grid-cols-12 gap-7'>
      <div className='col-span-12'>
        <PageTitle title='Carga de Shapes' />
      </div>
      <div className='col-span-6 justify-center'>
        <div className='flex w-full items-center justify-center font-sans'>
          <section
            className='w-full'
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            <label htmlFor='dropzone-file' className={dragActiveClass}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-20 w-20 text-blue-500'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                />
              </svg>
              <h2 className='mt-4 text-3xl font-medium text-gray-700 tracking-wide'>
                Archivos Shapes
              </h2>
              <p className='mt-2 text-gray-500 tracking-wide'>
                Subir archivos zip con archivos .shp, .dbf, .prj, .shx
              </p>
              <input
                ref={fileInput}
                id='dropzone-file'
                type='file'
                className='hidden'
                accept='.zip'
                onInputCapture={handleFileChange}
                multiple
              />
            </label>
          </section>
        </div>
      </div>
      <div className='col-span-6'>
        <div className='container grid grid-cols-1 gap-3'>
          <div className='col-span-1'>
            <h4 className='text-2xl font-medium text-gray-700 tracking-wide'>
              Archivos
            </h4>
          </div>
          <div className='grid grid-cols-1 gap-3'>
            {!!selectedFiles.length && (
              <>
                {selectedFiles.map((file, i) => {
                  return (
                    <div className='col-span-1 w-full' key={i}>
                      <UploadSelectedFileCard
                        fileName={file.name}
                        fileSize={file.size}
                        handleDeleteFile={handleDeleteFile}
                      />
                    </div>
                  )
                })}
              </>
            )}
          </div>
        </div>
      </div>

      {!!selectedFiles.length && (
        <div className='col-start-6 col-span-2 justify-center'>
          <Button
            color='primary'
            className='bg-blue-500 text-white font-bold text-1xl px-4 py-2 rounded-lg w-full inline-flex items-center justify-center hover:bg-blue-600 transition-colors duration-300'
            onClick={handleOnClickUpload}
            isLoading={isUploading}
            endContent={<CloudArrowUpIcon />}
          >
            Cargar
          </Button>
        </div>
      )}
      {noNewShapesResults && !isUploading && (
        <div className='col-span-12'>
          <NoShapesFound />
        </div>
      )}
      {!_.isEmpty(analyzeShapesResult) &&
        _.isEmpty(createShapesResult) &&
        !isUploading && (
          <div className='col-span-12'>
            <AnalyzeResultsFormTabs
              setCreateShapesResult={setCreateShapesResult}
            />
          </div>
        )}

      {!_.isEmpty(createShapesResult) && !isUploading && (
        <div className='col-span-12 grid grid-cols-5'>
          <div className='col-span-5 col-start-1'>
            <CreateShapesResultTable createShapesResult={createShapesResult} />
          </div>
        </div>
      )}
    </div>
  )
}
