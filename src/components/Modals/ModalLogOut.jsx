import React, { useContext } from 'react'


import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from 'react-toastify';
import { ModalContext } from '../../hooks/ModalContext';
import { AuthContext } from '../../hooks/AuthContext';

const ModalLogOut = () => {
    const [modalDelete, modalEdit, handleModalDelete, handleModalEdit, handleModalLogOut, modalLogOut] = useContext(ModalContext);
    const {unAuthorize} = useContext(AuthContext);
    const cancelOption = () => {
        handleModalLogOut()
    }
    const confirmOption = () => {
        handleModalLogOut()
        toast.info("Log Out")
        unAuthorize()
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
            open={modalLogOut}
            onClose={handleModalDelete}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
            backdrop: {
                timeout: 500,
            },
            }}
        >
            <Fade in={modalLogOut}>
                <Box sx={style} className="rounded-xl">
                    <div className='flex'>
                    <div className='flex-1 flex-col'>
                        <Typography id="transition-modal-title" className='text-slate-300 font-mono font-semibold' variant="h6" component="h2">
                            ¿Deseas Cerrar Sesión?
                        </Typography>
                        <div className='flex justify-between mt-10'>
                            <button type="button" className="bg-slate-700 hover:bg-slate-600 rounded-md w-1/4 h-10 text-white font-mono text-lg cursor-pointer" onClick={confirmOption}>
                                Si
                            </button>
                            <button type="button" className="bg-slate-700 hover:bg-slate-600 rounded-md w-1/4 h-10 text-white font-mono text-lg cursor-pointer" onClick={cancelOption}>
                                No
                            </button>
                        </div>
                    </div>
                    <div className=''>
                        <CancelIcon className='text-red-600 hover:cursor-pointer hover:text-red-300' onClick={handleModalLogOut}/>
                    </div>
                    </div>
                </Box>
            </Fade>
        </Modal>
  )
}

export default ModalLogOut