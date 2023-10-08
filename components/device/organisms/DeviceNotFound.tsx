import React from 'react'

export default function DeviceNotFound() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold text-red-500 mb-4'>
          Dispositivo no encontrado
        </h1>
        <p className='text-gray-600'>
          Lo sentimos, el dispositivo que estás buscando no ha sido encontrado.
        </p>
      </div>
    </div>
  )
}
