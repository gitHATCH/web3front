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
import ModalConfigOrder from '../../components/Modals/ModalConfigOrder'
import ModalConciliacion from '../../components/Modals/ModalConciliacion'
import DefaultTable from '../../components/DefaultTable'


const Order = () => {
  const [order, setOrder] = useState({}) 
  const [load, setLoad] = useState(0) 
  const router = useRouter()
  const [orders,getOrders,loading,actualOrder,handleActualOrder,deleteOrder,editOrder,addOrder,addTara,turnBomb,disableAlarm,changeUmbral,updateOrder,stopOrder,sendFinalWhight,actualConcil,getConcil] = useContext(OrderContext)
  const [modalDelete, modalEdit, handleModalDelete, handleModalEdit, handleModalLogOut, modalLogOut, modalAdd, handleModalAdd, modalPassword, handleModalPassword, modalConfigOrder, handleModalConfigOrder, modalConcil, handleModalConcil] = useContext(ModalContext);
  const colorOff = "text-red-800 hover:text-red-900"
  const colorOn = "text-green-800 hover:text-green-900"
  const [color, setColor] = useState(colorOff)
  const [height, setHeight] = useState(0)


  useEffect(() => {
    if(actualOrder){
      const masaActual = actualOrder.ultimaMasa
      const estado = actualOrder.estado
      const height = masaActual ? (masaActual*100/actualOrder.preset) : 0
      setHeight(`${height.toFixed(0)}%`)
    }
  }, [actualOrder])
  
  useEffect(() => {
    if("[numero]" === router.asPath.split('/')[2]){
      router.push("/bombs")
    }
  }, [])



  if(!actualOrder) return


  const loadTara = async () => {
    const pass = await addTara()
    toast.info('Clave de activación copiada al portapapeles!')
    navigator.clipboard.writeText(pass)
  }

  const checkAlarm = () => {
      disableAlarm()
  }

  const updateActualOrder = () => {
    updateOrder()
  }

  const handleBomb = () => {
    if(color == colorOn){
      stopOrder()
      updateOrder()
    }else {
      handleModalPassword()
    }
  }

  const enableConcil = () => {
    sendFinalWhight()
  }

  const showConcil = () => {
    getConcil().then(() => handleModalConcil())
  }

  const formatDate = (fechaUTC) => {
    const fecha = new Date(fechaUTC);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'America/Argentina/Buenos_Aires'
    };

    return fecha.toLocaleString('es-AR', options);
  }

 

