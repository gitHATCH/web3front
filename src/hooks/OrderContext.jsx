import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axiosClient from '../config/axiosClient';
import { v4 as uuidv4 } from 'uuid';

const OrderContext = React.createContext([{}, ()=>{}])

const OrderProvider = (props) => {
    const [orders, setOrders] = useState([])
    const [actualOrder, setActualOrder] = useState(null)
    const [actualConcil, setActualConcil] = useState({})
    const [loading, setLoading] = useState(true)
    const [pass, setPass] = useState(null)
    const token = localStorage.getItem('token');
    
    const getOrders = async () => {
        setLoading(true)
        try {
            const response = (await axiosClient.get('/orden/find-all', { headers: { Authorization: `Bearer ${token}` } }));
            const data = response.data
            /*
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
            */
            setOrders(data)

        } catch (error) {
            console.log(error);
        } 
        setLoading(false) 
    }

    
    
    const handleActualOrder = (order) => {
        updateOrder(orders[order].numeroOrden)
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
            const codeExt = uuidv4()
            const sendOrder = {...order, camion: order.camion.code, cliente: order.cliente.code, chofer: order.chofer.code, producto: order.producto.code, codigoExterno: codeExt}
            await axiosClient.post('/orden/b2b', sendOrder, { headers: { Authorization: `Bearer ${token}` } })
            order = {...order, estado:1, codigoExterno:codeExt}
            const updatedOrders = [...orders];
            updatedOrders.push(order)
            setOrders(updatedOrders);
            toast.success("Orden agregada correctamente")
        } catch (error) {
            console.log(error);
            if (error.code === 409){
                const codeExt = uuidv4()
                addOrder({...sendOrder, codigoExterno:codeExt})
            }
        }   
    }

    const changeUmbral = async (umbral) => {
        try {
            const numeroOrden = Number(actualOrder.numeroOrden)
            const response = await axiosClient.post(`/orden/temperatura-umbral/${umbral}`, null, { headers: { NumeroOrden: numeroOrden, Authorization: `Bearer ${token}` } })
            setActualOrder({...actualOrder, temperaturaUmbral:umbral});
            toast.success('Umbral cambiado correctamente!')
        } catch (error) {
            console.log(error);
        }
    }

    const addTara = async() => {
        try {
            const numeroOrden = Number(actualOrder.numeroOrden)
            const randomNumber = Math.random() * (25000 - 10000) + 10000;
            const tara = Math.floor(randomNumber);
            const response = await axiosClient.put('/orden/checkin', {pesaje_inicial:tara}, { headers: { NumeroOrden: numeroOrden, Authorization: `Bearer ${token}` } })
            
            setActualOrder({...actualOrder, tara: tara, estado:2});
            return response.data.password
            
        } catch (error) {
            console.log(error);
        }
    }

  
    const turnBomb = async (setColor, pass) => {
        const colorOn = "text-green-800 hover:text-green-900"
        const numeroOrden = Number(actualOrder.numeroOrden)
        let ultimaMasa = actualOrder.ultimaMasa;
        let primero = true
        
        const loadOrder = async () => {
            try {
                const detalle = {
                    masa: (ultimaMasa ?? 0) + Math.floor(Math.random() * (500 - 300) + 300),
                    densidad: (Math.random() * (0.9 - 0.3) + 0.3).toFixed(2),
                    temperatura: Math.floor(Math.random() * (100 - 0) + 0),
                    caudal: Math.floor(Math.random() * (70 - 10) + 10),
                }
    
                if(detalle.masa > actualOrder.preset) {
                    detalle.masa = actualOrder.preset
                }
    
                await axiosClient.post(`/orden/detalle`, detalle, { headers: { Password: pass, NumeroOrden: numeroOrden, Authorization: `Bearer ${token}` } })
    
                if(detalle.masa >= actualOrder.preset) {
                    clearInterval(interval)
                    return
                }
    
                if(primero) {
                    primero = false
                    setColor(colorOn)
                    toast.success("Carga iniciada")
                } 
    
                ultimaMasa = detalle.masa
    
            } catch (error) {
                if(error.response.data !== "Error, orden no disponible para la carga."){
                    toast.error(error.response.data)
                }
                clearInterval(interval)
                return
            }
        }

        loadOrder();
        const interval = setInterval(() => {
            loadOrder();
        }, 10000);
           
    }

    const stopOrder = async () => {
        try {
            const numeroOrden = Number(actualOrder.numeroOrden)
            const response = await axiosClient.post('/orden/cierre/orden', null, { headers: { NumeroOrden: numeroOrden, Authorization: `Bearer ${token}` } })
            updateOrder()
            toast.success("Carga detenida")
        } catch (error) {
            console.log(error);
        }
    }

    const sendFinalWhight = async () => {
        try {
            const numeroOrden = Number(actualOrder.numeroOrden)
            const response = await axiosClient.put('/orden/checkout', {pesaje_final:actualOrder.tara+actualOrder.ultimaMasa}, { headers: { NumeroOrden: numeroOrden, Authorization: `Bearer ${token}` } })
            updateOrder()
            toast.success("Conciliaciones Habilitadas")
        } catch (error) {
            console.log(error);
        }
    }

    const updateOrder = async (numero) => {
        try {
          const numeroOrden = numero ? numero : Number(actualOrder.numeroOrden)
          const { data } = await axiosClient.get(`/orden/find/${numeroOrden}`, { headers: { Authorization: `Bearer ${token}` } });
          setActualOrder(data)
        } catch (error) {
            console.error(error)
        }
    }


    const disableAlarm = async () => {
        const numeroOrden = Number(actualOrder.numeroOrden)
        try {
            const response = await axiosClient.post('/alarma/aceptar-alarma', null, { headers: { NumeroOrden: numeroOrden, Authorization: `Bearer ${token}` } })
            toast.success("Alarma desactivada")
            setActualOrder({...actualOrder, alarma:false})
        } catch (error) {
            console.log(error);
        }
    }

    const getAConcil = async (numero) => {
       
        
        try {
     
            const { data } = await axiosClient.get(`/orden/conciliacion`, { headers: { NumeroOrden: numero, Authorization: `Bearer ${token}` } });
     
            setActualConcil({
                pesaje_inicial: data.pesaje_inicial,
                pesaje_final: data.pesaje_final,
                producto_cargado: data.producto_cargado,
                neto_por_balanza: data.neto_por_balanza,
                diferencia_balanza_caudalimetro: data.diferencia_balanza_caudalimetro,
                promedio_temperatura: data.promedio_temperatura,
                promedio_densidad: data.promedio_densidad,
                promedio_caudal: data.promedio_caudal,
            })

        } catch (error) {
            console.log(error);
        }
    }

    const getConcil = async () => {
        
        const numeroOrden = Number(actualOrder.numeroOrden)

        try {
     
            const { data } = await axiosClient.get(`/orden/conciliacion`, { headers: { NumeroOrden: numeroOrden, Authorization: `Bearer ${token}` } });
     
            setActualConcil({
                pesaje_inicial: data.pesaje_inicial,
                pesaje_final: data.pesaje_final,
                producto_cargado: data.producto_cargado,
                neto_por_balanza: data.neto_por_balanza,
                diferencia_balanza_caudalimetro: data.diferencia_balanza_caudalimetro,
                promedio_temperatura: data.promedio_temperatura,
                promedio_densidad: data.promedio_densidad,
                promedio_caudal: data.promedio_caudal,
            })
        } catch (error) {
            console.log(error);
        }
        
    }
    
    return (
        <OrderContext.Provider value={[orders,getOrders,loading,actualOrder,handleActualOrder,deleteOrder,editOrder,addOrder,addTara,turnBomb,disableAlarm,changeUmbral,updateOrder,stopOrder,sendFinalWhight,actualConcil,getConcil,getAConcil]}>
            {props.children}
        </OrderContext.Provider>
    )      
}

export {OrderContext, OrderProvider}