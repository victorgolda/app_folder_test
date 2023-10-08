import { DeviceCircuit } from '@/types/devices'
import React from 'react'
import DeviceField from '../atoms/DeviceField'

type Props = {
  deviceName: string
  deviceTypeName: string
  deviceCircuit: DeviceCircuit
}

export default function DeviceHeader({
  deviceName,
  deviceTypeName,
  deviceCircuit
}: Props) {
  return (
    <>
      <div className='col-span-1'>
        <p className=' text-left text-4xl text-blue-500 font-bold'>
          {deviceName}
        </p>
        <hr className='mt-3 mb-1 h-0.5 border-t-0 bg-neutral-200 opacity-500 dark:opacity-90' />
      </div>
      <div className='col-span-1'>
        <DeviceField deviceFieldName='Tipo' deviceFieldValue={deviceTypeName} />
      </div>
      <div className='col-span-1'>
        <DeviceField
          deviceFieldName='OLT'
          deviceFieldValue={deviceCircuit.oltName}
        />
      </div>
      <div className='col-span-1'>
        <DeviceField
          deviceFieldName='Slot'
          deviceFieldValue={deviceCircuit.oltCardName}
        />
      </div>
      <div className='col-span-1'>
        <DeviceField
          deviceFieldName='PON'
          deviceFieldValue={deviceCircuit.oltCardPortName}
        />
      </div>
    </>
  )
}
