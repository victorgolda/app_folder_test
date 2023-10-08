import React from 'react'
import MenuDrawer from './MenuDrawer'
import { Toaster } from 'react-hot-toast'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster position='top-right' />
      <div className='grid grid-cols-12 h-screen'>
        <div className='col-span-2 bg-slate-950'>
          <MenuDrawer />
        </div>
        <div className='col-span-10 p-4  bg-white'>
          <main>{children}</main>
        </div>
      </div>
    </>
  )
}
