'use client'
//https://stackoverflow.com/questions/74580728/get-url-params-next-js-13
import React, { useEffect } from 'react'
import DeviceHeader from './DeviceHeader'
import DevicePortsGroup from './DevicePortsGroup'
import DeviceMap from './DeviceMap'
import DeviceChild from './DeviceChild'
import useDevice from '@/hooks/device/useDevice'
import _ from 'lodash'
import { Device } from '@/types/devices'

type Props = {
  deviceQuery?: string
  device: Device
  deviceCircuit: any
  deviceChilds: Device[]
}

const DeviceDashboard = ({ device, deviceCircuit, deviceChilds }: Props) => {
  const { viewChild, setDevice, setDeviceChilds } = useDevice()
  useEffect(() => {
    setDevice(device)
    setDeviceChilds(deviceChilds)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className='grid grid-cols-12 m-6 gap-4'>
      <div className='col-span-4 grid grid-cols-1 gap-2'>
        <DeviceHeader
          deviceName={device.name}
          deviceTypeName={device.deviceTypeName}
          deviceCircuit={deviceCircuit}
        />
      </div>
      <div className='col-span-12 grid grid-cols-5 gap-4'>
        {device.ports && (
          <div className='col-span-2'>
            <DevicePortsGroup devicePorts={device.ports} />
          </div>
        )}
        <div
          className={`${
            device.ports !== undefined ? 'col-span-3' : 'col-span-5'
          } `}
        >
          <DeviceMap
            deviceGeoLocation={device.customData.geoLocation}
            deviceName={device.name}
          />
        </div>
      </div>
      {!_.isEmpty(viewChild) && (
        <div className='col-span-12 grid grid-cols-5 gap-2'>
          <DeviceChild deviceChild={viewChild} />
        </div>
      )}
    </div>
  )
}
export default DeviceDashboard
