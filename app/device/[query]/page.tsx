import React from 'react'
import DeviceProvider from '@/contexts/device/Context'
import DeviceDashboard from '@/components/device/organisms/DeviceDashboard'
import {
  getDeviceChildsService,
  getDeviceCircuitService,
  getDeviceService
} from '@/services/networkInventory/networkInventory'
import DeviceNotFound from '@/components/device/organisms/DeviceNotFound'
import _ from 'lodash'
import Loading from '@/components/shared/Loading'

import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths
} from 'next'

/* type Props = {
  device: any
  deviceChilds: any
  deviceCircuit: any
} */
type Props = {
  params: Params
}

type Params = {
  query: string
}

const DevicePage = async ({ params }: Props) => {
  let { query } = params
  let device = {} as any
  let deviceChilds = [] as any
  let deviceCircuit = {} as any
  const getDevice = getDeviceService({ query: query, fields: '' })
  const getDeviceChilds = getDeviceChildsService({
    query: query,
    fields:
      '_id,name,geoLocation,ports,customerId,deviceTypeName,idDeviceType,location,description,deviceType,deviceTypeTags'
  })
  const getDeviceCircuit = getDeviceCircuitService({
    query: query,
    fields: ''
  })
  await Promise.allSettled([getDevice, getDeviceChilds, getDeviceCircuit]).then(
    (values) => {
      if (values[0].status === 'fulfilled') {
        device = values[0].value
      }
      if (values[1].status === 'fulfilled') {
        deviceChilds = values[1].value
      }
      if (values[2].status === 'fulfilled') {
        deviceCircuit = values[2].value
      }
    }
  )
  let compontent = <></>
  if (device === undefined) {
    compontent = <Loading />
  } else {
    if (_.isEmpty(device)) {
      compontent = <DeviceNotFound />
    } else {
      compontent = (
        <DeviceProvider>
          <DeviceDashboard
            device={device}
            deviceChilds={deviceChilds}
            deviceCircuit={deviceCircuit}
          />
        </DeviceProvider>
      )
    }
  }
  return <>{compontent}</>
}

export default DevicePage

/* export const getStaticProps = async (context: any) => {
  let deviceQuery = context.params.query as string
  let device = {} as any
  let deviceChilds = [] as any
  let deviceCircuit = {} as any
  const getDevice = await getDeviceService({ query: deviceQuery, fields: '' })
  const getDeviceChilds = await getDeviceChildsService({
    query: deviceQuery,
    fields:
      '_id,name,geoLocation,ports,customerId,deviceTypeName,idDeviceType,location,description,deviceType,deviceTypeTags'
  })
  const getDeviceCircuit = await getDeviceCircuitService({
    query: deviceQuery,
    fields: ''
  })

  await Promise.allSettled([getDevice, getDeviceChilds, getDeviceCircuit]).then(
    (values) => {
      if (values[0].status === 'fulfilled') {
        device = values[0].value
      }
      if (values[1].status === 'fulfilled') {
        deviceChilds = values[1].value
      }
      if (values[2].status === 'fulfilled') {
        deviceCircuit = values[2].value
      }
    }
  )
  return { props: { device, deviceChilds, deviceCircuit } }
}

export const getStaticPaths = (async () => {
  return {
    paths: [],
    fallback: true // false or "blocking"
  }
}) satisfies GetStaticPaths
 */