/*
  const calculateEta = (carga) => {
    const masa = carga ? carga.masa : actualOrder.ultimaMasa
    const caudal = carga ? carga.caudal : actualOrder.ultimoCaudal

    const restante = actualOrder.preset - masa
    const eta = (caudal > 0 ? (restante/caudal) : Infinity).toFixed(0)
    const hours = Math.floor(eta / 3600);
    const minutes = Math.floor((eta - (hours * 3600)) / 60);
    const seconds = eta - (hours * 3600) - (minutes * 60);
    return `${hours}h:${minutes}m:${seconds}s`;
  }

  const calculateTiempoTranscurrido = (carga) => {
    const fechaDetalleFinal = carga ? carga.fechaDetalle : actualOrder.fechaDetalleFinal
    const tiempo = (new Date(fechaDetalleFinal) - new Date(actualOrder.fechaDetalleInicial))
    const segundos = Math.floor((tiempo / 1000) % 60);
    const minutos = Math.floor((tiempo / 1000 / 60) % 60);
    const horas = Math.floor((tiempo / 1000 / 60 / 60) % 24);
    return`${horas}h:${minutos}m:${segundos}s`;
  }*/
  
  return (
    <>
        <div className="w-full flex justify-between items-center px-10">
          <div>
            <h1 className='text-left text-7xl font-mono font-semibold mt-10'>Orden: {actualOrder?.numeroOrden}</h1>
          </div>
          
          <div className='flex gap-4'>
            {actualOrder.estado == 3 && (
              <button onClick={enableConcil} className='px-2 py-1 w-[200px] flex items-center justify-center text-center bg-blue-500 hover:bg-blue-400 shadow-sm shadow-black rounded-lg text-white font-semibold'>Pesaje Final</button>
            )}
            {actualOrder.estado >= 2 && (
              <button className='p-2 hover:bg-green-800 rounded-full'>
                <svg xmlns="http://www.w3.org/2000/svg" onClick={updateActualOrder} className='w-10 h-fit hover:opacity-70' viewBox="0 0 24 24"><title>refresh</title><path d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z" /></svg>
              </button>
            )}
            <button className='p-2 hover:bg-green-800 rounded-full mr-2'>
              {!actualOrder?.alarma ? (
                  <svg xmlns="http://www.w3.org/2000/svg" onClick={() => toast.info("Ninguna notificación aún")} className='w-10 h-fit hover:opacity-70' viewBox="0 0 24 24"><title>bell</title><path d="M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className='w-10 h-fit hover:opacity-70 fill-red-700' onClick={() => checkAlarm()} viewBox="0 0 24 24"><title>bell-alert</title><path d="M23 7V13H21V7M21 15H23V17H21M12 2A2 2 0 0 0 10 4A2 2 0 0 0 10 4.29C7.12 5.14 5 7.82 5 11V17L3 19V20H21V19L19 17V11C19 7.82 16.88 5.14 14 4.29A2 2 0 0 0 14 4A2 2 0 0 0 12 2M10 21A2 2 0 0 0 12 23A2 2 0 0 0 14 21Z" /></svg>
                ) 
              }
            </button>
            <button className='p-2 hover:bg-green-800 rounded-full'>
              <svg xmlns="http://www.w3.org/2000/svg" onClick={handleModalConfigOrder} className='w-10 h-fit hover:opacity-70' viewBox="0 0 24 24"><path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" /></svg>
            </button>
          </div>
        </div>
        <h2 className='mt-2 text-center text-3xl font-mono font-semibold ml-10 bg-slate-300 hover:bg-slate-400 w-40 rounded-lg cursor-default'>Estado {actualOrder?.estado}</h2>
        
  
        <div className='flex flex-row justify-between p-10 w-fit items-center'>
          <div>
            <h1 className='text-2xl mb-2 font-semibold'>Datos</h1>
            <div className=' bg-slate-300 rounded-3xl shadow-2xl shadow-black p-10 items-center justify-center'>
              <p className='text-2xl -tracking-tighter font-mono font-semibold uppercase'>Producto:<span className='ml-2 font-normal tracking-tight'>{actualOrder?.nombreProducto}</span></p>
              <p className='text-2xl -tracking-tighter font-mono font-semibold uppercase mt-5'>Camión: <span className='ml-2 font-normal tracking-tight'>{actualOrder?.patenteCamion}</span></p>
              <p className='text-2xl -tracking-tighter font-mono font-semibold uppercase mt-5'>Cliente: <span className='ml-2 font-normal tracking-tight'>{actualOrder?.razonSocialCliente}</span></p>
              <p className='text-2xl -tracking-tighter font-mono font-semibold uppercase mt-5'>Conductor: <span className='ml-2 font-normal tracking-tight'>{actualOrder?.dniChofer}</span></p>
              <p className='text-2xl -tracking-tighter font-mono font-semibold uppercase mt-5'>Preset: <span className='ml-2 font-normal tracking-tight'>{actualOrder?.preset} Kg</span></p>
              <p className='text-2xl -tracking-tighter font-mono font-semibold uppercase mt-5'>Umbral Temperatura: <span className='ml-2 font-normal tracking-tight'>{actualOrder?.temperaturaUmbral} C°</span></p>

              {actualOrder?.estado >= 2 && (
                <p className='text-2xl -tracking-tighter font-mono font-semibold uppercase mt-5'>Tara: <span className='ml-2 font-normal tracking-tight'>{actualOrder?.tara} Kg</span></p>
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


          {actualOrder?.estado >= 2 && actualOrder?.ultimaMasa !== 0 && (
            <div className='ml-20'>
              <h1 className='text-2xl mb-2 font-semibold'>Última Carga</h1>
              <div className=' bg-slate-300 rounded-3xl shadow-2xl shadow-black p-10 items-center justify-center'>
                <p className='text-2xl -tracking-tighter font-mono font-semibold uppercase'>Masa:<span className='ml-2 font-normal tracking-tight'>{actualOrder?.ultimaMasa} Kg</span></p>
                <p className='text-2xl -tracking-tighter font-mono font-semibold uppercase mt-5'>Temperatura: <span className='ml-2 font-normal tracking-tight'>{actualOrder?.ultimaTemperatura} C°</span></p>
                <p className='text-2xl -tracking-tighter font-mono font-semibold uppercase mt-5'>Densidad: <span className='ml-2 font-normal tracking-tight'>{actualOrder?.ultimaDensidad} Kg/m³</span></p>
                <p className='text-2xl -tracking-tighter font-mono font-semibold uppercase mt-5'>Caudal: <span className='ml-2 font-normal tracking-tight'>{actualOrder?.ultimoCaudal} Kg/h</span></p>
                <p className='text-2xl -tracking-tighter font-mono font-semibold uppercase mt-5'>ETA: <span className='ml-2 font-normal tracking-tight'>{actualOrder?.tiempoEstimadoCarga}</span></p>
                <p className='text-2xl -tracking-tighter font-mono font-semibold uppercase mt-5'>Tiempo Transcurrido: <span className='ml-2 font-normal tracking-tight'>{actualOrder?.tiempoTranscurrido}</span></p> 
              </div>
            </div>
          )}
          {actualOrder?.estado == 2 && (
            <div className='flex flex-col w-fit h-fit p-10 ml-20 justify-center'>
              <h1 className='text-center text-2xl mb-2 font-semibold uppercase'>Bomba</h1> 
              <button className='border border-black hover:border-transparent shadow-black shadow-xl rounded-full bg-slate-800 hover:bg-slate-700 cursor-pointer' onClick={ handleBomb }>
                <PowerSettingsNewIcon className={`${color}`} style={{ fontSize: '10rem'}}/>
              </button>
            </div>
          )}
          {actualOrder?.estado >= 2 && actualOrder?.ultimaMasa !== 0 && (
            <div className='ml-20 items-center justify-center p-10 h-[400px] w-56'>
              <div className="tanque rounded-full bg-slate-800 shadow-2xl shadow-black h-full">
                <div className="tanque-liquido bg-blue-800 hover:bg-blue-900" style={{ height }} />
              </div>  
              <div className='flex flex-row text-center items-center justify-center'>
                <p className='ml-5 text-7xl font-mono font-extrabold -tracking-tight p-8'>{height}</p>
              </div>
            </div>
          )} 


          
        </div>
        {actualOrder?.estado >= 4 &&
        <div className='mt-20 w-full flex justify-center items-center'>
            <button onClick={showConcil} className='bg-blue-600 hover:bg-blue-500 px-2 py-1 w-[500px] rounded-lg shadow-sm shadow-black text-3xl uppercase font-semibold text-white'>Conciliación</button>
        </div>
      }
             
      {actualOrder?.estado >= 2 && actualOrder?.ultimaMasa !== 0 && actualOrder?.detalle.length > 0 && (
       
        <div className='w-full mt-10 mb-10'>
          <h1 className='text-3xl font-semibold text-center mb-5'>Cargas</h1>
          <DefaultTable cargas={true} data={actualOrder?.detalle.map((detail) => {
            return {
              fechaDetalle: formatDate(detail.fechaDetalle),
              masa: detail.masa,
              temperatura: detail.temperatura,
              densidad: detail.densidad,
              caudal: detail.caudal,
              eta: detail.tiempoEstimadoCarga,
              tiempo: detail.tiempoTranscurrido
            }
          })} headers={['Fecha', 'Masa', 'Temperatura', 'Densidad', 'Caudal', 'ETA', 'Tiempo']} />
        </div>


      )}

     
        
      {modalPassword && <ModalPassword setColor={setColor}/>} 
        {modalConfigOrder && <ModalConfigOrder/> }
        {modalConcil && <ModalConciliacion/>}
    </>
  )
}

export default Order