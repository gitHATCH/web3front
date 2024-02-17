import React, { useContext } from 'react'


import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from 'react-toastify';
import { ModalContext } from '../../hooks/ModalContext';
import { useEffect } from 'react';
import { useState } from 'react';
import { TruckContext } from '../../hooks/TruckContext';

//* Arreglar lo de las datosCisterna para que muestre uno por cada una y que permita agregar otra *//
const ModalEditTruck = ({editActual}) => {
    const [modalDelete, modalEdit, handleModalDelete, handleModalEdit, handleModalLogOut, modalLogOut, modalAdd, handleModalAdd] = useContext(ModalContext);
    const [trucks,getTrucks,loading,actualTruck,handleActualTruck,deleteTruck,editTruck,addTruck] = useContext(TruckContext);
    const [truck, setTruck] = useState({}) 
    useEffect(() => {
        if(!modalAdd){
            setTruck(trucks[actualTruck])
        }else{
            setTruck({
                patente: null,
                descripcion: null,
                datosCisterna:[]
            })
        }
    }, [])


    const handlePatenteChange = (event) => {
        setTruck((prevTruck) => ({
          ...prevTruck,
          patente: event.target.value,
        }));
    };
    const handleDescrChange = (event) => {
        setTruck((prevTruck) => ({
          ...prevTruck,
          descripcion: event.target.value,
        }));
    };
    const handleCisternChange = (event) => {
        console.log("Modificar cisterna");
    };

    const cancelOption = () => {
        handleModalEdit()
    }
    const confirmOption = () => {
        if(!modalAdd){
            editActual(truck)
        }else{
            console.log(truck);
            if(!truck.patente || !truck.descripcion || !truck.datosCisterna.length > 0){
                toast.error("Todos los campos son obligatorios")
                return
            }
            let flag = true
            //TODO: Cambiar
            truck.datosCisterna.forEach(cisterna => {
                if(cisterna.tamanio <= 0){   
                    flag = false
                }
            });
            if(!flag){
                toast.error("Una cisterna no puede tener como capacidad 0 o menos")
                return
            }
            addTruck(truck)
        }
        handleModalEdit()
    }

    const handledatosCisternaChange = (index, value) => {
        const updatedTruck = { ...truck };
        updatedTruck.datosCisterna[index].tamanio = value;
        setTruck(updatedTruck);
    };

    const addCisternaField = () => {
        if(truck.datosCisterna.length > 8){
            toast.error("El Maximo de datosCisterna admitido por camion es de 8")
            return
        }
        const updatedTruck = { ...truck };
        updatedTruck.datosCisterna.push({tamanio: 0}); 
        setTruck(updatedTruck);
    };

    const removeCisternaField = (index) => {
        const updatedTruck = { ...truck };
        updatedTruck.datosCisterna.splice(index, 1);
        setTruck(updatedTruck);
    };

    //Diseño Modal
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        bgcolor: '#262626',
        boxShadow: 24,
        p: 4,
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
                    <div className='flex '>
                    <div className='flex-1 flex-col mt-5'>

                        <div className='flex'>

                            <form className='w-full flex-row justify-center'>
                                <div className='mt-10 flex items-center'>
                                    <label htmlFor='p' className='mr-5 font-mono text-white text-xl font-semibold flex-9'>Patente</label>
                                    <input id="p" type='text' placeholder='Patente' defaultValue={truck.patente} className='flex-1 rounded-md h-8 p-2 bg-slate-600 h-11' onChange={handlePatenteChange}/>
                                </div>
                                <div className='mt-10 flex items-center'>
                                    <label htmlFor='dc' className='mr-5 font-mono text-white text-xl font-semibold flex-9'>Descripcion</label>
                                    <input id="dc" type='text' placeholder='Descripcion del Camion' defaultValue={truck.descripcion} className='flex-1 rounded-md h-8 p-2 bg-slate-600 h-11' onChange={handleDescrChange}/>
                                </div>

                                <div className='mt-20'>
                                    {truck?.datosCisterna?.map((capacity, index) => (
                                        <div key={index} className='mt-10 flex items-center '>
                                            <label className='mr-5 font-mono text-white text-xl font-semibold flex-9'>
                                                Cisterna {index + 1}
                                            </label>
                                            <input
                                                type='number'
                                                placeholder='Capacidad de la cisterna'
                                                value={capacity.tamanio}
                                                className='flex-1 rounded-md h-8 p-2 bg-slate-600 h-11'
                                                onChange={(e) => handledatosCisternaChange(index, parseInt(e.target.value))}
                                            />
                                            
                                            <div className=''>
                                                <CancelIcon className='ml-2 text-red-600 hover:cursor-pointer hover:text-red-300' onClick={() => removeCisternaField(index)}/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                     
                                <div className='flex mt-5 justify-center'>
                                    <AddCircleIcon className={`text-green-600 hover:text-green-500 rounded-md cursor-pointer`} style={{ fontSize: '3rem'}} onClick={addCisternaField}/> 
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

export default ModalEditTruck