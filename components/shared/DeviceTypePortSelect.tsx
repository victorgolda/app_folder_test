import React, { useEffect, useState } from 'react'
import { Combobox, Listbox } from '@headlessui/react'
import { DeviceType, DeviceTypePort } from '@/types/devices'
import { getDeviceTypesService } from '@/services/networkInventory/networkInventory'
import _ from 'lodash'

const DeviceTypeSelect = ({
  handleSelectPort,
  deviceIdReference,
  defaultDeviceType
}: {
  handleSelectPort?: Function
  deviceIdReference?: string
  defaultDeviceType?: DeviceType
}) => {
  const [selectedDeviceType, setSelectedDeviceType] = useState<DeviceType>(
    {} as DeviceType
  )
  const [deviceTypes, setDeviceTypes] = React.useState<readonly DeviceType[]>(
    []
  )
  const [selectedPort, setSelectedPort] = useState<DeviceTypePort>(
    {} as DeviceTypePort
  )
  const [ports, setPorts] = React.useState<DeviceTypePort[]>([])
  const [isFetching, setIsFetching] = React.useState<boolean>(false)

  const getDeviceTypes = async ({ query }: { query: string }) => {
    try {
      const deviceTypeResult = await getDeviceTypesService({
        query,
        fields: '_id,name,description,ports'
      })
      return deviceTypeResult
    } catch (error) {}
  }
  useEffect(() => {
    if (defaultDeviceType) {
      setSelectedDeviceType(defaultDeviceType)
      if (defaultDeviceType.ports) {
        let defaultPort = handleGetDefaultDeviceTypePort(
          defaultDeviceType.ports
        )
        setPorts(defaultDeviceType.ports)
        setSelectedPort(defaultPort)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOnSearchDeviceTypes = async (query: string) => {
    if (query === '' || query === null || query === undefined) {
      setSelectedDeviceType({} as DeviceType)
      setSelectedPort({} as DeviceTypePort)
      setDeviceTypes([])
      setPorts([])
    }
    if (query.length > 3) {
      setIsFetching(true)
      let deviceTypes = await getDeviceTypes({ query })
      if (_.isEmpty(deviceTypes)) return
      setDeviceTypes(deviceTypes)
      setIsFetching(false)
    }
  }

  const handleOnSelectDeviceType = async (_id: any) => {
    if (_id === '' || _id === null || _id === undefined) {
      setDeviceTypes([])
      setPorts([])
      setSelectedPort({} as DeviceTypePort)
      if (handleSelectPort)
        handleSelectPort({
          port: null,
          deviceType: null,
          deviceIdReference
        })
    }
    let deviceType = deviceTypes.find((deviceType) => deviceType._id === _id)
    if (deviceType) {
      setSelectedDeviceType(deviceType)
      if (deviceType.ports && deviceType.ports.length > 0) {
        setPorts(deviceType.ports)
        let defaultPort = handleGetDefaultDeviceTypePort(deviceType.ports)
        handleOnSelectDeviceTypePort(defaultPort, deviceType)
      }
    } else {
      if (handleSelectPort)
        handleSelectPort({
          port: null,
          deviceType: null,
          deviceIdReference
        })
    }
  }

  const handleOnSelectDeviceTypePort = (
    port: DeviceTypePort,
    deviceType: DeviceType
  ) => {
    if (!port) return
    if (handleSelectPort)
      handleSelectPort({
        port,
        deviceType: deviceType ?? selectedDeviceType,
        deviceIdReference
      })
    setSelectedPort(port)
  }

  const handleGetDefaultDeviceTypePort = (ports: DeviceTypePort[]) => {
    let defaultPort = null
    let hasSlavePort = ports.find((port) => port.isSlave)
    defaultPort = hasSlavePort ?? ports[0]
    return defaultPort
  }

  return (
    <div className='grid grid-cols-1 items-center gap-2'>
      <div className='col-span-1'>
        <Combobox
          value={selectedDeviceType.name}
          onChange={handleOnSelectDeviceType}
          nullable
        >
          <h5 className='text-md text-gray-500 font-medium'>
            Tipo de dispositivo
          </h5>
          <div className='relative mt-1'>
            <div className='relative w-full cursor-default overflow-hidden bg-white text-left shadow-md focus-visible:ring-2   sm:text-sm'>
              <Combobox.Input
                className='w-full border-none pl-3 pr-10 text-sm leading-5 text-gray-900  p-3'
                onChange={(event) =>
                  handleOnSearchDeviceTypes(event.target.value)
                }
                placeholder='Buscar tipo de dispositivo'
              />
            </div>
            <Combobox.Options className='absolute mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg   sm:text-sm z-30'>
              {!_.isEmpty(deviceTypes) && (
                <>
                  {deviceTypes.map((deviceType) => (
                    <Combobox.Option
                      key={deviceType._id}
                      value={deviceType._id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-blue-600 text-white' : 'text-gray-900'
                        }`
                      }
                    >
                      <span>
                        <p className=' font-bold text-md'>{deviceType.name}</p>
                        {deviceType.description && (
                          <p className='text-xs'>{deviceType.description}</p>
                        )}
                      </span>
                    </Combobox.Option>
                  ))}
                </>
              )}
              {deviceTypes.length === 0 && isFetching && (
                <Combobox.Option
                  value={null}
                  className={`relative cursor-default select-none py-2 pl-10 pr-4 `}
                >
                  <span>
                    <p className='font-bold text-md text-gray-500'>
                      Sin resultados
                    </p>
                  </span>
                </Combobox.Option>
              )}
            </Combobox.Options>
          </div>
        </Combobox>
      </div>
      <div className='col-span-1'>
        <DeviceTypePortList
          ports={ports}
          handleSelectParentDeviceTypePort={handleOnSelectDeviceTypePort}
          selectedPort={selectedPort}
        />
      </div>
    </div>
  )
}

const DeviceTypePortList = ({
  ports = [],
  handleSelectParentDeviceTypePort,
  selectedPort
}: {
  ports: DeviceTypePort[]
  handleSelectParentDeviceTypePort: any
  selectedPort: DeviceTypePort
}) => {
  const handleOnSelectPort = (port: DeviceTypePort) => {
    if (!port) return
    handleSelectParentDeviceTypePort(port)
  }

  return (
    <Listbox
      value={selectedPort || ''}
      onChange={handleOnSelectPort}
      disabled={ports.length === 0}
    >
      <div className='relative mt-1'>
        <Listbox.Button
          className={
            'relative w-full cursor-default rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-3 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm h-11 px-2'
          }
          placeholder='Seleccionar puerto'
        >
          {selectedPort?.name}
        </Listbox.Button>
        <Listbox.Options className='absolute mt-3 w-full overflow-visible rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-30'>
          {!_.isEmpty(ports) &&
            ports.map((port) => (
              <Listbox.Option
                key={port.name}
                value={port}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-blue-600 text-white' : 'text-gray-900'
                  }`
                }
              >
                <span>
                  <p className=' font-bold text-md'>{port.name}</p>
                  {port.portNumber && (
                    <p className='text-xs'>{`Puerto número: ${port.portNumber}`}</p>
                  )}
                </span>
              </Listbox.Option>
            ))}
        </Listbox.Options>
      </div>
    </Listbox>
  )
}

export default DeviceTypeSelect
