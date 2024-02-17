import { useRouter } from 'next/router'
import React from 'react'
import { OrderContext } from '../../hooks/OrderContext'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import Spinner from '../../components/Spinner'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

const Order = () => {
  const [order, setOrder] = useState({}) 
  const [load, setLoad] = useState(0) 
  const router = useRouter()
  const [orders,getOrders,loading,actualOrder,handleActualOrder,deleteOrder,editOrder,addOrder] = useContext(OrderContext)
  const colorOff = "text-red-800 hover:text-red-900"
  const colorOn = "text-green-800 hover:text-green-900"
  const [color, setColor] = useState(colorOff)

  useEffect(() => {
    getOrders()
  }, [])

  useEffect(() => {
    setOrder(orders[actualOrder])
  }, [orders])
  

  useEffect(() => {
    
    if("[numero]" === router.asPath.split('/')[2]){
      router.push("/bombs")
    }
  }, [])

  const turnBomb = () => {
    if(color === colorOff){
      setColor(colorOn)
    }else{
      setColor(colorOff)
    }
  }
  const num = 25
  const height = num + "%";
  

  return (
    <>
        <div className="w-full flex justify-between items-center px-10">
          <div>
            <h1 className='text-left text-7xl font-mono font-semibold mt-10'>Orden: {order?.numero}</h1>
          </div>
          <div>
            <button className='w-10 h-fit'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" /></svg>
            </button>
          </div>
        </div>
        <h2 className='mt-2 text-center text-3xl font-mono font-semibold ml-10 bg-slate-300 hover:bg-slate-400 w-40 rounded-lg cursor-default'>Estado {order?.estado}</h2>
     
      <div className='flex flex-row justify-between p-40'>
        <div className=' bg-slate-600 rounded-3xl shadow-2xl shadow-black p-20 items-center justify-center'>
          <p className='text-4xl -tracking-tighter font-mono font-semibold uppercase w-full'>Preset 
            <span className='shadow-lg shadow-black ml-5 bg-slate-700 hover:bg-slate-400 rounded-3xl p-1 px-10 text-white'>{order.preset}</span>
          </p>
          <p className='text-4xl -tracking-tighter font-mono font-semibold uppercase mt-10'>Camion 
            <span className='shadow-lg shadow-black ml-5 bg-slate-700 hover:bg-slate-400 rounded-3xl p-1 px-10 text-white'>{order.camion}</span>
          </p>
          <p className='text-4xl -tracking-tighter font-mono font-semibold uppercase mt-10'>Cliente 
            <span className='shadow-lg shadow-black ml-5 bg-slate-700 hover:bg-slate-400 rounded-3xl p-1 px-10 text-white'>{order.cliente}</span>
          </p>
          <p className='text-4xl -tracking-tighter font-mono font-semibold uppercase mt-10'>Producto 
            <span className='shadow-lg shadow-black ml-5 bg-slate-700 hover:bg-slate-400 rounded-3xl p-1 px-10 text-white'>{order.producto}</span>
          </p>
          <p className='text-4xl -tracking-tighter font-mono font-semibold uppercase mt-10'>Conductor 
            <span className='shadow-lg shadow-black ml-5 bg-slate-700 hover:bg-slate-400 rounded-3xl p-1 px-10 text-white'>{order.chofer}</span>
          </p>
        </div>
        <div className='flex w-full items-center justify-center text-center'>
          <button className='border border-black hover:border-transparent shadow-black shadow-xl rounded-full bg-slate-800 hover:bg-slate-700 cursor-pointer' onClick={turnBomb}>
            <PowerSettingsNewIcon className={`${color}`} style={{ fontSize: '20rem'}}/>
          </button> 
        </div>
        <div className='flex-1 w-full items-center justify-center p-10'>
          <div className="tanque rounded-full bg-slate-800 shadow-2xl shadow-black w-full h-full">
            <div className="tanque-liquido bg-blue-800 hover:bg-blue-900" style={{ height }} />
          </div>  
          <div className='flex flex-row text-center items-center justify-center w-full'>
            <p className='ml-5 text-7xl font-mono font-extrabold -tracking-tight p-8'>25%</p>
        
          </div>
        </div>
        
      </div>
      

    </>
  )
}

export default Order