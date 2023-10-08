import { type } from 'os'
import { Device, DeviceType } from './devices'
import { PolygonMap } from './map'

export interface AnalyzeShapesResult {
  deviceHelpers: Device[]
  deviceTypeHelpers: DeviceType[]
  newDevices: NewDevice[] | NewDeviceWithConflict[]
  newPolygons: NewPolygon[]
  newPolygonsCount: number
  newCoveragePolygonsCount?: number
  oldCoveragePolygonsCount?: number
  newBlackholePolygonsCount?: number
  oldBlackholePolygonsCount?: number
}

export interface NewDevice {
  hasConflict: boolean
  newDeviceData: NewDeviceData
  parentRelation?: NewDeviceParentRelation
  id?: string
}

export interface NewDeviceData {
  name: string
  type: string
  description: string
  geoLocation: ElementGeoLocation
  olt?: NewDeviceOlt
  oltCard?: NewDeviceOltCard
  oltCardPort?: NewDeviceOltCardPort
  suggestedDeviceTypeId?: string
}

export interface NewDeviceOlt {
  name: string
}

export interface NewDeviceOltCard {
  name: string
}
export interface NewDeviceOltCardPort {
  name: string
}

export interface ElementGeoLocation {
  type: string
  coordinates: any
}

export interface NewDeviceParentRelation {
  deviceTypeId: string
  devicePortNumber: number
  parentPortId: string
}

export interface NewPolygon {
  hasConflict: boolean
  newPolygonData: NewPolygonData
  id?: string
}

export interface NewPolygonData {
  description: string
  name: string
  //type: NewPolygonType
  type: string
  // TODO: Cambiar a NewPolygonType
  geoLocation: ElementGeoLocation
}

export interface NewPolygonType {
  //type: 'coverage' | 'blackhole'
  type: string
}

export interface NewDeviceWithConflict {
  conflict?: ElementConflict
  hasConflict: boolean
  newDeviceData: NewDeviceData
}

export interface ElementConflict {
  _id: string
  customData: any
  name: string
}

export interface CreateShapesElements {
  newDevices: Device[]
  newPolygons: PolygonMap[]
}
