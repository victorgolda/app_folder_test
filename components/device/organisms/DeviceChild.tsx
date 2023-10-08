import { Device } from '@/types/devices'
import React from 'react'
import DeviceField from '../atoms/DeviceField'

type Props = {
  deviceChild: Device
}

export default function DeviceChild({ deviceChild }: Props) {
  return (
    <div className='col-span-5 bg-slate-100 grid grid-cols-7 p-10 gap-1 border-3 rounded-sm'>
      <div className='col-span-5'>
        <p className='col-span-2 text-4xl font-bold'>{deviceChild.name}</p>
      </div>
      {deviceChild.deviceTypeTags !== undefined && (
        <div className='col-span-5'>
          <p className='col-span-2 text-1xl'>
            {deviceChild.deviceTypeTags[0]?.toUpperCase()}
          </p>
        </div>
      )}
      {deviceChild.customData.customerId !== undefined && (
        <div className='col-span-5'>
          <p className='col-span-2 text-1xl'>
            {deviceChild.customData.customerId}
          </p>
        </div>
      )}

      <div className='col-span-5'>
        <p className='col-span-2 text-1xl '>
          {deviceChild.customData.geoLocation.coordinates[1] +
            ',' +
            deviceChild.customData.geoLocation.coordinates[0]}
        </p>
      </div>
    </div>
  )
}
