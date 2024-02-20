import React, { useContext, useState } from 'react'

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from 'react-toastify';
import { ModalContext } from '../../hooks/ModalContext';
import { OrderContext } from '../../hooks/OrderContext'
import { AuthContext } from '../../hooks/AuthContext';
import { FormControl, FormLabel, Input } from '@mui/material';
import TextField from '@mui/material/TextField';


const ModalConciliacion = ({numeroDeOrden}) => {
  const [modalDelete, modalEdit, handleModalDelete, handleModalEdit, handleModalLogOut, modalLogOut, modalAdd, handleModalAdd, modalPassword, handleModalPassword, modalConfigOrder, handleModalConfigOrder, modalConcil, handleModalConcil] = useContext(ModalContext);
  const [orders,getOrders,loading,actualOrder,handleActualOrder,deleteOrder,editOrder,addOrder,addTara,turnBomb,disableAlarm,changeUmbral,updateOrder,stopOrder,sendFinalWhight,actualConcil,getConcil] = useContext(OrderContext)

  const cancelOption = () => {
    handleModalConcil()
  }

  const confirmOption = () => {
      handleModalConcil()
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
        open={modalConcil}
        onClose={handleModalConcil}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
        backdrop: {
            timeout: 500,
        },
        }}
    >
        <Fade in={modalConcil}>
            <Box sx={style} className="rounded-xl">
                <div className='flex'>
                <div className='flex-1 flex-col'>
                    <Typography id="transition-modal-title" className='text-slate-300 font-mono font-semibold' variant="h6" component="h2">
                        Conciliacion de Orden: {numeroDeOrden ? numeroDeOrden : actualOrder?.numeroOrden}
                    </Typography>
                    <div className='flex flex-col gap-2 text-xl text-white font-extralight mt-8'>
                      <p>Pesaje Inicial: <span className='font-bold ml-5'>{actualConcil?.pesaje_inicial}</span> Kg</p>
                      <p>Pesaje Final: <span className='font-bold ml-5'>{actualConcil?.pesaje_final}</span> Kg</p>
                      <p>Producto Cargado: <span className='font-bold ml-5'>{actualConcil?.producto_cargado}</span> Kg</p>
                      <p>Neto Por Balanza: <span className='font-bold ml-5'>{actualConcil?.neto_por_balanza}</span> Kg</p>
                      <p>Diferencia Balanza Caudalimetro: <span className='font-bold ml-5'>{actualConcil?.diferencia_balanza_caudalimetro}</span> Kg</p>
                      <p>Promedio Temperatura: <span className='font-bold ml-5'>{actualConcil?.promedio_temperatura}</span> C°</p>
                      <p>Promedio Densidad: <span className='font-bold ml-5'>{actualConcil?.promedio_densidad}</span> Kg/m³</p>
                      <p>Promedio Caudal: <span className='font-bold ml-5'>{actualConcil?.promedio_caudal}</span> Kg/h</p>

                    </div>
            
                   
                    <div className='flex justify-center mt-10'>
                       
                        <button type="button" className="bg-green-700 hover:bg-green-600 rounded-md w-1/2 h-10 text-white font-mono text-lg cursor-pointer" onClick={confirmOption}>
                            Aceptar
                        </button>
                        
                    </div>
                </div>
                <div className=''>
                    <CancelIcon className='text-red-600 hover:cursor-pointer hover:text-red-300' onClick={handleModalConcil}/>
                </div>
                </div>
            </Box>
        </Fade>
    </Modal>
)

}

export default ModalConciliacion