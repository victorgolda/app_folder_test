'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Polygon, InfoWindow } from '@react-google-maps/api'
import useNetworkInventoryServices from '@/hooks/useNetworkInventoryServices'
import _ from 'lodash'

const MapPolygons = () => {
  const { getCoverageAreasService } = useNetworkInventoryServices()
  const [coverageAreas, setCoverageAreas] = useState<string[]>([])
  const polygonRefs = useRef<any>([])
  const polygonListenersRef = useRef<any>([])

  useEffect(() => {
    getCoverageAreas()
  }, [])

  const getCoverageAreas = async () => {
    const { data: polygons } = await getCoverageAreasService()
    setCoverageAreas(polygons)
  }

  const handleOnEditLocationCoverage = useCallback(
    (index: number) => {
      if (polygonRefs.current[index]) {
        const nextPath = polygonRefs.current[index]
          .getPath()
          .getArray()
          .map((latLng: any) => {
            return { lat: latLng.lat(), lng: latLng.lng() }
          })
        let newCoverageAreas = _.cloneDeep(coverageAreas) as any
        newCoverageAreas[index].geoLocation.coordinates[0] = nextPath.map(
          (coordinate: any) => {
            return [coordinate.lng, coordinate.lat]
          }
        )
        setCoverageAreas(newCoverageAreas)
      }
    },
    [coverageAreas, setCoverageAreas]
  )

  const onLoad = useCallback(
    (polygon: { getPath: () => any }, index: number) => {
      polygonRefs.current[index] = polygon
      const path = polygon.getPath()
      polygonListenersRef.current[index] = []
      polygonListenersRef.current[index].push(
        path.addListener('set_at', handleOnEditLocationCoverage),
        path.addListener('insert_at', handleOnEditLocationCoverage),
        path.addListener('remove_at', handleOnEditLocationCoverage)
      )
    },
    [handleOnEditLocationCoverage]
  )
  /*   const onUnmount = useCallback((index: number) => {
    polygonListenersRef.current.forEach((lis: any) => lis.remove())
    polygonRefs.current[index] = null
  }, []) */

  return (
    <>
      {!_.isEmpty(coverageAreas) && (
        <>
          {coverageAreas.map((location: any, index: number) => {
            const path = [] as any
            const polygonCenterCoords = [] as any
            location.geoLocation.coordinates[0].forEach((coordinate: any) => {
              path.push({ lat: coordinate[1], lng: coordinate[0] })
              polygonCenterCoords.push(
                new google.maps.LatLng(coordinate[1], coordinate[0])
              )
            })
            let color = location['type'] === 'blackhole' ? '#dc2626' : '#15803d'
            let i
            var bounds = new google.maps.LatLngBounds()
            for (i = 0; i < polygonCenterCoords.length; i++) {
              bounds.extend(polygonCenterCoords[i])
            }
            let toolTipPosition = {
              lat: bounds.getCenter().lat(),
              lng: bounds.getCenter().lng()
            }
            return (
              <>
                <InfoWindow position={toolTipPosition}>
                  <div className='p-2'>
                    <p className='font-bold text-center'>
                      {location.type === 'coverage' ? 'Cobertura' : 'Exclusión'}
                    </p>
                    <p className='text-center font-bold m-2'>{location.name}</p>
                  </div>
                </InfoWindow>
                <Polygon
                  key={location._id}
                  //editable
                  onLoad={(polygon) => onLoad(polygon, index)}
                  onMouseUp={() => handleOnEditLocationCoverage(index)}
                  path={path}
                  options={{
                    strokeColor: color,
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: color,
                    fillOpacity: 0.35
                  }}
                  //onDblClick={() => console.log('dblclick')}
                  //onUnmount={() => onUnmount(index)}
                />
              </>
            )
          })}
        </>
      )}
    </>
  )
}

export default MapPolygons
