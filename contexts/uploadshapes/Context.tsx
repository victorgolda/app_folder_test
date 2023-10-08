'use client'
import React, { useReducer, createContext } from 'react'
import reducer from './Reducer'
import {
  AnalyzeShapesResult,
  NewDevice,
  NewPolygon
} from '@/types/uploadShapes'
import { Device, DeviceType } from '@/types/devices'

type UploadShapesContext = {
  newPolygons: NewPolygon[]
  newDevices: NewDevice[]
  newDeviceSuggestions: Device[]
  deviceTypesSuggestions: DeviceType[]
  analyzeShapesResult: AnalyzeShapesResult
  setNewPolygons: (newPolygons: NewPolygon[]) => void
  setNewDevices: (newDevices: NewDevice[]) => void
  setNewDeviceSuggestions: (newDeviceSuggestions: Device[]) => void
  setDeviceTypeSuggestions: (deviceTypesSuggestions: DeviceType[]) => void
  setAnalyzeShapesResult: (analyzeShapesResult: AnalyzeShapesResult) => void
}
const initialState = {
  newPolygons: [],
  newDevices: [],
  newDeviceSuggestions: [],
  deviceTypesSuggestions: [],
  analyzeShapesResult: {} as AnalyzeShapesResult,
  setNewPolygons: () => {},
  setNewDevices: () => {},
  setNewDeviceSuggestions: () => {},
  setDeviceTypeSuggestions: () => {},
  setAnalyzeShapesResult: () => {}
}

export const UploadShapesContext =
  createContext<UploadShapesContext>(initialState)
type UploadShapesContextProviderProps = {
  children: React.ReactNode
}
//https://dev.to/elisealcala/react-context-with-usereducer-and-typescript-4obm
//https://github.com/gitdagray/typescript-course/blob/main/lesson15/src/context/CounterContext.tsx
export default function UploadShapesProvider({
  children
}: UploadShapesContextProviderProps) {
  const [globalState, dispatch] = useReducer(reducer, initialState)
  const setAnalyzeShapesResult = (analyzeShapesResult: AnalyzeShapesResult) => {
    try {
      dispatch({
        type: 'SET_ANALYZE_SHAPES_RESULT',
        payload: analyzeShapesResult
      })
    } catch (error) {
      console.log(error)
    }
  }

  const setNewPolygons = (newPolygons: NewPolygon[]) => {
    try {
      dispatch({
        type: 'SET_NEW_POLYGONS',
        payload: newPolygons
      })
    } catch (error) {
      console.log(error)
    }
  }
  const setNewDevices = (newDevices: NewDevice[]) => {
    try {
      dispatch({
        type: 'SET_NEW_DEVICES',
        payload: newDevices
      })
    } catch (error) {
      console.log(error)
    }
  }

  const setNewDeviceSuggestions = (newDeviceSuggestions: Device[]) => {
    try {
      dispatch({
        type: 'SET_NEW_DEVICE_SUGGESTIONS',
        payload: newDeviceSuggestions
      })
    } catch (error) {
      console.log(error)
    }
  }

  const setDeviceTypeSuggestions = (deviceTypesSuggestions: DeviceType[]) => {
    try {
      dispatch({
        type: 'SET_DEVICE_TYPE_SUGGESTIONS',
        payload: deviceTypesSuggestions
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <UploadShapesContext.Provider
      value={{
        newPolygons: globalState.newPolygons,
        newDevices: globalState.newDevices,
        newDeviceSuggestions: globalState.newDeviceSuggestions,
        deviceTypesSuggestions: globalState.deviceTypesSuggestions,
        analyzeShapesResult: globalState.analyzeShapesResult,
        setAnalyzeShapesResult,
        setNewPolygons,
        setNewDevices,
        setNewDeviceSuggestions,
        setDeviceTypeSuggestions
      }}
    >
      {children}
    </UploadShapesContext.Provider>
  )
}
