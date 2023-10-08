'use client'
import { useContext } from 'react'
import { UploadShapesContext } from '@/contexts/uploadshapes/Context'

const useUploadShapes = () => {
  return useContext(UploadShapesContext)
}
export default useUploadShapes
