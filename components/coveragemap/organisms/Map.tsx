//https://codesandbox.io/s/react-google-maps-api-drawing-manager-geojson-to-wkb-format-fr8jc?file=/src/App.js
//https://stackblitz.com/edit/drawingmanager-8cbk2j?file=Map.js
//https://embed.plnkr.co/qfjkT2lOu2vkATisGbw7/
'use client'
import React, { useRef, useState } from 'react'
import {
  GoogleMap,
  useJsApiLoader,
  DrawingManager,
  OverlayView
} from '@react-google-maps/api'
import MapPolygons from '../molecules/MapPolygons'
import MapMarkers from '../molecules/MapMarkers'
/* import NewCoveragePolygonDialog from './NewCoveragePolygonDialog' */
import useNetworkInventoryServices from '@/hooks/useNetworkInventoryServices'

const Map = () => {
  const { createCoverageLocationService } = useNetworkInventoryServices()
  const libraries = ['drawing', 'geometry', 'maps'] as any
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
    libraries: libraries
  })
  const [enabledEdit, setEnabledEdit] = useState<boolean>(false)
  const [optionsNewPolygon, setOptionsNewPolygon] = useState<any>({})
  const [propsNewPolygon, setPropsNewPolygon] = useState<any>({})
  const [openNewPolygonDialog, setOpenNewPolygonDialog] =
    useState<boolean>(false)
  const newPolygonRef = useRef<any>([])
  const newPolygonListenersRef = useRef<any>([])

  const containerStyle = {
    width: '100%',
    height: '100vh'
  }

  const center = {
    lat: 25.710277,
    lng: -100.375648
  }

  const createCoverageLocation = async () => {}

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

  const handleOnNewPolygon = (newPolygon: any) => {
    const coords = newPolygon.latLngs.g[0].g.map((coord: any) => {
      return {
        lat: coord.lat(),
        lng: coord.lng()
      }
    })
    newPolygonRef.current = newPolygon
    newPolygonListenersRef.current = []
    /*     newPolygonListenersRef.current.push(
      path.addListener('set_at', handleOnEditLocationCoverage),
    ) */
    setPropsNewPolygon((prevState: any) => ({
      ...prevState,
      coordinates: coords
    }))
    setOpenNewPolygonDialog(true)
  }

  const handleCancelNewPolygon = () => {
    newPolygonRef.current.setMap(null)
    setOpenNewPolygonDialog(false)
  }

  const handleCreateNewPolygon = async ({
    newPolygon
  }: {
    newPolygon: any
  }) => {
    //newPolygonRef.current.setMap(null)
    const { data: _id } = await createCoverageLocationService({
      name: newPolygon.name,
      description: newPolygon.description,
      type: newPolygon.type,
      coords: newPolygon.geoLocation
    })
    console.log('newPolygonResult', _id)
    //setOpenNewPolygonDialog(false)
  }

  const handleOnClickNewCoveragePolygon = (type: string) => {
    let polygonOptions
    if (type === 'coverage') {
      polygonOptions = {
        fillColor: `#caf0c0`,
        fillOpacity: 0.5,
        strokeWeight: 2,
        strokeColor: `#caf0c0`,
        //clickable: true,
        //geodesic: true,
        editable: true
      }
    } else {
      polygonOptions = {
        fillColor: `#e6aeae`,
        fillOpacity: 0.5,
        strokeWeight: 2,
        strokeColor: `#e6aeae`,
        //clickable: true,
        //geodesic: true,
        editable: true
      }
    }
    setOptionsNewPolygon(polygonOptions)
    setPropsNewPolygon((prevState: any) => ({
      ...prevState,
      type: type
    }))
    setEnabledEdit(true)
  }

  return isLoaded ? (
    <div style={{ width: '100%', height: 'auto' }}>
      <button
        onClick={(e) => {
          handleOnClickNewCoveragePolygon('coverage')
        }}
      >
        Nueva zona de cobertura
      </button>
      <button
        onClick={(e) => {
          handleOnClickNewCoveragePolygon('blackhole')
        }}
      >
        Nueva zona de exclusión
      </button>
      {/*       {openNewPolygonDialog && (
        <NewCoveragePolygonDialog
          openDialog={openNewPolygonDialog}
          type={propsNewPolygon['type']}
          coordinates={propsNewPolygon['coordinates']}
          setOpenDialog={setOpenNewPolygonDialog}
          onCancel={handleCancelNewPolygon}
          onSubtmit={handleCreateNewPolygon}
        />
      )} */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        onZoomChanged={() => console.log('zoom changed')}
        onBoundsChanged={() => onBoundsChanged()}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {enabledEdit && (
          <DrawingManager
            //onOverlayComplete={handleOnNewPolygon}
            options={{
              drawingControl: true,
              drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [google.maps.drawing.OverlayType.POLYGON]
              },
              polygonOptions: optionsNewPolygon
            }}
            onPolygonComplete={handleOnNewPolygon}
          />
        )}
        <MapPolygons />
        <MapMarkers />
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </div>
  ) : (
    <></>
  )
}

export default Map
