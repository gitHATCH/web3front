/* Layout que divide entre slidebar y contenido */
import React, { useContext } from 'react'
import SidebarLayout from './SidebarLayout'
import { SlidebarContext } from '../hooks/SlidebarContext'

const Layout = ({children}) => {
  const [collaps] = useContext(SlidebarContext)
  return (
    <div className=''>
        <div className='flex flex-row h-screen'>
            <div className={`${collaps ? "md:w-20 2xl:w-20" : "md:w-1/4 2xl:w-1/6"}`}>
                <SidebarLayout/>
            </div>
            <div className={`w-full flex-1 overflow-y-auto`}>
                {children}
            </div>
        </div>
    </div>
  )
}

export default Layout