import React, { useContext, useEffect } from 'react'
import DefaultTable from '../components/DefaultTable'
import { OrderContext } from '../hooks/OrderContext'
import Spinner from '../components/Spinner'
import { ModalContext } from '../hooks/ModalContext'
import ModalDelete from '../components/Modals/ModalDelete'
import ModalEditOrder from '../components/Modals/ModalEditOrder'

    const Orders = () => {
    const [orders,getOrders,loading,actualOrder,handleActualOrder,deleteOrder,editOrder] = useContext(OrderContext)
    const [modalDelete, modalEdit] = useContext(ModalContext);

    const headers = ["Numero", "Estado", "Preset", "Camion", "Cliente", "Chofer", "Producto"]

    useEffect(() => {
        getOrders()
    }, [])
    
  return (
    <>
        <div>
            <h1 className='text-left text-7xl font-mono font-semibold mt-10 ml-10'>Ordenes</h1>
            <div>
                {loading ?(
                    <div className='flex justify-center mt-60'>
                        <Spinner/>
                    </div>
                ) : (
                    orders?.length > 0 ? (
                        <div className='mt-20'>
                            <DefaultTable headers={headers} data={orders} tipo="order" setActual={handleActualOrder}/>
                        </div>
                    ) : (
                        <>
                            <h1 className='text-center font-mono text-4xl mt-10 mb-5'>No hay ordenes todavía...</h1>
                        </>
                    )
                )}
            </div>
            { modalDelete && <ModalDelete deleteActual={() => deleteOrder()}/> }
            { modalEdit && <ModalEditOrder editActual={editOrder}/> }
        </div>
    </>
  )
}

export default Orders