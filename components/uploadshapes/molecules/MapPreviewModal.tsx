import React from 'react'
import { Modal, ModalContent, ModalBody } from '@nextui-org/react'
import MapPreview from '../organism/MapPreview'
import { MarkerMap, PolygonMap } from '@/types/map'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  newPolygons?: PolygonMap[]
  newPoints?: MarkerMap[]
}

export default function MapPreviewModal({
  open,
  setOpen,
  newPolygons,
  newPoints
}: Props) {
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Modal size={'full'} isOpen={open} onClose={handleClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <MapPreview newPolygons={newPolygons} newPoints={newPoints} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
