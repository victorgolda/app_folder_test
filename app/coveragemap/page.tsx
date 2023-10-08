'use client'
import React from 'react'
import Map from '@/components/coveragemap/organisms/Map'
import MapElementsFilter from '@/components/coveragemap/organisms/MapElementsFilter'

const CoverageMap = () => {
  return (
    <>
      <MapElementsFilter />
      <Map />
    </>
  )
}

export default CoverageMap
