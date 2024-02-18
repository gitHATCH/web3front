import React, { useEffect } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalDelete from './Modals/ModalDelete';
import { ModalContext } from '../hooks/ModalContext';
import ArticleIcon from '@mui/icons-material/Article';
import PropaneIcon from '@mui/icons-material/Propane';
import { useContext } from 'react';
import { useRouter } from 'next/router';
 
export default function DefaultTable({headers, data, setActual, bombs}) {
    const [modalDelete, modalEdit, handleModalDelete, handleModalEdit, handleModalLogOut, modalLogOut, modalAdd, handleModalAdd] = useContext(ModalContext);
    const router = useRouter()

    const openDeleteModal = (index) => {
        setActual(index)
        handleModalDelete()
    }

    const openEditModal = (index) => {
        // console.log(index);
        if(index === false){
            handleModalAdd()
            handleModalEdit(true)
        }else{
            setActual(index)
            handleModalEdit()
        }
    }

    //TODO:
    const openConcilModal = (index) => {
        setActual(index)
    }

    //TODO:
    const goOrder = (index) => {
        setActual(index)
        router.push(`/bombs/${data[index].numeroOrden}`)
        
    }

  return (
    <>
        <div className='w-full flex justify-center px-3'>
            <table className='w-full shadow-2xl border'>
                <thead className='bg-slate-300'>
                    <tr className='w-full flex justify-between'>
                        {headers.map((header, index) => (
                            <th key={index} className='w-full p-2'>
                                <p className='text-3xl font-mono font-semibold tracking-widest'>{header}</p>
                            </th>
                        ))}
                        {/*
                            <th className='w-full'>
                                    <p className='text-3xl font-mono font-semibold tracking-widest'></p>
                            </th>
                        
                         */}
                    </tr>
                </thead>
                <tbody className='flex-row bg-slate-200 '>
                    {data.map((field, index) => (
                        <tr key={index} className='w-full flex justify-between mt-2'>
                        {Object.keys(field).map((key) => (
                            <th key={key} className='w-full p-2'>
                                <p className='text-xl font-mono font-normal tracking-widest whitespace-nowrap'>{field[key].toString()}</p>
                            </th>
                        ))}
                            {/*
                        {!bombs ? (
                            <th className='w-full'>
                                
                                    <button className='text-2xl font-mono font-normal tracking-widest mr-10 hover:bg-slate-300 rounded-full p-1' onClick={() => openEditModal(index)}>
                                        <EditIcon className={`text-blue-900`} style={{ fontSize: '2rem'}}/>
                                    </button>
                                    <button className='text-2xl font-mono font-normal tracking-widest hover:bg-slate-300 rounded-full p-1' onClick={() => openDeleteModal(index)}>
                                        <DeleteIcon className={`text-red-900`} style={{ fontSize: '2rem'}}/>
                                    </button>
                                
                            </th>
                        }*/}
                        {bombs && (
                            <th className='w-full p-2 flex items-center'>
                                <button className=' text-2xl font-mono font-normal tracking-widest mr-10 hover:bg-slate-300 rounded-full p-1' onClick={() => goOrder(index)}>
                                    <PropaneIcon className={`text-blue-900`} style={{ fontSize: '2rem'}}/>
                                </button>
                               
                                    <button disabled={field?.estado < 4} className={` ${!field.estado < 4 && "hover:bg-slate-300"} text-2xl font-mono font-normal tracking-widest rounded-full p-1`}>
                                        <ArticleIcon className={`${field?.estado < 4 ? "text-slate-600" : "text-blue-900"}`} style={{ fontSize: '2rem'}}/>
                                    </button>
                              
                            </th>
                        )}
                            
                        </tr>
                    ))}
                    <tr className='w-full flex justify-between mt-2'></tr>
                </tbody>
            </table>
        </div>
        {!bombs && (
            <div className='flex justify-center'>
                <button className='w-40 h-10 rounded-b-full bg-slate-700 hover:bg-gray-600'>
                        <AddCircleIcon className={`text-slate-200`} style={{ fontSize: '2rem'}} onClick={() => openEditModal(false)}/> 
                </button>
            </div>
        )}
       
    </>
  );
}