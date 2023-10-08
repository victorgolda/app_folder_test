import React from 'react'
import { JellyTriangle } from '@uiball/loaders'

export default function Loading() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='text-center'>
        <JellyTriangle />
      </div>
    </div>
  )
}
