/* Construccion inicial de la APP */
import { useState, useEffect } from 'react';
import '../styles/globals.css'
import Layout from '../components/Layout';
import { ToastContainer } from 'react-toastify';
import { OrderProvider } from '../hooks/OrderContext';
import { AuthProvider } from '../hooks/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  const [paginaLista, setPaginaLista] = useState(false)

  useEffect(() => {
    setPaginaLista(true)
  }, [])

  return paginaLista ? (
    <AuthProvider>
      <OrderProvider>
        <ToastContainer closeOnClick /> 
        <Layout>
          <Component {...pageProps}/>
        </Layout>
      </OrderProvider>
    </AuthProvider>
  ) : null   
}

export default MyApp
