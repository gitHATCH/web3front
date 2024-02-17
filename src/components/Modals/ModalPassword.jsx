import React, { useContext, useState } from 'react'

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from 'react-toastify';
import { ModalContext } from '../../hooks/ModalContext';
import { AuthContext } from '../../hooks/AuthContext';
import { FormControl, FormLabel, Input } from '@mui/material';
import TextField from '@mui/material/TextField';


const ModalPassword = ({pass, setPass, turnBomb}) => {
    const [modalDelete, modalEdit, handleModalDelete, handleModalEdit, handleModalLogOut, modalLogOut, modalAdd, handleModalAdd, modalPassword, handleModalPassword] = useContext(ModalContext);
   

    const cancelOption = () => {
        setPass("")
        handleModalPassword()
    }
    const confirmOption = () => {
        turnBomb()
        handleModalPassword()
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
            open={modalPassword}
            onClose={handleModalPassword}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
            backdrop: {
                timeout: 500,
            },
            }}
        >
            <Fade in={modalPassword}>
                <Box sx={style} className="rounded-xl">
                    <div className='flex'>
                    <div className='flex-1 flex-col'>
                        <Typography id="transition-modal-title" className='text-slate-300 font-mono font-semibold' variant="h6" component="h2">
                            Ingrese Password
                        </Typography>
                        <div className='w-[300px] mt-5'>
                            <input className='w-full rounded h-8 p-2' />
                        </div>
                       
                        <div className='flex justify-between mt-10'>
                            <button type="button" className="bg-red-700 hover:bg-red-600 rounded-md w-1/4 h-10 text-white font-mono text-lg cursor-pointer" onClick={cancelOption}>
                                Cancelar
                            </button>
                            <button type="button" className="bg-green-700 hover:bg-green-600 rounded-md w-1/4 h-10 text-white font-mono text-lg cursor-pointer" onClick={confirmOption}>
                                Confirmar
                            </button>
                            
                        </div>
                    </div>
                    <div className=''>
                        <CancelIcon className='text-red-600 hover:cursor-pointer hover:text-red-300' onClick={handleModalPassword}/>
                    </div>
                    </div>
                </Box>
            </Fade>
        </Modal>
  )
}

export default ModalPassword