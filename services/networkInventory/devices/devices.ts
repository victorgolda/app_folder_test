export interface GetDevice {
  query: string
  fields: string
}

import {
  clientNetworkInventoryAxios,
  serverNetworkInventoryAxios
} from '@/utils/axios/axios'
import { networkInventoryUrls } from 'services/urls'
import { networkInventoryFetchInstance } from '@/utils/fetch/fetch'

export const getDeviceService = async ({ query, fields }: GetDevice) => {
  const { data: device } = await clientNetworkInventoryAxios.get('device', {
    params: { query, fields }
  })
  return device
}

/* export const getDeviceService = async ({ query, fields }: GetDevice) => {
  const device = await networkInventoryFetchInstance({
    url: networkInventoryUrls.getDevice,
    method: 'GET',
    params: { query, fields }
  })
  return device
} */
