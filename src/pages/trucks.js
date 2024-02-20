import React, { useContext, useEffect } from 'react'
import DefaultTable from '../components/DefaultTable'
import { TruckContext } from '../hooks/TruckContext'
import Spinner from '../components/Spinner'
import { ModalContext } from '../hooks/ModalContext'
import ModalDelete from '../components/Modals/ModalDelete'
import ModalEditTruck from '../components/Modals/ModalEditTruck'

const Trucks = () => {
    const [trucks,getTrucks,loading,actualTruck,handleActualTruck,deleteTruck,editTruck] = useContext(TruckContext)
    const [modalDelete, modalEdit] = useContext(ModalContext);

    const headers = ["Patente", "Descripcion", "Cisternas", "Código"]

    useEffect(() => {
        getTrucks()
    }, [])
    
  return (
    <>
        <div>
            <h1 className='text-left text-7xl font-mono font-semibold mt-10 ml-10'>Camiones</h1>
            <div>
                {loading ?(
                    <div className='flex justify-center mt-60'>
                        <Spinner/>
                    </div>
                ) : (
                    
                        <div className='mt-20'>
                            <DefaultTable headers={headers} data={
                                    trucks.map((truck) => { 
                                        return {
                                            patente: truck.patente,
                                            descripcion: truck.descripcion,
                                            totalCisterna: truck.totalCisterna,
                                            code: truck.code,
                                        }
                                    })
                                } 
                            tipo="truck" setActual={handleActualTruck}/>
                        </div>
                    
                )}
            </div>
            { modalDelete && <ModalDelete deleteActual={() => deleteTruck()}/> }
            { modalEdit && <ModalEditTruck editActual={editTruck}/> }
        </div>
    </>
  )
}

export default Trucks