import React from 'react'
import { InfoWindow, Marker } from '@react-google-maps/api'
import _ from 'lodash'
import { MarkerMap } from '@/types/map'

interface Props {
  points: MarkerMap[]
}

const MapMarkersPreview = ({ points }: Props) => {
  return (
    <>
      {!_.isEmpty(points) && (
        <>
          {points.map((point: any, index: number) => {
            let className = 'm-20'
            let lat = point.geoLocation.coordinates[1]
            let lng = point.geoLocation.coordinates[0]
            return (
              <Marker
                //onClick={}
                key={point._id ?? index}
                position={{ lat, lng }}
                label={{
                  color: '#000000',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  text: point.name,
                  className: className
                }}
              >
                <InfoWindow position={{ lat, lng }}>
                  <div className='p-2'>
                    <p className='text-center font-bold m-2'>{point.name}</p>
                    <p className='font-bold text-center'>{point.description}</p>
                  </div>
                </InfoWindow>
              </Marker>
            )
          })}
        </>
      )}
    </>
  )
}

export default MapMarkersPreview
