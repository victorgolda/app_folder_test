import React from 'react'

export default function NoShapesFound() {
  // Necesito un componente usando TailwindCSS que muestre un mensaje como
  // No se encontraron dispositivos nuevos a agregar
  // Incluye algun icono o imagen
  return (
    <div className='p-4 rounded-lg shadow-md'>
      <p className='text-blue-500 text-lg font-bold'>
        No se encontraron dispositivos nuevos por agregar.
      </p>
    </div>
  )
}
