//https://codesandbox.io/s/react-google-maps-api-drawing-manager-geojson-to-wkb-format-fr8jc?file=/src/App.js
//https://stackblitz.com/edit/drawingmanager-8cbk2j?file=Map.js
//https://embed.plnkr.co/qfjkT2lOu2vkATisGbw7/
import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import MapPolygonsPreview from './../atoms/MapPolygonsPreview'
import MapMarkersPreview from './../atoms/MapMarkersPreview'
import { MarkerMap, PolygonMap } from '@/types/map'

interface Props {
  newPolygons?: PolygonMap[]
  newPoints?: MarkerMap[]
}
const libraries = ['drawing', 'geometry', 'maps'] as any

const MapPreview = ({ newPolygons, newPoints }: Props) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-new-polygon-preview',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
    libraries: libraries
  })

  const containerStyle = {
    width: '100%',
    height: '98vh'
  }

  const center = {
    lat: 25.710277,
    lng: -100.375648
  }

  return isLoaded ? (
    <div style={{ width: '99%', height: 'auto' }}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        {newPolygons?.length && <MapPolygonsPreview polygons={newPolygons} />}
        {newPoints?.length && <MapMarkersPreview points={newPoints} />}
      </GoogleMap>
    </div>
  ) : (
    <></>
  )
}

export default MapPreview
