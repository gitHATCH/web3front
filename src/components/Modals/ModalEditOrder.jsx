import React, { useContext } from 'react'

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from 'react-toastify';
import { ModalContext } from '../../hooks/ModalContext';
import { useEffect } from 'react';
import { useState } from 'react';
import { OrderContext } from '../../hooks/OrderContext';
import { ClientContext } from '../../hooks/ClientContext';
import { ProductContext } from '../../hooks/ProductContext';
import { DriverContext } from '../../hooks/DriverContext';
import { TruckContext } from '../../hooks/TruckContext';

//* Arreglar lo de los select valor por defecto *//

const ModalEditOrder = ({editActual}) => {
    const [modalDelete, modalEdit, handleModalDelete, handleModalEdit, handleModalLogOut, modalLogOut, modalAdd, handleModalAdd] = useContext(ModalContext);
    const [orders,getOrders,loading,actualOrder,handleActualOrder,deleteOrder,editOrder,addOrder] = useContext(OrderContext);
    const [products, getProducts] = useContext(ProductContext);
    const [clients, getClients] = useContext(ClientContext);
    const [drivers, getDrivers] = useContext(DriverContext);
    const [trucks, getTrucks] = useContext(TruckContext);

    const [order, setOrder] = useState({}) 
    useEffect(() => {
        if(!modalAdd){
            setOrder(orders[actualOrder])
        }
        getTrucks()
        getDrivers()
        getClients()
        getProducts()
    }, [])

    const handleNumberChange = (event) => {
        setOrder((prevOrder) => ({
          ...prevOrder,
          numero: event.target.value,
        }));
    };
    const handleStateChange = (event) => {
        
        setOrder((prevOrder) => ({
          ...prevOrder,
          estado: event.target.value,
        }));
       
    };
    const handlePresetChange = (event) => {
        setOrder((prevOrder) => ({
          ...prevOrder,
          preset: event.target.value,
        }));
    };
    const handleTruckChange = (event) => {
        setOrder((prevOrder) => ({
          ...prevOrder,
          camion: event.target.value,
        }));
    };
    const handleClientChange = (event) => {
        setOrder((prevOrder) => ({
          ...prevOrder,
          cliente: event.target.value,
        }));
    };
    const handleDriverChange = (event) => {
        setOrder((prevOrder) => ({
          ...prevOrder,
          chofer: event.target.value,
        }));
    };
    const handleProductChange = (event) => {
        setOrder((prevOrder) => ({
          ...prevOrder,
          producto: event.target.value,
        }));
    };

    const cancelOption = () => {
        handleModalEdit()
    }
    const confirmOption = () => {
        console.log(order);
        if(!modalAdd){
            editActual(order)
        }else{
            if(!order.numero || !order.estado || !order.preset || !order.camion || !order.cliente || !order.chofer || !order.producto){
                toast.error("Todos los campos son obligatorios")
                return
            }
            addOrder(order) 
        }
        handleModalEdit()
    }

    //Diseño Modal
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        bgcolor: '#262626',
        boxShadow: 24,
        p: 4
      };    


  return (
    <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={modalEdit}
            onClose={handleModalEdit}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
            backdrop: {
                timeout: 500,
            },
            }}
        >
            <Fade in={modalEdit}>
                <Box sx={style} className="rounded-xl">
                    <div className='flex'>
                    <div className='flex-1 flex-col mt-5'>
                        <div className='flex'>
                            <form className='w-full flex-row justify-center'>
                                <div className='mt-10 flex items-center'>
                                    <label htmlFor='num' className='mr-5 font-mono text-white text-xl font-semibold flex-9'>Número</label>
                                    <input id="num" type='number' placeholder='Número de Orden' defaultValue={order?.numero} className='flex-1 rounded-md p-2 bg-slate-600 h-11' onChange={handleNumberChange}/>
                                </div>
                                <div className='mt-10 flex items-center'>
                                    <label htmlFor='state' className='mr-5 font-mono text-white text-xl font-semibold flex-9'>Estado</label>
                                    <select id="state" className='flex-1 rounded-md p-2 bg-slate-600 h-11' defaultValue={""} onChange={handleStateChange}>
                                        <option value={""}>Seleccione un estado</option>
                                        <option value={0}>0</option>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                    </select>
                                </div>

                                <div className='mt-10 flex items-center'>
                                    <label htmlFor='preset' className='mr-5 font-mono text-white text-xl font-semibold flex-9'>Preset</label>
                                    <input id="preset" type='number' placeholder='Carga Objetivo' defaultValue={order?.preset} className='flex-1 rounded-md p-2 bg-slate-600 h-11' onChange={handlePresetChange}/>
                                </div>
                                <div className='mt-10 flex items-center'>
                                    <label htmlFor='truck' className='mr-5 font-mono text-white text-xl font-semibold flex-9'>Camión</label>
                                    <select id="truck" className='flex-1 rounded-md p-2 bg-slate-600 h-11' onChange={handleTruckChange} defaultValue={""}>
                                        <option value={""}>Seleccione un Camion</option>
                                        {trucks?.map((truck, index) => (
                                                <option key={index} value={truck?.patente}>
                                                    {truck.patente}
                                                </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='mt-10 flex items-center'>
                                    <label htmlFor='client' className='mr-5 font-mono text-white text-xl font-semibold flex-9'>Cliente</label>
                                    <select id="client" className='flex-1 rounded-md p-2 bg-slate-600 h-11' onChange={handleClientChange} defaultValue={""}>
                                        <option value={""}>Seleccione un Cliente</option>
                                        {clients?.map((client, index) => (
                                                <option key={index} value={client?.razonSocial}>
                                                    {client.razonSocial}
                                                </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='mt-10 flex items-center'>
                                    <label htmlFor='driver' className='mr-5 font-mono text-white text-xl font-semibold flex-9'>Conductor</label>

                                    <select id="driver" className='flex-1 rounded-md p-2 bg-slate-600 h-11' onChange={handleDriverChange} defaultValue={""}>
                                        <option value={""}>Seleccione un Conductor</option>

                                        {drivers?.map((driver, index) => (
                                                <option key={index} value={driver?.dni}>
                                                    {driver.dni}
                                                </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='mt-10 flex items-center'>
                                    <label htmlFor='product' className='mr-5 font-mono text-white text-xl font-semibold flex-9'>Producto</label>
                                    <select id="product" className='flex-1 rounded-md p-2 bg-slate-600 h-11' onChange={handleProductChange} defaultValue={""}>
                                        <option value={""}>Seleccione un Producto</option>

                                        {products?.map((product, index) => (
                                                <option key={index} value={product?.nombre}>
                                                    {product.nombre}
                                                </option>
                                        ))}
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className='flex justify-between mt-10'>
                            <button type="button" className="bg-slate-700 hover:bg-slate-600 rounded-md w-1/4 h-10 text-white font-mono text-lg cursor-pointer" onClick={cancelOption}>
                                Cancelar
                            </button>
                            <button type="button" className="bg-slate-700 hover:bg-slate-600 rounded-md w-1/4 h-10 text-white font-mono text-lg cursor-pointer" onClick={confirmOption}>
                                {modalAdd ? "Agregar" : "Guardar"}
                            </button>
                        </div>
                    </div>
                    <div className=''>
                        <CancelIcon className='text-red-600 hover:cursor-pointer hover:text-red-300' onClick={handleModalEdit}/>
                    </div>
                    </div>
                </Box>
            </Fade>
        </Modal>
  )
}

export default ModalEditOrder