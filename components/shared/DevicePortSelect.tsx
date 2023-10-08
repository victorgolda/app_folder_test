import React, { useEffect, useState } from 'react'
import { Combobox, Listbox } from '@headlessui/react'
import { Device, DevicePort } from '@/types/devices'
import { getDevicesService } from '@/services/networkInventory/networkInventory'
import _ from 'lodash'

const DeviceTypeSelect = ({
  handleSelectPort,
  defaultDevice,
  defaultDevicePort,
  deviceIdReference
}: {
  handleSelectPort: Function
  defaultDevice?: Device
  defaultDevicePort?: DevicePort
  deviceIdReference?: string
}) => {
  const [devices, setDevices] = React.useState<readonly Device[]>([])
  const [selectedDevice, setSelectedDevice] = useState<Device>({} as Device)
  const [selectedPort, setSelectedPort] = useState<DevicePort>({} as DevicePort)
  const [ports, setPorts] = React.useState<DevicePort[]>([])
  const [isFetching, setIsFetching] = React.useState<boolean>(false)

  useEffect(() => {
    if (defaultDevice) {
      setSelectedDevice(defaultDevice)
      if (defaultDevice.ports) setPorts(defaultDevice.ports)
      if (defaultDevice.ports) {
        let defaultPort = handleGetDefaultDevicePort(defaultDevice.ports)
        setPorts(defaultDevice.ports)
        setSelectedPort(defaultPort)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getDevices = async ({ query }: { query: string }) => {
    try {
      const deviceResult = await getDevicesService({
        query,
        fields: '_id,name,ports',
        limit: 3
      })
      return deviceResult
    } catch (error) {
      console.log(error)
    }
  }

  const handleOnSearchDevices = async (query: string) => {
    if (query === '' || query === null || query === undefined) {
      setSelectedDevice({} as Device)
      setSelectedPort({} as DevicePort)
      setDevices([])
      setPorts([])
    }
    if (query.length > 3) {
      setIsFetching(true)
      let deviceTypes = await getDevices({ query })
      if (_.isEmpty(deviceTypes)) return
      setDevices(deviceTypes)
      setIsFetching(false)
    }
  }

  const handleOnSelectDeviceType = async (_id: any) => {
    if (_id === '' || _id === null || _id === undefined) {
      setDevices([])
      setPorts([])
      setSelectedPort({} as DevicePort)
      if (handleSelectPort)
        handleSelectPort({
          port: null,
          device: null,
          deviceIdReference
        })
    }

    let device = devices.find((device) => device._id === _id)
    if (device) {
      setSelectedDevice(device)
      if (device.ports && device.ports.length > 0) {
        setPorts(device.ports)
        let defaultPort = handleGetDefaultDevicePort(device.ports)
        handleOnSelectDeviceTypePort(defaultPort, device)
      }
    } else {
      if (handleSelectPort)
        handleSelectPort({
          port: null,
          device: null,
          deviceIdReference
        })
    }
  }

  const handleOnSelectDeviceTypePort = (port: DevicePort, device: Device) => {
    if (!port) return
    if (handleSelectPort)
      handleSelectPort({
        port,
        device: device ?? selectedDevice,
        deviceIdReference
      })
    setSelectedPort(port)
  }

  const handleGetDefaultDevicePort = (ports: DevicePort[]) => {
    let defaultPort = null
    if (defaultDevicePort) {
      defaultPort = ports.find(
        (port) => port.portId === defaultDevicePort.portId
      )
    } else {
      defaultPort = ports.find((port) => port.isSlave)
    }
    return defaultPort ?? ports[0]
  }

  return (
    <div className='grid grid-cols-1 gap-2 items-center'>
      <div className='col-span-1'>
        <Combobox
          value={selectedDevice.name}
          onChange={handleOnSelectDeviceType}
        >
          <h5 className='text-md text-gray-500 font-medium'>Dispositivo</h5>
          <div className='relative mt-1'>
            <div className='relative w-full cursor-default overflow-hidden bg-white text-left shadow-md focus-visible:ring-2   sm:text-sm'>
              <Combobox.Input
                className='w-full border-none pl-3 pr-10 text-sm leading-5 text-gray-900  p-3'
                onChange={(event) => handleOnSearchDevices(event.target.value)}
              />
            </div>
            <Combobox.Options className='absolute mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg   sm:text-sm z-30'>
              {!_.isEmpty(devices) && (
                <>
                  {devices.map((device) => (
                    <Combobox.Option
                      key={device._id}
                      value={device._id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-blue-600 text-white' : 'text-gray-900'
                        }`
                      }
                    >
                      <span>
                        <p className=' font-bold text-md'>{device.name}</p>
                        {device.description && (
                          <p className='text-xs'>{device.description}</p>
                        )}
                      </span>
                    </Combobox.Option>
                  ))}
                </>
              )}
              {devices.length === 0 && isFetching && (
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
        <DevicePortList
          ports={ports}
          handleSelectParentDevicePort={handleOnSelectDeviceTypePort}
          selectedPort={selectedPort}
        />
      </div>
    </div>
  )
}

const DevicePortList = ({
  ports = [],
  handleSelectParentDevicePort,
  selectedPort
}: {
  ports: DevicePort[]
  handleSelectParentDevicePort?: any
  selectedPort: DevicePort
}) => {
  const handleOnSelectPort = (port: DevicePort) => {
    if (!port) return
    handleSelectParentDevicePort(port)
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
        <Listbox.Options className='absolute mt-3 w-full overflow-visible rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-30 mb-2'>
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
