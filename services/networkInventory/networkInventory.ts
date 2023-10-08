export interface GetDeviceTypes {
  query: string
  fields: string
}

export interface GetDeviceType {
  query: string
  fields: string
  include_types: boolean
}

export interface GetPortType {
  query: string
  fields: string
}

export interface GetDevice {
  query: string
  fields: string
}
export type GetDeviceChilds = {
  query: string
  fields: string
  tags_device_types?: string
}

export type GetDeviceCircuit = {
  query: string
  fields?: string
}
export interface GetDevices {
  query: string
  fields: string
  limit: number
}

export interface CreateCoverageLocation {
  name: string
  description: string
  type: string
  coords: number[]
}

export interface GetLocationHasServiceAvailable {
  lat: number
  lng: number
}

import {
  clientNetworkInventoryAxios,
  serverNetworkInventoryAxios
} from '@/utils/axios/axios'
import { networkInventoryUrls } from '@/services/urls'

export const getDeviceTypesService = async ({
  query,
  fields
}: GetDeviceTypes) => {
  const { data: deviceTypes } = await clientNetworkInventoryAxios.get(
    networkInventoryUrls.getDeviceTypes,
    {
      params: {
        query,
        fields
      }
    }
  )
  return deviceTypes.deviceTypes
}

export const getDeviceTypeService = async ({
  query,
  fields,
  include_types
}: GetDeviceType) => {
  const { data: deviceType } = await clientNetworkInventoryAxios.get(
    networkInventoryUrls.getDeviceType,
    {
      params: { query, fields, include_types }
    }
  )
  return deviceType
}

export const getPortTypeService = async ({ query, fields }: GetPortType) => {
  const { data: portType } = await clientNetworkInventoryAxios.get(
    networkInventoryUrls.getPortType,
    {
      params: { query, fields }
    }
  )
  return portType
}

export const getDeviceService = async ({ query, fields }: GetDevice) => {
  const { data: device } = await clientNetworkInventoryAxios.get(
    networkInventoryUrls.getDevice,
    {
      params: { query, fields }
    }
  )
  return device
}

export const getDeviceChildsService = async ({
  query,
  fields,
  tags_device_types
}: GetDeviceChilds) => {
  const { data: device } = await clientNetworkInventoryAxios.get(
    networkInventoryUrls.getDeviceChilds,
    {
      params: { query, fields, tags_device_types }
    }
  )
  return device
}

export const getDeviceCircuitService = async ({
  query,
  fields
}: GetDeviceCircuit) => {
  const { data: device } = await clientNetworkInventoryAxios.get(
    networkInventoryUrls.getDeviceCircuit,
    {
      params: { query, fields }
    }
  )
  return device
}

export const getDevicesService = async ({
  query,
  fields,
  limit = 3
}: GetDevices) => {
  const { data: devices } = await clientNetworkInventoryAxios.get(
    networkInventoryUrls.getDevices,
    {
      params: { query, fields, limit }
    }
  )
  return devices
}

export const createCoverageLocationService = async ({
  name,
  description,
  type,
  coords
}: CreateCoverageLocation) => {
  const { data: device } = await clientNetworkInventoryAxios.post(
    networkInventoryUrls.createCoverageLocation,
    {
      name,
      description,
      type,
      coords
    }
  )
  return device
}

export const getLocationHasServiceAvailableService = async ({
  lat,
  lng
}: GetLocationHasServiceAvailable) => {
  const { data: serviceAvailable } = await clientNetworkInventoryAxios.get(
    networkInventoryUrls.getLocationHasServiceAvailable,
    {
      params: { lat, lng }
    }
  )
  return serviceAvailable
}
