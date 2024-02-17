/* Slidebar con las opciones de las funcionalidades (Inicio, Lista de llamados, Registro o Verificacion de propuestas, Cuentas Pendientes) */
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import PersonIcon from '@mui/icons-material/Person';
import PropaneTankIcon from '@mui/icons-material/PropaneTank';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LogoutIcon from '@mui/icons-material/Logout';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';



import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import React, {useContext, useEffect, useState} from 'react'
import Link from 'next/link';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { SlidebarContext } from '../hooks/SlidebarContext';
import { ModalContext } from '../hooks/ModalContext';
import ModalLogOut from './Modals/ModalLogOut';
import { AuthContext } from '../hooks/AuthContext';
import { useRouter } from 'next/router';

//Comprobar autorizar

const SidebarLayout = () => {
    const [collaps, handleCollaps, showStatus, okShowStatus, hideShowStatus, actualPage, modal, handleOpenModal] = useContext(SlidebarContext)
    const [modalDelete, modalEdit, handleModalDelete, handleModalEdit, handleModalLogOut, modalLogOut] = useContext(ModalContext)
    const {auth} = useContext(AuthContext);
    const router = useRouter()

    useEffect(() => {
        if(!auth && router.pathname !== '/') {
            toast.error("No estas autorizado")
            router.push("/")
        }
    }, [router.pathname])
    
    
    const logout = () => {
        handleModalLogOut()  
    }
    

      return (
        <>
            {auth !== false && (

            
            <div>
                <Sidebar 
                    className={`bg-slate-300 w-full text-left flex flex-col h-screen justify-between p-0`}
                    collapsed={collaps}
                    collapsedWidth='100%'
                    width='100%'
                >
                    <Menu closeOnClick={true} className='flex h-full w-full justify-between '>
                        <div className='h-5/6'>
                            {/*HOME*/}
                            <MenuItem
                                className={`${collaps ? '' : ' bg-slate-700'} hover:text-white`}
                                icon={<MenuOutlinedIcon className={`${collaps ? 'hover:text-slate-600' : ''} text-slate-900`} style={{ fontSize: '2rem'}}/>}
                                onClick={() => {
                                    handleCollaps(!collaps)
                                }}
                                style={{ 
                                    height: "70px",
                                    width: "405px",
                                }} 
                            >
                                
                            </MenuItem>
                            <hr className='h-0.5 bg-slate-200 border-slate-200'/>
                            {/*Orders*/}
                            <Link href={'/orders'}>
                                <MenuItem 
                                    icon={<ReceiptIcon className={`${collaps ? (actualPage === '/orders' ? 'text-green-900' : 'text-slate-900 hover:text-slate-600') : 'text-slate-900'} `} style={{ fontSize: '2rem'}}/>} 
                                    className={`${collaps ? 'slidebar-icons-close' : ''} 2xl:mt-20 hover:text-green-900`}
                                    style={{ 
                                        height: "90px"
                                    }} 
                                    onClick={() => {
                                        handleCollaps(true)
                                    }}
                                >
                                    {!collaps && <h2 className={`${actualPage === '/orders' ? 'active' : ''} font-mono md:text-lg 2xl:text-2xl tracking-widest ml-10`}>Ordenes</h2>}
                                </MenuItem>
                            </Link>
                            <hr className='h-0.5 bg-slate-200 border-slate-200'/>
                            {/*Products*/}
                            <Link href={'/products'}>
                                <MenuItem 
                                    icon={<PropaneTankIcon className={`${collaps ? (actualPage === '/products' ? 'text-green-900' : 'text-slate-900 hover:text-slate-600') : 'text-slate-900'} `} style={{ fontSize: '2rem'}}/>} 
                                    className={`${collaps ? 'slidebar-icons-close' : ''} 2xl:mt-0 hover:text-green-900`}
                                    style={{ 
                                        height: "90px"
                                    }} 
                                    onClick={() => {
                                        handleCollaps(true)
                                    }}
                                >
                                    {!collaps && <h2 className={`${actualPage === '/products' ? 'active' : ''} font-mono md:text-lg 2xl:text-2xl tracking-widest ml-10`}>Productos</h2>}
                                </MenuItem>
                            </Link>
                            <hr className='h-0.5 bg-slate-200 border-slate-200'/>
                            {/*Trucks*/}
                            <Link href={'/trucks'}>
                                <MenuItem 
                                    icon={<LocalShippingIcon className={`${collaps ? (actualPage === '/trucks' ? 'text-green-900' : 'text-slate-900 hover:text-slate-600') : 'text-slate-900'} `} style={{ fontSize: '2rem'}}/>} 
                                    className={`${collaps ? 'slidebar-icons-close' : ''} 2xl:mt-0 hover:text-green-900`}
                                    style={{ 
                                        height: "90px"
                                    }} 
                                    onClick={() => {
                                        handleCollaps(true)
                                    }}
                                >
                                    {!collaps && <h2 className={`${actualPage === '/trucks' ? 'active' : ''} font-mono md:text-lg 2xl:text-2xl tracking-widest ml-10`}>Camiones</h2>}
                                </MenuItem>
                            </Link>
                            <hr className='h-0.5 bg-slate-200 border-slate-200'/>
                            {/*Drivers*/}
                            <Link href={'/drivers'}>
                                <MenuItem 
                                    icon={<SportsMotorsportsIcon className={`${collaps ? (actualPage === '/drivers' ? 'text-green-900' : 'text-slate-900 hover:text-slate-600') : 'text-slate-900'} `} style={{ fontSize: '2rem'}}/>} 
                                    className={`${collaps ? 'slidebar-icons-close' : ''} 2xl:mt-0 hover:text-green-900`}
                                    style={{ 
                                        height: "90px"
                                    }} 
                                    onClick={() => {
                                        handleCollaps(true)
                                    }}
                                >
                                    {!collaps && <h2 className={`${actualPage === '/drivers' ? 'active' : ''} font-mono md:text-lg 2xl:text-2xl tracking-widest ml-10`}>Conductores</h2>}
                                </MenuItem>
                            </Link>
                            <hr className='h-0.5 bg-slate-200 border-slate-200'/>
                            {/*Clients*/}
                            <Link href={'/clients'}>
                                <MenuItem 
                                    icon={<PersonIcon className={`${collaps ? (actualPage === '/clients' ? 'text-green-900' : 'text-slate-900 hover:text-slate-600') : 'text-slate-900'} `} style={{ fontSize: '2rem'}}/>} 
                                    className={`${collaps ? 'slidebar-icons-close' : ''} 2xl:mt-0  hover:text-green-900`}
                                    style={{ 
                                        height: "90px"
                                    }} 
                                    onClick={() => {
                                        handleCollaps(true)
                                    }}
                                >
                                    {!collaps && <h2 className={`${actualPage === '/clients' ? 'active' : ''} font-mono md:text-lg 2xl:text-2xl tracking-widest ml-10`}>Clientes</h2>}
                                </MenuItem>
                            </Link>
                            <hr className='h-0.5 bg-slate-200 border-slate-200'/>
                            {/*Bomb*/}
                            <Link href={'/bombs'}>
                                <MenuItem 
                                    icon={<LocalGasStationIcon className={`${collaps ? (actualPage === '/bombs' ? 'text-green-900' : 'text-slate-900 hover:text-slate-600') : 'text-slate-900'} `} style={{ fontSize: '2rem'}}/>} 
                                    className={`${collaps ? 'slidebar-icons-close' : ''} 2xl:mt-20  hover:text-green-900`}
                                    style={{ 
                                        height: "90px"
                                    }} 
                                    onClick={() => {
                                        handleCollaps(true)
                                    }}
                                >
                                    {!collaps && <h2 className={`${actualPage === '/bombs' ? 'active' : ''} font-mono md:text-lg 2xl:text-2xl tracking-widest ml-10`}>Gestion</h2>}
                                </MenuItem>
                            </Link>
                            <hr className='h-0.5 bg-slate-200 border-slate-200'/>
                            
                        </div>
                        <div className=''>
                            {/*Logout*/}
                            <button onClick={logout}>
                                <MenuItem 
                                    icon={<LogoutIcon className={`${collaps ? (modalLogOut ? 'text-green-900' : 'text-slate-900 hover:text-slate-600') : 'text-slate-900'} `} style={{ fontSize: '2rem'}}/>} 
                                    className={`${collaps ? 'slidebar-icons-close' : ''} 2xl:mt-0 hover:text-green-900 text-left`}
                                    style={{ 
                                        height: "90px",
                                        width: "400px",
                                    }} 
                                    onClick={() => {
                                        handleCollaps(true)
                                    }}
                                >
                                    {!collaps && <h2 className={`font-mono md:text-lg 2xl:text-2xl tracking-widest ml-10`}>Cerrar Sesión</h2>}
                                </MenuItem>
                            </button>
                            <hr className='h-0.5 bg-slate-200 border-slate-200'/>
                        </div>
                        
                    </Menu>
                    <div className='flex-1'></div>     
                </Sidebar>
                {modalLogOut && <ModalLogOut/>}
            </div>
            )}
        </>
  )
}

export default SidebarLayout


