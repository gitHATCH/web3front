import React, { useContext, useEffect } from 'react'
import DefaultTable from '../components/DefaultTable'
import { ClientContext } from '../hooks/ClientContext'
import Spinner from '../components/Spinner'
import { ModalContext } from '../hooks/ModalContext'
import { AuthContext } from '../hooks/AuthContext'
import ModalDelete from '../components/Modals/ModalDelete'
import ModalEditClient from '../components/Modals/ModalEditClient'

const Clients = () => {
    const [clients,getClients,loading,actualClient,handleActualClient,deleteClient,editClient] = useContext(ClientContext)

    const [modalDelete, modalEdit] = useContext(ModalContext);

    const headers = ["Razón Social", "Contacto", "Código"]
    
    useEffect(() => {
        getClients()
    }, [])

  
    
  return (
    <>
        <div>
            <h1 className='text-left text-7xl font-mono font-semibold mt-10 ml-10'>Clientes</h1>
            <div>
                {loading ?(
                    <div className='flex justify-center mt-60'>
                        <Spinner/>
                    </div>
                ) : (
                    
                        <div className='mt-20'>
                            <DefaultTable headers={headers} data={clients.map((client) => {
                                return {
                                    razonSocial: client.razonSocial,
                                    contacto: client.contacto,
                                    code: client.code,
                                }
                            })} tipo="client" setActual={handleActualClient}/>
                        </div>
                  
                )}
            </div>
            { modalDelete && <ModalDelete deleteActual={() => deleteClient()}/> }
            { modalEdit && <ModalEditClient editActual={editClient}/> }
        </div>
    </> 
  )
}

export default Clients