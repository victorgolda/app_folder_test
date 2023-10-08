import React from 'react'

type Props = {
  deviceFieldName: string
  deviceFieldValue: any
}
export default function DeviceField({
  deviceFieldName,
  deviceFieldValue
}: Props) {
  return (
    <span className='grid grid-cols-3'>
      {deviceFieldName !== '' && (
        <p className='col-span-1'>{deviceFieldName}</p>
      )}
      <p className='col-span-2 text-1xl font-bold'>{deviceFieldValue}</p>
    </span>
  )
}
