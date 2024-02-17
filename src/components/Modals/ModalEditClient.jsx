import React, { useContext } from 'react'

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from 'react-toastify';
import { ModalContext } from '../../hooks/ModalContext';
import { useEffect } from 'react';
import { useState } from 'react';
import { ClientContext } from '../../hooks/ClientContext';

const ModalEditClient = ({editActual}) => {
    const [modalDelete, modalEdit, handleModalDelete, handleModalEdit, handleModalLogOut, modalLogOut, modalAdd, handleModalAdd] = useContext(ModalContext);
    const [clients,getClients,loading,actualClient,handleActualClient,deleteClient,editClient, addClient] = useContext(ClientContext);
    const [client, setClient] = useState({}) 
    useEffect(() => {
        if(!modalAdd){
            setClient(clients[actualClient])
        }
    }, [])
    
    const handleRazonChange = (event) => {
        setClient((prevClient) => ({
          ...prevClient,
          razonSocial: event.target.value,
        }));
    };
    const handleContactoChange = (event) => {
        setClient((prevClient) => ({
          ...prevClient,
          contacto: event.target.value,
        }));
    };

    const cancelOption = () => {
        handleModalEdit()
    }
    const confirmOption = () => {
        if(!modalAdd){
            editActual(client)
        }else{
            if(!client.razonSocial || !client.contacto){
                toast.error("Todos los campos son obligatorios")
                return
            }
            addClient(client)
        }
        handleModalEdit()
    }

    //Diseño Modal
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        bgcolor: '#262626',
        boxShadow: 24,
        p: 4
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
                    <div className='flex'>
                    <div className='flex-1 flex-col mt-5'>
                        <div className='flex'>
                            <form className='w-full flex-row justify-center'>
                                <div className='mt-10 flex items-center'>
                                    <label htmlFor='rs' className='mr-5 font-mono text-white text-xl font-semibold flex-9'>Razón Social</label>
                                    <input id="rs" type='text' placeholder='Razón Social' defaultValue={client?.razonSocial} className='flex-1 rounded-md h-8 p-2 bg-slate-600 h-11' onChange={handleRazonChange}/>
                                </div>
                                <div className='mt-10 flex items-center'>
                                    <label htmlFor='c' className='mr-5 font-mono text-white text-xl font-semibold flex-9'>Contacto</label>
                                    <input id="c" type='text' placeholder='Número de Contacto' defaultValue={client?.contacto} className='flex-1 rounded-md h-8 p-2 bg-slate-600 h-11' onChange={handleContactoChange}/>
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

export default ModalEditClient