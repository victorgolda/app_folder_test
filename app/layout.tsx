import MenuDrawer from '@/components/shared/MenuDrawer'
//import './globals.css'
import '@/styles/globals.css'
import '@/styles/googleMaps.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <div className='grid grid-cols-12 h-screen'>
            <Toaster position='top-right' />
            <div className='col-span-2 bg-slate-950'>
              <MenuDrawer />
            </div>
            <div className='col-span-10 p-4  bg-white'>
              <main>{children}</main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
