'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react'
import { Input } from '@nextui-org/react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'
import { getLocationHasServiceAvailableService } from '@/services/networkInventory/networkInventory'

//import "https://maps.googleapis.com/maps/api/js?key="+process.env.NEXT_PUBLIC_GOOGLE_API_KEY+"&libraries=places&callback=initMap";

/* import {
  GoogleMap,
  useJsApiLoader,
  DrawingManager,
  OverlayView
} from '@react-google-maps/api' */
export default function HasCoverageForm() {
  const [address, setAddress] = React.useState('')
  const [coordinates, setCoordinates] = React.useState<any>({})
  const [scriptLoadingState, setScriptLoadingState] = useState('IDLE')
  const [message, setMessage] = useState('')
  const [messageColor, setMessageColor] = useState('')

  useEffect(() => {
    // necesito cargar dinamicamente el siguiente script <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.src =
      'https://maps.googleapis.com/maps/api/js?key=' +
      process.env.NEXT_PUBLIC_GOOGLE_API_KEY +
      '&libraries=places'
    script.onload = function () {
      setScriptLoadingState('LOADED')
    }
    script.onerror = function () {
      setScriptLoadingState('FAILED')
    }
    document.body.appendChild(script)
  }, [])

  const handleValidateCoordinates = async () => {
    try {
      setMessage('')
      setMessageColor('')
      const response = await getLocationHasServiceAvailableService(coordinates)
      if (response.hasCoverage && response.hasCapacity) {
        setMessage('Tiene cobertura y capacidad')
        setMessageColor('text-green-500')
        return true
      }
      if (response.hasCoverage && !response.hasCapacity) {
        setMessage('Tiene cobertura pero no capacidad')
        setMessageColor('text-yellow-500')

        return true
      }

      setMessage('No hay ni cobertura ni capacidad')
      setMessageColor('text-red-500')

      console.log(response)
    } catch (error) {
      alert('Error al validar la cobertura')
    }
  }

  const handleSelect = async (value: string) => {
    try {
      setMessage('')
      setMessageColor('')
      setAddress(value)
      const results = await geocodeByAddress(value)
      const latLng = await getLatLng(results[0])
      setCoordinates(latLng)
    } catch (error) {
      console.error('Error selecting place:', error)
    }
  }
  return (
    <div className='grid grid-cols-5 gap-5'>
      <div className='col-start-2 col-span-3'>
        {scriptLoadingState === 'LOADED' && (
          <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps }) => (
              <div>
                <input
                  className=' border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3'
                  {...getInputProps({
                    placeholder: 'Enter a location'
                  })}
                />
                <div>
                  {suggestions.map((suggestion: any, index: number) => (
                    <div
                      className='cursor-pointer text-sm	hover:bg-sky-100 p-2'
                      {...getSuggestionItemProps(suggestion)}
                      key={index}
                    >
                      {suggestion.description}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        )}
      </div>
      <div className='col-start-3 col-span-1'>
        <Button
          onClick={handleValidateCoordinates}
          color='primary'
          className='w-full'
        >
          Validar cobertura y capacidad
        </Button>
      </div>
      <div className='col-start-2 col-span-3'>
        {message !== '' && (
          <p className={` text-3xl font-bold text-center ${messageColor}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  )
}
