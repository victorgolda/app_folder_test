import useNetworkInventoryAxiosInterceptor from '@/hooks/useNetworkInventoryAxiosInterceptor'
const useNetworkInventoryServices = () => {
  const networkInventoryAxios = useNetworkInventoryAxiosInterceptor()

  const getCoverageAreasService = async () => {
    return await networkInventoryAxios.get('coverage/locations')
  }

  const getLocationHasCoverageService = async ({
    lat,
    lng,
    fields
  }: {
    lat: string
    lng: string
    fields?: string
  }) => {
    return networkInventoryAxios.get('coverage/location', {
      params: { lat, lng }
    })
  }

  const getDevicesService = async ({
    tags_device_types,
    fields,
    limit = 100
  }: {
    tags_device_types: string
    fields: string
    limit: number
  }) => {
    return networkInventoryAxios.get('devices', {
      params: { tags_device_types, fields, limit }
    })
  }

  const createCoverageLocationService = async ({
    name,
    description,
    type,
    coords
  }: {
    name: string
    description: string
    type: string
    coords: number[]
  }) => {
    const { data: device } = await networkInventoryAxios.post(
      'coverage/location',
      {
        name,
        description,
        type,
        coords
      }
    )
    return device
  }

  return {
    getLocationHasCoverageService,
    getCoverageAreasService,
    getDevicesService,
    createCoverageLocationService
  }
}

export default useNetworkInventoryServices
