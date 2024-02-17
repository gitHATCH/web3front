import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const ModalContext = React.createContext([{}, ()=>{}])

const ModalProvider = (props) => {
    const [modalDelete, setModalDelete] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [modalAdd, setModalAdd] = useState(false)
    const [modalLogOut, setModalLogOut] = useState(false)
    const [modalPassword, setModalPassword] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setModalDelete(false)
        setModalEdit(false)
        setModalLogOut(false)
        setModalPassword(false)
      }, [router.pathname])

    const handleModalDelete = () => {
        setModalDelete(!modalDelete)
    }
    
    const handleModalEdit = (agregar) => {
        if(agregar){
            setModalAdd(true)
        }else{
            setModalAdd(false)
        }
        setModalEdit(!modalEdit)

    }

    const handleModalAdd = () => {
        setModalAdd(!modalAdd)
    }

    const handleModalLogOut = () => {
        setModalLogOut(!modalLogOut)
    }

    const handleModalPassword = () => {
        setModalPassword(!modalPassword)
    }
    
    return (
        <ModalContext.Provider value={[modalDelete, modalEdit, handleModalDelete, handleModalEdit, handleModalLogOut, modalLogOut, modalAdd, handleModalAdd, modalPassword, handleModalPassword]}>
            {props.children}
        </ModalContext.Provider>
    )      
}

export {ModalContext, ModalProvider}