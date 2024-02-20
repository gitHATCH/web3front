/* Layout que divide entre slidebar y contenido */
import React, { useContext } from 'react'
import SidebarLayout from './SidebarLayout'
import { SlidebarContext } from '../hooks/SlidebarContext'




import { ProductProvider } from '../hooks/ProductContext';
import { ClientProvider } from '../hooks/ClientContext';
import { DriverProvider } from '../hooks/DriverContext';
import { OrderProvider } from '../hooks/OrderContext';
import { TruckProvider } from '../hooks/TruckContext';
import { AuthContext } from '../hooks/AuthContext';
import Login from './Login';

const Layout = ({children}) => {
  const [collaps] = useContext(SlidebarContext)
  const {auth, loading} = useContext(AuthContext);
  return (
    
    <div className='flex flex-row h-screen'>
      {(!auth) ? (
        <>
          <Login/>
        </>
      ) : (
        <>
          <OrderProvider>
            <ClientProvider>
              <DriverProvider>
                <TruckProvider>
                  <ProductProvider>
                  <div className='flex flex-row h-screen w-full app '>
                    <div className={`${collaps ? "md:w-20 2xl:w-20" : "md:w-1/4 2xl:w-[350px]"}`}>
                      <SidebarLayout/>
                    </div>
                    <div className={`w-full flex-1 overflow-y-auto`}>
                        {children}
                    </div>
                  </div>
                  </ProductProvider>
                </TruckProvider>
              </DriverProvider>
            </ClientProvider>
          </OrderProvider>    
        </>
      )}
        
    </div>
  )
}

export default Layout