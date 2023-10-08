import React from 'react'

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  cn
} from '@nextui-org/react'

interface Props {
  deviceLocation: DeviceLocation
}

interface DeviceLocation {
  lat: number
  lng: number
}

import { EllipsisHorizontalCircleIcon } from '@heroicons/react/20/solid'
export default function NewDeviceOptionsMenu({ deviceLocation }: Props) {
  const iconClasses =
    'text-xl text-default-500 pointer-events-none flex-shrink-0'

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          isIconOnly
          //color='#3A82F6'
          variant='faded'
          aria-label='Take a photo'
        >
          <EllipsisHorizontalCircleIcon className='w-7 fill-blue-500' />
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant='faded' aria-label='Dropdown menu with description'>
        <DropdownItem
          key='location'
          onClick={() => {
            window.open(
              `https://maps.google.com/?q=${deviceLocation.lat},${deviceLocation.lng}`,
              '_blank'
            )
          }}
          //shortcut='⌘N'
          description='Google Maps'
          /* startContent={<AddNoteIcon className={iconClasses} />} */
        >
          Ver ubicación
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
