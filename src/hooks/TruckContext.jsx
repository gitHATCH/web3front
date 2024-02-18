import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axiosClient from '../config/axiosClient';
import { v4 as uuidv4 } from 'uuid';

const TruckContext = React.createContext([{}, ()=>{}])

const TruckProvider = (props) => {
    const [trucks, setTrucks] = useState([])
    const [actualTruck, setActualTruck] = useState(null)
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token');
    
    const getTrucks = async () => {
        setLoading(true)
        try {
            const response = await axiosClient.get('/camion/find-all', { headers: { Authorization: `Bearer ${token}` } });
            const data = response.data
            /*
            .map((truck) => { 
                return {
                    patente: truck.patente,
                    descripcion: truck.descripcion,
                    totalCisterna: truck.totalCisterna,
                    code: truck.code,
                }
            });   
            */  
            setTrucks(data)
        } catch (error) {
            console.log(error);
        } 
        setLoading(false)  
    }
    
    const handleActualTruck = (truck) => {
        setActualTruck(truck)
    }

    const deleteTruck = async() => {
        try {
            const updatedTrucks = trucks.filter((_, index) => index !== actualTruck);
            setTrucks(updatedTrucks);
            setActualTruck(null);
            toast.success("Camion eliminado correctamente")
        } catch (error) {
            console.log(error);
        }
    }

    const editTruck = async(truck) => {
        try {
            const updatedTrucks = [...trucks];
            updatedTrucks[actualTruck] = truck;
            setTrucks(updatedTrucks);
            setActualTruck(null);
            toast.success("Camion editado correctamente")
        } catch (error) {
            console.log(error);
        }
    }

    const addTruck = async(truck) => {
        try {
            console.log(truck);

            truck = {
                ...truck, 
                code: uuidv4(), 
                totalCisterna: truck.datosCisterna.reduce((acc, cisterna) => acc + cisterna.tamanio, 0)
            }
            await axiosClient.post('/camion', truck, { headers: { Authorization: `Bearer ${token}` } })
            const truckUpd = {
                patente: truck.patente,
                descripcion: truck.descripcion,
                totalCisterna: truck.totalCisterna,
                code: truck.code,
            }
            const updatedTrucks = [...trucks];
            updatedTrucks.push(truckUpd)
            setTrucks(updatedTrucks);
            toast.success("Camion agregado correctamente")
        } catch (error) {
            console.log(error);
        }   
    }
    
    return (
        <TruckContext.Provider value={[trucks,getTrucks,loading,actualTruck,handleActualTruck,deleteTruck,editTruck,addTruck]}>
            {props.children}
        </TruckContext.Provider>
    )      
}

export {TruckContext, TruckProvider}