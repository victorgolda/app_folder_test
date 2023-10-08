import { type } from 'os'

export interface MarkerMap {
  id?: string
  name: string
  description?: string
  geoLocation: any
}

export interface PolygonMap {
  id?: string
  name: string
  geoLocation: any
  description?: string
  type?: string
}

export interface MarkerGeolocation {
  type: string
  coordinates: number[]
}
