import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axiosClient from '../config/axiosClient';
import { v4 as uuidv4 } from 'uuid';

const ClientContext = React.createContext([{}, ()=>{}])

const ClientProvider = (props) => {
    const [clients, setClients] = useState([])
    const [actualClient, setActualClient] = useState(null)
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token');

    const getClients = async () => {
        setLoading(true)
        try {
            const { data } = await axiosClient.get('/cliente/find-all', { headers: { Authorization: `Bearer ${token}` } });
            setClients(data)

        } catch (error) {
            console.log(error);
        } 
        setLoading(false)   
    }
    
    const handleActualClient = (client) => { 
        setActualClient(client)
    }

    const deleteClient = async() => {
        try {
            const updatedClients = clients.filter((_, index) => index !== actualClient);
            setClients(updatedClients);
            setActualClient(null);
            toast.success("Cliente eliminado correctamente")
        } catch (error) {
            console.log(error);
        }
    }

    //TODO: Ver si dejamos o no
    const editClient = async(client) => {
        try {
            const updatedClients = [...clients];
            updatedClients[actualClient] = client;
            setClients(updatedClients);
            setActualClient(null);
            toast.success("Cliente editado correctamente")
        } catch (error) {
            console.log(error);
        }
    }

    const addClient = async(client) => {
        try {       
            client = {...client, code: uuidv4()}
            await axiosClient.post('/cliente', client, { headers: { Authorization: `Bearer ${token}` } })
            const updatedClients = [...clients];
            updatedClients.push(client)
            setClients(updatedClients);
            toast.success("Cliente agregado correctamente")
        } catch (error) {
            toast.error(error.response.data);
        }   
    }
    
    return (
        <ClientContext.Provider value={[clients,getClients,loading,actualClient,handleActualClient,deleteClient,editClient,addClient]}>
            {props.children}
        </ClientContext.Provider>
    )      
}

export {ClientContext, ClientProvider}