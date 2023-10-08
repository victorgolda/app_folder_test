import React from 'react'
import { Polygon, InfoWindow } from '@react-google-maps/api'
import _ from 'lodash'
import { PolygonMap } from '@/types/map'

interface Props {
  polygons: PolygonMap[]
}
const MapPolygonsPreview = ({ polygons }: Props) => {
  return (
    <>
      {!_.isEmpty(polygons) && (
        <>
          {polygons.map((location: any, index: number) => {
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
                <InfoWindow position={toolTipPosition} key={location._id}>
                  <div className='p-2'>
                    <p className='text-center font-bold m-2'>{location.name}</p>
                    <p className='font-bold text-center'>
                      {location.type === 'coverage' ? 'Cobertura' : 'Exclusión'}
                    </p>
                  </div>
                </InfoWindow>
                <Polygon
                  key={index}
                  path={path}
                  options={{
                    strokeColor: color,
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: color,
                    fillOpacity: 0.7
                  }}
                />
              </>
            )
          })}
        </>
      )}
    </>
  )
}

export default MapPolygonsPreview
