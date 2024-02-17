import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const TruckContext = React.createContext([{}, ()=>{}])

const TruckProvider = (props) => {
    const [trucks, setTrucks] = useState([])
    const [actualTruck, setActualTruck] = useState(null)
    const [loading, setLoading] = useState(true)
    
    const getTrucks = async () => {
        setLoading(true)  
        try {
            const data = [
                {
                    patente: "4515asdsa24",
                    descripcion: "Camion Rojo",
                    cisternas: [3000,2000],
                },
                {
                    patente: "4515asdsa24",
                    descripcion: "Camion Rojo",
                    cisternas: [3000],
                },
                {
                    patente: "4515asdsa24",
                    descripcion: "Camion Rojo",
                    cisternas: [3000],
                },
            ]
            setTrucks(data)
            setLoading(false)
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
            const updatedTrucks = [...trucks];
            updatedTrucks.push(truck)
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