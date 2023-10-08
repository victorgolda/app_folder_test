import useNetworkInventoryAxiosInterceptor from '@/hooks/useNetworkInventoryAxiosInterceptor'
import { NewDevice, NewPolygon } from '@/types/uploadShapes'

const useUploadShapesServices = () => {
  const networkInventoryAxios = useNetworkInventoryAxiosInterceptor()

  const analyzeShapesService = async ({ files }: { files: File[] }) => {
    let formData = new FormData()
    files.forEach((file) => {
      formData.append('files', file)
    })
    const { data: result } = await networkInventoryAxios.post(
      '/files/analyze/shape',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    )
    return result
  }

  const createShapeElementsService = async ({
    newDevices,
    newPolygons
  }: {
    newDevices: NewDevice[]
    newPolygons: NewPolygon[]
  }) => {
    const { data: newElements } = await networkInventoryAxios.post(
      'files/elements',
      {
        new_devices: newDevices,
        new_polygons: newPolygons
      }
    )
    return newElements
  }

  return {
    analyzeShapesService,
    createShapeElementsService
  }
}

export default useUploadShapesServices
