//https://codesandbox.io/s/react-google-maps-api-drawing-manager-geojson-to-wkb-format-fr8jc?file=/src/App.js
//https://stackblitz.com/edit/drawingmanager-8cbk2j?file=Map.js
//https://embed.plnkr.co/qfjkT2lOu2vkATisGbw7/
import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import MapMarkersPreview from '../atoms/MapMarkersPreview'
import { MarkerGeolocation } from '@/types/map'
type Props = {
  deviceGeoLocation: MarkerGeolocation
  deviceName: string
}

const DeviceMap = ({ deviceGeoLocation, deviceName }: Props) => {
  const makerLocation = {
    id: deviceName,
    name: deviceName,
    geoLocation: deviceGeoLocation
  }
  const libraries = ['geometry', 'maps'] as any
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
    libraries: libraries
  })

  const containerStyle = {
    width: '100%',
    height: '100%'
  }

  const center = {
    lat: deviceGeoLocation.coordinates[1],
    lng: deviceGeoLocation.coordinates[0]
  }

  const [map, setMap] = React.useState<any>(null)

  const onLoad = React.useCallback(function callback(map: any) {
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null)
  }, [])

  const onBoundsChanged = () => {
    const bounds = new window.google.maps.LatLngBounds()
    //console.log('bounds', bounds)
  }

  return isLoaded ? (
    <div style={{ width: '100%', height: '50vh' }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        onBoundsChanged={() => onBoundsChanged()}
        zoom={18}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <MapMarkersPreview points={[makerLocation]} />
        {/* <MapMarkers /> */}
        <></>
      </GoogleMap>
    </div>
  ) : (
    <></>
  )
}

export default DeviceMap
