import { useRouter } from 'next/router'
import React from 'react'
import { OrderContext } from '../../hooks/OrderContext'
import { ModalContext } from '../../hooks/ModalContext'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import Spinner from '../../components/Spinner'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { toast } from 'react-toastify'
import ModalPassword from '../../components/Modals/ModalPassword'

const Order = () => {
  const [order, setOrder] = useState({}) 
  const [load, setLoad] = useState(0) 
  const router = useRouter()
  const [orders,getOrders,loading,actualOrder,handleActualOrder,deleteOrder,editOrder,addOrder,addTara,turnBomb,getConcil,disableAlarm] = useContext(OrderContext)
  const [modalDelete, modalEdit, handleModalDelete, handleModalEdit, handleModalLogOut, modalLogOut, modalAdd, handleModalAdd, modalPassword, handleModalPassword] = useContext(ModalContext);
  const colorOff = "text-red-800 hover:text-red-900"
  const colorOn = "text-green-800 hover:text-green-900"
  const [color, setColor] = useState(colorOff)
  const [pass, setPass] = useState("");  
  const [height, setHeight] = useState(0)

  
  useEffect(() => {
    if(actualOrder){
      const masaActual = actualOrder.ultimaMasa
      const estado = actualOrder.estado
      const height = estado >= 3 ? 100 : (masaActual ? (masaActual*100/actualOrder.preset) : 0)
      setHeight(`${height.toFixed(0)}%`)
    }
  }, [actualOrder])
  
  useEffect(() => {
    if("[numero]" === router.asPath.split('/')[2]){
      router.push("/bombs")
    }
  }, [])

  if(!actualOrder) return

/*
  const handleTurnBomb = () => {
    if(color === colorOff) {
      setColor(colorOn)
      turnBomb(() => setColor())
    } else{
      setColor(colorOff)
    }
  }


  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

  function formatEta(eta) {
    const etaf = eta.toFixed(0)
    const hours = Math.floor(etaf / 3600);
    const minutes = Math.floor((etaf - (hours * 3600)) / 60);
    const seconds = etaf - (hours * 3600) - (minutes * 60);
    return `${hours}h:${minutes}m:${seconds}s`;
  }

  */
  const loadTara = () => {
    addTara()
  }

  const checkAlarm = () => {
      disableAlarm()
  }
  return (
    <>
        <div className="w-full flex justify-between items-center px-10">
          <div>
            <h1 className='text-left text-7xl font-mono font-semibold mt-10'>Orden: {actualOrder?.numeroOrden}</h1>
          </div>
          
          <div className=''>
            <button className='p-2 hover:bg-green-800 rounded-full mr-2'>
              {!actualOrder?.alarma ? (
                  <svg xmlns="http://www.w3.org/2000/svg" onClick={() => toast.info("Ninguna notificación aún")} className='w-10 h-fit hover:opacity-70' viewBox="0 0 24 24"><title>bell</title><path d="M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className='w-10 h-fit hover:opacity-70 fill-red-700' onClick={() => checkAlarm()} viewBox="0 0 24 24"><title>bell-alert</title><path d="M23 7V13H21V7M21 15H23V17H21M12 2A2 2 0 0 0 10 4A2 2 0 0 0 10 4.29C7.12 5.14 5 7.82 5 11V17L3 19V20H21V19L19 17V11C19 7.82 16.88 5.14 14 4.29A2 2 0 0 0 14 4A2 2 0 0 0 12 2M10 21A2 2 0 0 0 12 23A2 2 0 0 0 14 21Z" /></svg>
                ) 
              }
            </button>
            <button className='p-2 hover:bg-green-800 rounded-full'>
              <svg xmlns="http://www.w3.org/2000/svg" className='w-10 h-fit hover:opacity-70' viewBox="0 0 24 24"><path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" /></svg>
            </button>
          </div>
        </div>
        <h2 className='mt-2 text-center text-3xl font-mono font-semibold ml-10 bg-slate-300 hover:bg-slate-400 w-40 rounded-lg cursor-default'>Estado {actualOrder?.estado}</h2>
        
  
        <div className='flex flex-row justify-between p-10 w-fit items-center'>
          <div>
            <h1 className='text-2xl mb-2 font-semibold'>Datos</h1>
            <div className=' bg-slate-300 rounded-3xl shadow-2xl shadow-black p-10 items-center justify-center'>
              <p className='text-2xl -tracking-tighter font-mono font-semibold uppercase'>Producto:<span className='ml-2 font-normal tracking-tight'>{actualOrder?.producto.nombre}</span></p>
              <p className='text-2xl -tracking-tighter font-mono font-semibold uppercase mt-5'>Camión: <span className='ml-2 font-normal tracking-tight'>{actualOrder?.camion.patente}</span></p>
              <p className='text-2xl -tracking-tighter font-mono font-semibold uppercase mt-5'>Conductor: <span className='ml-2 font-normal tracking-tight'>{actualOrder?.chofer.dni}</span></p>
              <p className='text-2xl -tracking-tighter font-mono font-semibold uppercase mt-5'>Preset: <span className='ml-2 font-normal tracking-tight'>{actualOrder?.preset}</span></p>
              <p className='text-2xl -tracking-tighter font-mono font-semibold uppercase mt-5'>Umbral Temperatura: <span className='ml-2 font-normal tracking-tight'>{actualOrder?.temperaturaUmbral}</span></p>

              {actualOrder?.estado >= 2 && (
                <p className='text-2xl -tracking-tighter font-mono font-semibold uppercase mt-5'>Tara: <span className='ml-2 font-normal tracking-tight'>{actualOrder?.tara}</span></p>
              )}
            </div>
          </div>
          {actualOrder?.estado == 1 && (
            <div className='flex flex-col w-fit h-fit p-10 ml-20 justify-center'>
              <h1 className='text-center text-2xl mb-2 font-semibold uppercase'>Cargar Tara</h1> 
              <button className='p-4 border border-black hover:border-transparent shadow-black shadow-xl rounded-full bg-slate-800 hover:bg-slate-700 cursor-pointer' onClick={loadTara}>
                <svg xmlns="http://www.w3.org/2000/svg" className='fill-green-800' viewBox="0 0 24 24"><title>tanker-truck</title><path d="M20 8H15V14H2V17H3C3 18.7 4.3 20 6 20S9 18.7 9 17H15C15 18.7 16.3 20 18 20S21 18.7 21 17H23V12L20 8M6 18.5C5.2 18.5 4.5 17.8 4.5 17S5.2 15.5 6 15.5 7.5 16.2 7.5 17 6.8 18.5 6 18.5M18 18.5C17.2 18.5 16.5 17.8 16.5 17S17.2 15.5 18 15.5 19.5 16.2 19.5 17 18.8 18.5 18 18.5M17 12V9.5H19.5L21.5 12H17M14 9.5C14 11.4 12.4 13 10.5 13H4.5C2.6 13 1 11.4 1 9.5S2.6 6 4.5 6H5V5H4V4H8V5H7V6H10.5C12.4 6 14 7.6 14 9.5Z" /></svg>
              </button>
            </div>
          )}


          {/* {actualOrder?.estado >= 2 && actualOrder?.ultimaCarga && (
            <div className='ml-20'>
              <h1 className='text-2xl mb-2 font-semibold'>Última Carga</h1>
              <div className=' bg-slate-300 rounded-3xl shadow-2xl shadow-black p-10 items-center justify-center'>
                <p className='text-2xl -tracking-tighter font-mono font-semibold uppercase'>Masa:<span className='ml-2 font-normal tracking-tight'>{order?.ultimaCarga?.masa}</span></p>
                <p className='text-2xl -tracking-tighter font-mono font-semibold uppercase mt-5'>Temperatura: <span className='ml-2 font-normal tracking-tight'>{order?.ultimaCarga?.temperatura}</span></p>
                <p className='text-2xl -tracking-tighter font-mono font-semibold uppercase mt-5'>Densidad: <span className='ml-2 font-normal tracking-tight'>{order?.ultimaCarga?.densidad}</span></p>
                <p className='text-2xl -tracking-tighter font-mono font-semibold uppercase mt-5'>Caudal: <span className='ml-2 font-normal tracking-tight'>{order?.ultimaCarga?.caudal}</span></p>
                <p className='text-2xl -tracking-tighter font-mono font-semibold uppercase mt-5'>ETA: <span className='ml-2 font-normal tracking-tight'>{order?.ultimaCarga?.eta}</span></p>
                <p className='text-2xl -tracking-tighter font-mono font-semibold uppercase mt-5'>Tiempo: <span className='ml-2 font-normal tracking-tight'>{order?.ultimaCarga?.tiempo}</span></p>
              </div>
            </div>
          )}
          {order?.estado == 2 && (
            <div className='flex flex-col w-fit h-fit p-10 ml-20 justify-center'>
              <h1 className='text-center text-2xl mb-2 font-semibold uppercase'>Bomba</h1> 
              <button className='border border-black hover:border-transparent shadow-black shadow-xl rounded-full bg-slate-800 hover:bg-slate-700 cursor-pointer' onClick={ () => handleModalPassword() }>
                <PowerSettingsNewIcon className={`${color}`} style={{ fontSize: '10rem'}}/>
              </button>
            </div>
          )}
          {order?.estado >= 2 && (
            <div className='ml-20 items-center justify-center p-10 h-[400px] w-56'>
              <div className="tanque rounded-full bg-slate-800 shadow-2xl shadow-black h-full">
                <div className="tanque-liquido bg-blue-800 hover:bg-blue-900" style={{ height }} />
              </div>  
              <div className='flex flex-row text-center items-center justify-center'>
                <p className='ml-5 text-7xl font-mono font-extrabold -tracking-tight p-8'>{height}</p>
              </div>
            </div>
          )} */}


          
        </div>
        {/*       
        <div className='flex justify-center w-full flex-col p-2 mt-10'>
            <h1 className='text-3xl font-semibold text-center  mb-10'>Cargas</h1>
            <table className='w-full'>
              <thead className='rounded bg-white'>
                <tr className=''>
                  <th className='text-center'>Fecha</th>
                  <th className='text-center'>Masa</th>
                  <th className='text-center'>Temperatura</th>
                  <th className='text-center'>Densidad</th>
                  <th className='text-center'>Caudal</th>
                  <th className='text-center'>ETA</th>
                  <th className='text-center'>Tiempo</th>
                </tr>
              </thead>
              <tbody>
                {order?.cargas?.map((carga, index) => (
                  <tr key={index}>
                    <td className='text-center'>{formatDate(carga.fecha)}</td>
                    <td className='text-center'>{carga.masa}</td>
                    <td className='text-center'>{carga.temperatura}</td>
                    <td className='text-center'>{carga.densidad}</td>
                    <td className='text-center'>{carga.caudal}</td>
                    <td className='text-center'>{formatEta(carga.eta)}</td>
                    <td className='text-center'>{formatEta(carga.tiempo)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

        </div> */}
        
        
      {modalPassword && <ModalPassword pass={pass} setPass={setPass} turnBomb={handleTurnBomb}/>}

    </>
  )
}

export default Order