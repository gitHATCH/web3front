import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axiosClient from '../config/axiosClient';
import { v4 as uuidv4 } from 'uuid';

const DriverContext = React.createContext([{}, ()=>{}])

const DriverProvider = (props) => {
    const [drivers, setDrivers] = useState([])
    const [actualDriver, setActualDriver] = useState(null)
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token');

    
    
    const getDrivers = async () => {
        setLoading(true)
        try {
            const { data } = await axiosClient.get('/chofer/find-all', { headers: { Authorization: `Bearer ${token}` } });
            setDrivers(data)

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
            driver = {...driver, code: uuidv4()}
            await axiosClient.post('/chofer', driver, { headers: { Authorization: `Bearer ${token}` } })
            const updatedDrivers = [...drivers];
            updatedDrivers.push(driver)
            setDrivers(updatedDrivers);
            toast.success("Conductor agregado correctamente")
        } catch (error) {
            toast.error(error.response.data);
        }   
    }
    
    return (
        <DriverContext.Provider value={[drivers,getDrivers,loading,actualDriver,handleActualDriver,deleteDriver,editDriver,addDriver]}>
            {props.children}
        </DriverContext.Provider>
    )      
}

export {DriverContext, DriverProvider}