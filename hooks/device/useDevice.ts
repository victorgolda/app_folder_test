'use client'
import { useContext } from 'react'
import { DeviceContext } from '@/contexts/device/Context'

const useDevice = () => {
  return useContext(DeviceContext)
}
export default useDevice
