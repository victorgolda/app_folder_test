'use client'
import React, { useReducer, createContext } from 'react'
import reducer from './Reducer'
import { Device, DevicePort } from '@/types/devices'

type DeviceContext = {
  deviceChilds: Device[]
  viewChild: Device
  setViewChild: (devicePort: DevicePort) => void
  setDevice: (device: Device) => void
  setDeviceChilds: (deviceChilds: Device[]) => void
}
const initialState = {
  deviceChilds: [] as Device[],
  viewChild: {} as Device,
  setViewChild: () => {},
  setDevice: () => {},
  setDeviceChilds: () => {}
}

export const DeviceContext = createContext<DeviceContext>(initialState)
type DeviceContextProviderProps = {
  children: React.ReactNode
}
//https://dev.to/elisealcala/react-context-with-usereducer-and-typescript-4obm
//https://github.com/gitdagray/typescript-course/blob/main/lesson15/src/context/CounterContext.tsx
export default function DeviceProvider({
  children
}: DeviceContextProviderProps) {
  const [globalState, dispatch] = useReducer(reducer, initialState)

  const setDeviceChilds = (deviceChilds: Device[]) => {
    try {
      dispatch({
        type: 'SET_DEVICE_CHILDS',
        payload: deviceChilds
      })
    } catch (error) {
      console.log(error)
    }
  }

  const setDevice = (device: Device) => {
    try {
      dispatch({
        type: 'SET_DEVICE',
        payload: device
      })
    } catch (error) {
      console.log(error)
    }
  }

  const setViewChild = (devicePort: DevicePort) => {
    const deviceChild = globalState.deviceChilds
      .filter((deviceChild: Device) => deviceChild.ports)
      .find((device: Device) => {
        if (device.ports !== undefined)
          return device.ports[0].parentId === devicePort.portId
        else return false
      })
    try {
      dispatch({
        type: 'SET_VIEW_CHILD',
        payload: deviceChild ?? {}
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <DeviceContext.Provider
      value={{
        deviceChilds: globalState.deviceChilds,
        viewChild: globalState.viewChild,
        setViewChild,
        setDevice,
        setDeviceChilds
      }}
    >
      {children}
    </DeviceContext.Provider>
  )
}
