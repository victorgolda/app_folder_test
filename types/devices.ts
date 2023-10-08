export interface GetDeviceTypes {
  count: number
  deviceTypes: DeviceType[]
}

export interface GetDeviceTypesWithDataTypes {
  dataTypes: DeviceDataType[]
  deviceType: DeviceType
}

export interface DeviceType {
  _id: string
  brand: string
  customData: DeviceTypeCustomData[]
  description: string
  model: string
  name: string
  ports: DeviceTypePort[]
  slots: Slot[]
  tags: string[]
  parentId?: string
}

export interface DeviceTypeCustomData {
  name: string
  friendlyName: string
  dataType: string
}

export interface Slot {
  name: string
  slotNumber: number
}

export interface DeviceTypePort {
  name: string
  type: string
  portNumber: number
  isSlave?: boolean
}

export interface DeviceDataType {
  dataType: string
  fieldName: string
}

export interface PortType {
  _id: string
  name: string
  description: string
  suggestedName: string
  status: string
  options: string[]
}

export interface Device {
  _id: string
  deviceTypeName: string
  geoLocation: GeoLocation
  idDeviceType: string
  location: string
  name: string
  description: string
  customData: any
  ports?: DevicePort[]
  deviceTypeTags?: string[]
}

export interface GeoLocation {
  coordinates: number[]
  type: string
}

export interface DevicePort {
  name: string
  portId: string
  portNumber: number
  portTypeId: string
  parentId?: string
  status?: string
  isSlave?: boolean
  channelGroups?: any[]
}

export type DeviceCircuit = {
  dpName?: string
  oltCardName?: string
  oltCardPortName?: string
  oltCardPortNumber?: number
  oltCardSlot?: number
  oltName?: string
}
