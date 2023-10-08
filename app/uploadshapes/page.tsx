import React from 'react'
import UploadShapesForm from '@/components/uploadshapes/organism/UploadShapesForm'
import UploadShapesProvider from '@/contexts/uploadshapes/Context'

export default function UploadShapesPage() {
  return (
    <UploadShapesProvider>
      <UploadShapesForm />
    </UploadShapesProvider>
  )
}
