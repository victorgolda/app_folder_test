'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Marker } from '@react-google-maps/api'
import useNetworkInventoryServices from '@/hooks/useNetworkInventoryServices'
import _ from 'lodash'

const MapMarkers = () => {
  const { getDevicesService } = useNetworkInventoryServices()
  const [devices, setDevices] = useState<string[]>([])

  useEffect(() => {
    getDevices()
  }, [])

  const getDevices = async () => {
    let { data: devices } = await getDevicesService({
      fields: '_id,name,geoLocation,deviceTypeImages,deviceTypeName',
      tags_device_types: 'dp',
      limit: 1000
    })
    if (typeof devices === 'string') {
      devices = JSON.parse(devices)
    }
    setDevices(devices)
  }

  return (
    <>
      {!_.isEmpty(devices) && (
        <>
          {devices.map((device: any, index: number) => {
            const image = {
              url: device.deviceTypeImages.icon
              // This marker is 20 pixels wide by 32 pixels high.
              //size: new google.maps.Size(0, 0)
              // The origin for this image is (0, 0).
              //origin: new google.maps.Point(0, 0)
              // The anchor for this image is the base of the flagpole at (0, 32).
              //anchor: new google.maps.Point(0, 0)
            }
            let className = 'm-20'
            let lat = device.customData.geoLocation.coordinates[1]
            let lng = device.customData.geoLocation.coordinates[0]

            return (
              <Marker
                //onClick={}
                key={device._id}
                position={{ lat, lng }}
                icon={image}
                label={{
                  color: '#000000',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  text: device.name,
                  className: className
                }}
              />
            )
          })}
        </>
      )}
    </>
  )
}

export default MapMarkers
