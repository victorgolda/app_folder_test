'use client'
import React from 'react'
import { DevicePort } from '@/types/devices'
import useDevice from '@/hooks/device/useDevice'

type Props = {
  devicePort: DevicePort
}

const portStatus = Object.assign(
  {},
  {
    closed: 'Ocupado',
    open: 'Libre',
    damaged: 'Dañado',
    prereserved: 'Pre-reservado',
    reserved: 'Reservado'
  }
) as any

export default function DevicePortContainer({
  devicePort
}: //handleOnClick
Props) {
  const { setViewChild } = useDevice()
  //let portStatus = devicePort.status
  let portStatusBgColor = ''
  let portStatusBorderColor = ''
  let portOnHover = ''
  let portStatusNameBorderColor = ''
  switch (devicePort.status) {
    case 'closed': //ocupado por cliente
      portStatusBgColor = 'bg-blue-200'
      portStatusBorderColor = 'border-blue-600'
      portStatusNameBorderColor = 'border-blue-600'
      portOnHover = 'hover:bg-blue-400'
      break
    case 'open': //libre
      portStatusBgColor = 'bg-gray-100'
      portOnHover = 'hover:bg-gray-200'
      portStatusNameBorderColor = 'border-gray-300'

      break
    case 'damaged': //libre
      portStatusBgColor = 'bg-red-500'
      portStatusBgColor = 'bg-red-600'
      portOnHover = 'hover:bg-red-700'

      break

    case 'prereserved': //libre
      portStatusBgColor = 'bg-gray-300'
      portStatusBgColor = 'bg-gray-400'
      portOnHover = 'hover:bg-gray-700'

      break
    case 'reserved': //libre
      portStatusBgColor = 'bg-blue-500'
      portStatusBgColor = 'bg-blue-600'
      portOnHover = 'hover:bg-blue-700'
      break
    default:
      break
  }
  const handleOnClick = () => {
    console.log('handleOnClick')
    setViewChild(devicePort)
  }

  return (
    <div
      className={`rounded-sm cursor-pointer grid grid-cols-5 w-full ${portStatusBgColor} ${portStatusBorderColor} ${portOnHover} mb-2 border-2 border-gray-200 p-2`}
      onClick={() => handleOnClick()}
    >
      <div className='col-span-1 grid grid-cols-1'>
        <div className='col-span-1'>
          <p className='text-center font-bold'>{devicePort.portNumber}</p>
        </div>
        <div className='col-span-1'>
          <p className='text-center font-bold '>Puerto</p>
        </div>
      </div>
      {devicePort.status !== undefined && (
        <div className='col-span-2 col-start-5 self-center justify-self-center'>
          <span
            className={`rounded-md border-2 border-blue-600 p-2 text-center text-blue-500 ${portStatusNameBorderColor}`}
          >
            {portStatus[devicePort.status]}
          </span>
        </div>
      )}
    </div>
  )
}
