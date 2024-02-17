import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const ClientContext = React.createContext([{}, ()=>{}])

const ClientProvider = (props) => {
    const [clients, setClients] = useState([])
    const [actualClient, setActualClient] = useState(null)
    const [loading, setLoading] = useState(true)
    
    const getClients = async () => {
        setLoading(true)
        try {
            const data = [
                {
                    razonSocial: "Richard GranT",
                    contacto: "8484885",
                },
                {
                    razonSocial: "Richard GranB",
                    contacto: "8484885",
                },
                {
                    razonSocial: "Richard Gran",
                    contacto: "8484885",
                },
            ]
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
            const updatedClients = [...clients];
            updatedClients.push(client)
            setClients(updatedClients);
            toast.success("Cliente agregado correctamente")
        } catch (error) {
            console.log(error);
        }   
    }
    
    return (
        <ClientContext.Provider value={[clients,getClients,loading,actualClient,handleActualClient,deleteClient,editClient,addClient]}>
            {props.children}
        </ClientContext.Provider>
    )      
}

export {ClientContext, ClientProvider}