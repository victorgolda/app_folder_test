import React from 'react'
import SelectFilter from '@/components/coveragemap/atoms/SelectFilter'

const MapElementsFilter = () => {
  const coveragePolygons = [
    { value: '1', label: 'Zonas de cobertura' },
    { value: '2', label: 'Zonas de exclusión' }
  ]

  const deviceTypes = [
    { value: '1', label: 'Distribution Points' },
    { value: '2', label: 'ONTs' }
  ]

  return (
    <div className='grid grid-cols-12'>
      <div className='col-span-6'>
        <SelectFilter options={coveragePolygons} />
      </div>
      <div className='col-span-6'>
        <SelectFilter options={deviceTypes} />
      </div>
    </div>
  )
}

export default MapElementsFilter
