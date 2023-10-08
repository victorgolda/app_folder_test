import React from 'react'
import { DevicePort } from '@/types/devices'
import DevicePortList from '../atoms/DevicePortContainer'

type Props = {
  devicePorts: DevicePort[]
}

const DevicePortsGroup = ({ devicePorts }: Props) => {
  return (
    <>
      {devicePorts
        .filter((port) => port.isSlave === undefined)
        .sort((a, b) => b.portNumber - a.portNumber)
        .map((devicePort: any) => (
          <DevicePortList key={devicePort.portId} devicePort={devicePort} />
        ))}
    </>
  )
}

export default DevicePortsGroup
