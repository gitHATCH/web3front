import React, { useContext, useEffect } from 'react'
import DefaultTable from '../components/DefaultTable'
import { DriverContext } from '../hooks/DriverContext'
import Spinner from '../components/Spinner'
import { ModalContext } from '../hooks/ModalContext'
import ModalDelete from '../components/Modals/ModalDelete'
import ModalEditDriver from '../components/Modals/ModalEditDriver'

const Drivers = () => {
    const [drivers,getDrivers,loading,actualDriver,handleActualDriver,deleteDriver,editDriver] = useContext(DriverContext)
    const [modalDelete, modalEdit] = useContext(ModalContext);

    const headers = ["DNI", "Nombre", "Apellido", "Código"]

    useEffect(() => {
        getDrivers()
    }, [])
    
  return (
    <>
        <div>
            <h1 className='text-left text-7xl font-mono font-semibold mt-10 ml-10'>Conductores</h1>
            <div>
                {loading ?(
                    <div className='flex justify-center mt-60'>
                        <Spinner/>
                    </div>
                ) : (
                   
                        <div className='mt-20'>
                            <DefaultTable headers={headers} data={drivers} tipo="driver" setActual={handleActualDriver}/>
                        </div>
                   
                )}
            </div>
            { modalDelete && <ModalDelete deleteActual={() => deleteDriver()}/> }
            { modalEdit && <ModalEditDriver editActual={editDriver}/> }
        </div>
    </>
  )
}

export default Drivers