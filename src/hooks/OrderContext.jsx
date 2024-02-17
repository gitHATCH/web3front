import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axiosClient from '../config/axiosClient';
import { v4 as uuidv4 } from 'uuid';

const OrderContext = React.createContext([{}, ()=>{}])

const OrderProvider = (props) => {
    const [orders, setOrders] = useState([])
    const [actualOrder, setActualOrder] = useState(null)
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token');
    
    const getOrders = async () => {
        setLoading(true)
        try {
            const response = (await axiosClient.get('/orden/find-all', { headers: { Authorization: `Bearer ${token}` } }));
            const data = response.data
            .map((orden) => { 
                return {
                    numeroOrden: orden.numeroOrden,
                    estado: orden.estado,
                    preset: orden.preset,
                    camion: orden.camion.patente,
                    cliente: orden.cliente.razonSocial,
                    chofer: orden.chofer.dni,
                    producto: orden.producto.nombre,
                }
            })   
            console.log(data);  
            setOrders(data)

        } catch (error) {
            console.log(error);
        } 
        setLoading(false) 
    }
    
    const handleActualOrder = (order) => {
        setActualOrder(order)
    }

    const deleteOrder = async() => {
        try {
            const updatedOrders = orders.filter((_, index) => index !== actualOrder);
            setOrders(updatedOrders);
            setActualOrder(null);
            toast.success("Orden eliminada correctamente")
        } catch (error) {
            console.log(error);
        }
    }

    const editOrder = async(order) => {
        try {
            console.log(order);
            const updatedOrders = [...orders];
            updatedOrders[actualOrder] = order;
            setOrders(updatedOrders);
            setActualOrder(null);
            toast.success("Orden editada correctamente")
        } catch (error) {
            console.log(error);
        }
    }

    const addOrder = async(order) => {
        try {
            const sendOrder = {...order, camion: order.camion.code, cliente: order.cliente.code, chofer: order.chofer.code, producto: order.producto.code}
            await axiosClient.post('/orden', sendOrder, { headers: { Authorization: `Bearer ${token}` } })
            order = {...order, camion: order.camion.patente, cliente: order.cliente.razonSocial, chofer: order.chofer.dni, producto: order.producto.nombre}
            const updatedOrders = [...orders];
            updatedOrders.push(order)
            setOrders(updatedOrders);
            toast.success("Orden agregada correctamente")
        } catch (error) {
            console.log(error);
        }   
    }


    const addTara = async(order) => {
        try {
            //TODO: add tara
            const updatedOrders = [...orders];
            updatedOrders[actualOrder] = {...updatedOrders[order], estado: 2};
            setOrders(updatedOrders);
         
            toast.info('Clave de activación copiada al portapapeles!')
            navigator.clipboard.writeText('123456')
            
        } catch (error) {
            console.log(error);
        }
    }

    const turnBomb = async (setColor) => {
        try {
            const updatedOrders = [...orders];
            const newTime = new Date();
            updatedOrders[actualOrder] = {...updatedOrders[actualOrder], tiempoInicio: newTime, cargas: []};
            setOrders(updatedOrders);
            loadTruck(() => setColor(),newTime);
        } catch (error) {
            console.log(error);
        }
    }

    const loadTruck = async (setColor,newTime) => {
        try {
            let load = 0
            const interval = setInterval(() => {
                const tiempoTranscurrido = (Date.now() - newTime) / 1000;
                const caudal = Math.random() * 100
                const cargaRestante = orders[actualOrder].preset - load;
                const eta = caudal > 0 ? cargaRestante / caudal : Infinity;
                const ultimaCarga = {
                    temperatura: Math.random() * 100,
                    densidad: Math.random() * 100,
                    caudal: caudal,
                    masa: load,
                    eta: eta,
                    tiempo: tiempoTranscurrido,
                    fecha: Date.now(),
                }
                setOrders(prevOrders => {
                    const updatedOrders = [...prevOrders];
                    updatedOrders[actualOrder] = {...updatedOrders[actualOrder], ultimaCarga: ultimaCarga};
                    updatedOrders[actualOrder].cargas = [...(updatedOrders[actualOrder].cargas || []), ultimaCarga];
                    return updatedOrders;
                });
                load += 500
                if(load > orders[actualOrder].preset) {
                    clearInterval(interval)
                    setOrders(prevOrders => {
                        const updatedOrders = [...prevOrders];
                        updatedOrders[actualOrder] = {...updatedOrders[actualOrder], estado: 3, tiempoFin: new Date()};
                        return updatedOrders;
                    });
                    toast.success("Carga completada")
                    setColor("text-red-800 hover:text-red-900")
                }
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    }

    const getConcil = () => {
        console.log('getConcil');
    }
    
    return (
        <OrderContext.Provider value={[orders,getOrders,loading,actualOrder,handleActualOrder,deleteOrder,editOrder,addOrder,addTara,turnBomb,getConcil]}>
            {props.children}
        </OrderContext.Provider>
    )      
}

export {OrderContext, OrderProvider}