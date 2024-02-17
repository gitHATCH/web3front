/* Layout que divide entre slidebar y contenido */
import React, { useContext } from 'react'
import { OrderProvider } from '../hooks/OrderContext';
import { AuthContext } from '../hooks/AuthContext';
import Login from './Login';

const Layout = ({children}) => {
  const {auth, loading} = useContext(AuthContext);

  return (
    <div className='flex flex-row h-screen'>
      {(!auth) ? (
        <Login/>
      ) : (
        <OrderProvider>
          <div className='w-full app overflow-y-auto'> 
            {children}
          </div>
        </OrderProvider>    
      )}
    </div>
  )
}

export default Layout