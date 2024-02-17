import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const OrderContext = React.createContext([{}, ()=>{}])

const OrderProvider = (props) => {
    const [orders, setOrders] = useState([])
    const [actualOrder, setActualOrder] = useState(null)
    const [loading, setLoading] = useState(true)
    
    const getOrders = async () => {
        setLoading(true)  
        try {
            const data = [
                {
                    numero: "1",
                    estado: 0,
                    preset: 3000,
                    camion: "4515asdsa24",
                    cliente: "4515asdsa24",
                    chofer: "4515asdsa24",
                    producto: "asgasgas",
        
                },
                {
                    numero: "2",
                    estado: 1,
                    preset: 3000,
                    camion: "4515asdsa24",
                    cliente: "4515asdsa24",
                    chofer: "4515asdsa24",
                    producto: "asgasgas",
        
                },
                {
                    numero: "3",
                    estado: 2,
                    preset: 3000,
                    camion: "4515asdsa24",
                    cliente: "4515asdsa24",
                    chofer: "4515asdsa24",
                    producto: "asgasgas",
        
                },
            ]
            setOrders(data)
            setLoading(false)
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
            const updatedOrders = [...orders];
            updatedOrders.push(order)
            setOrders(updatedOrders);
            toast.success("Orden agregada correctamente")
        } catch (error) {
            console.log(error);
        }   
    }
    
    return (
        <OrderContext.Provider value={[orders,getOrders,loading,actualOrder,handleActualOrder,deleteOrder,editOrder,addOrder]}>
            {props.children}
        </OrderContext.Provider>
    )      
}

export {OrderContext, OrderProvider}