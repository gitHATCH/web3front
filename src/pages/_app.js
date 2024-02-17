/* Construccion inicial de la APP */
import { useState, useEffect } from 'react';
import '../styles/globals.css'
import Layout from '../components/Layout';
import { SlidebarProvider } from '../hooks/SlidebarContext';
import { ToastContainer } from 'react-toastify';
import { ModalProvider } from '../hooks/ModalContext';
import { ClientProvider } from '../hooks/ClientContext';
import { DriverProvider } from '../hooks/DriverContext';
import { OrderProvider } from '../hooks/OrderContext';
import { TruckProvider } from '../hooks/TruckContext';
import { ProductProvider } from '../hooks/ProductContext';
import { AuthProvider } from '../hooks/AuthContext';
import Contexts from '../components/Contexts';

function MyApp({ Component, pageProps }) {
  const [paginaLista, setPaginaLista] = useState(false)

  useEffect(() => {
    setPaginaLista(true)
  }, [])
  
  /*
  return paginaLista ? (
    <AuthProvider>
      <ModalProvider>
          <SlidebarProvider>
            <ToastContainer closeOnClick /> 
              <OrderProvider>
                <ClientProvider>
                  <DriverProvider>
                    <TruckProvider>
                      <ProductProvider>
                        <Layout>
                          <Component {...pageProps}/>
                        </Layout>
                      </ProductProvider>
                    </TruckProvider>
                  </DriverProvider>
                </ClientProvider>
              </OrderProvider>    
          </SlidebarProvider>
      </ModalProvider>
    </AuthProvider>
  ) : null
*/


return paginaLista ? (
  <AuthProvider>
    <ModalProvider>
        <SlidebarProvider>
          <ToastContainer closeOnClick /> 
          <Layout>
            <Component {...pageProps}/>
          </Layout>
        </SlidebarProvider>
    </ModalProvider>
  </AuthProvider>
) : null
  
        
    }

export default MyApp
