import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const DriverContext = React.createContext([{}, ()=>{}])

const DriverProvider = (props) => {
    const [drivers, setDrivers] = useState([])
    const [actualDriver, setActualDriver] = useState(null)
    const [loading, setLoading] = useState(true)
    
    const getDrivers = async () => {
        setLoading(true)  
        try {
            const data = [
                {
                    nombre: "Juan",
                    apellido: "Martinez",
                    dni: "432454654",
                },
                {
                    nombre: "Juan",
                    apellido: "Martinez",
                    dni: "432454654",
                },
                {
                    nombre: "Juan",
                    apellido: "Martinez",
                    dni: "432454654",
                },
            ]
            setDrivers(data)
            setLoading(false)
        } catch (error) {
            console.log(error);
        } 
        setLoading(false)  
    }
    
    const handleActualDriver = (driver) => {
        setActualDriver(driver)
    }

    const deleteDriver = async() => {
        try {
            const updatedDrivers = drivers.filter((_, index) => index !== actualDriver);
            setDrivers(updatedDrivers);
            setActualDriver(null);
            toast.success("Conductor eliminado correctamente")
        } catch (error) {
            console.log(error);
        }
    }

    const editDriver = async(driver) => {
        try {
            const updatedDrivers = [...drivers];
            updatedDrivers[actualDriver] = driver;
            setDrivers(updatedDrivers);
            setActualDriver(null);
            toast.success("Conductor editado correctamente")
        } catch (error) {
            console.log(error);
        }
    }

    const addDriver = async(driver) => {
        try {
            const updatedDrivers = [...drivers];
            updatedDrivers.push(driver)
            setDrivers(updatedDrivers);
            toast.success("Conductor agregado correctamente")
        } catch (error) {
            console.log(error);
        }   
    }
    
    return (
        <DriverContext.Provider value={[drivers,getDrivers,loading,actualDriver,handleActualDriver,deleteDriver,editDriver,addDriver]}>
            {props.children}
        </DriverContext.Provider>
    )      
}

export {DriverContext, DriverProvider}