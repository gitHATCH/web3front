import React, { useContext, useState } from 'react'


import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import CancelIcon from '@mui/icons-material/Cancel';
import { ModalContext } from '../../hooks/ModalContext';
import { OrderContext } from '../../hooks/OrderContext'

const ModalConfigOrder = () => {
  const [modalDelete, modalEdit, handleModalDelete, handleModalEdit, handleModalLogOut, modalLogOut, modalAdd, handleModalAdd, modalConfigOrder, handleModalConfigOrder] = useContext(ModalContext);
  const [orders,getOrders,loading,actualOrder,handleActualOrder,deleteOrder,editOrder,addOrder,addTara,turnBomb,getConcil,disableAlarm,changeUmbral] = useContext(OrderContext)
  const [umbral, setUmbral] = useState(actualOrder.temperaturaUmbral ?? 0)

  const handleUmbral = (event) => {
      setUmbral(Number(event.target.value));
  };

  const cancelOption = () => {
      handleModalConfigOrder()
  }

  const confirmOption = () => {
      changeUmbral(umbral)
      handleModalConfigOrder()
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
          open={modalConfigOrder}
          onClose={handleModalConfigOrder}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
          backdrop: {
              timeout: 500,
          },
          }}
      >
          <Fade in={modalConfigOrder}>
              <Box sx={style} className="rounded-xl">
                  <div className='flex'>
                  <div className='flex-1 flex-col mt-5'>
                      <div className='flex'>
                          <form className='w-full flex-row justify-center'>
                              <div className='mt-10 flex items-center'>
                                  <label htmlFor='umbral' className='mr-5 font-mono text-white text-xl font-semibold flex-9'>Umbral de Temperatura</label>
                                  <input id="umbral" type='number' placeholder='Temperatura Umbral' defaultValue={umbral} className='flex-1 rounded-md h-8 p-2 bg-slate-600 h-11' onChange={handleUmbral}/>
                              </div>
                          </form>
                      </div>
                      <div className='flex justify-between mt-10'>
                          <button type="button" className="bg-slate-700 hover:bg-slate-600 rounded-md w-1/4 h-10 text-white font-mono text-lg cursor-pointer" onClick={cancelOption}>
                              Cancelar
                          </button>
                          <button type="button" className="bg-slate-700 hover:bg-slate-600 rounded-md w-1/4 h-10 text-white font-mono text-lg cursor-pointer" onClick={confirmOption}>
                              Guardar
                          </button>
                      </div>
                  </div>
                  <div className=''>
                      <CancelIcon className='text-red-600 hover:cursor-pointer hover:text-red-300' onClick={handleModalConfigOrder}/>
                  </div>
                  </div>
              </Box>
          </Fade>
      </Modal>
)
}

export default ModalConfigOrder