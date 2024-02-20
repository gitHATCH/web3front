import React, { useEffect, useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalDelete from './Modals/ModalDelete';
import { ModalContext } from '../hooks/ModalContext';
import { AuthContext } from '../hooks/AuthContext';
import { OrderContext } from '../hooks/OrderContext';
import ArticleIcon from '@mui/icons-material/Article';
import PropaneIcon from '@mui/icons-material/Propane';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import ModalConciliacion from './Modals/ModalConciliacion';
 
export default function DefaultTable({headers, data:initialData, setActual, bombs, cargas, isOrden}) {
    
    const [modalDelete, modalEdit, handleModalDelete, handleModalEdit, handleModalLogOut, modalLogOut, modalAdd, handleModalAdd, modalPassword, handleModalPassword, modalConfigOrder, handleModalConfigOrder, modalConcil, handleModalConcil] = useContext(ModalContext);
    const [orders,getOrders,loading,actualOrder,handleActualOrder,deleteOrder,editOrder,addOrder,addTara,turnBomb,disableAlarm,changeUmbral,updateOrder,stopOrder,sendFinalWhight,actualConcil,getConcil,getAConcil] = useContext(OrderContext)
    const {role} = useContext(AuthContext)

    
    const [ordenActual, setOrdenActual] = useState(null)
    const [data, setData] = useState(initialData)
    const [sortActual, setSortActual] = useState(0)
    const [actualHeader, setActualHeader] = useState(null)
   

    useEffect(() => {
        setData(initialData)
    }, [initialData])

    

    const router = useRouter()

    const openEditModal = (index) => {
        if(index === false){
            handleModalAdd()
            handleModalEdit(true)
        }else{
            setActual(index)
            handleModalEdit()
        }
    }

    //TODO:
    const openConcilModal = async (index) => {
        handleActualOrder(index)
        setOrdenActual(data[index].numeroOrden)
        getAConcil(data[index].numeroOrden)
        //getConcil(data[index].numeroOrden)
        handleModalConcil()
    }

    const goOrder = (index) => {
        handleActualOrder(index)
        router.push(`/bombs/${data[index].numeroOrden}`)
    }
   
    const handleSort = (index) => {
        
        const sortedData = [...data].sort((a, b) => {
          const fieldA = Object.values(sortActual != index ? a : b)[index];
          const fieldB = Object.values(sortActual != index ? b : a)[index];
    
          if (typeof fieldA === 'string') {
            return fieldA.localeCompare(fieldB);
          } else {
            return fieldA - fieldB;
          }
        });
        setData(sortedData);
        setSortActual(index)
        if(sortActual == index) setSortActual(null)
      };

  return (
    <>
        <div className='w-full flex justify-center px-3 h-fit '>
            <table className='w-full '>
                <thead className=''>
                    <tr className='w-full flex justify-between items-center rounded-t-xl bg-slate-400 border-t-2 border-slate-400'>
                        {headers.map((header, index) => (
                            <th key={index} className={`${header==="Código"  ?"w-[600px]":"w-full"} relative p-2 flex justify-center items-center`} onMouseEnter={() => setActualHeader(index)} onMouseLeave={() => setActualHeader(null)}>
                                <p className={`${header==="Código"  ?"w-[600px]":"w-full"} text-md font-mono font-semibold tracking-widest uppercase`}>{header}</p>
                                <button onClick={() => handleSort(index)} className={`  p-1 absolute right-2 hover:bg-slate-300 rounded-full ${actualHeader != index && "hidden"}`}>
                                    <svg className='w-4 h-fit' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>sort-alphabetical-variant</title><path d="M9.25,5L12.5,1.75L15.75,5H9.25M15.75,19L12.5,22.25L9.25,19H15.75M8.89,14.3H6L5.28,17H2.91L6,7H9L12.13,17H9.67L8.89,14.3M6.33,12.68H8.56L7.93,10.56L7.67,9.59L7.42,8.63H7.39L7.17,9.6L6.93,10.58L6.33,12.68M13.05,17V15.74L17.8,8.97V8.91H13.5V7H20.73V8.34L16.09,15V15.08H20.8V17H13.05Z" /></svg>
                                </button>
                            </th>
                        ))}
                   
                    </tr>
                </thead>
                <tbody className='flex-row bg-slate-200'>
                    {data.map((field, index) => (
                        <tr key={index} className={`w-full flex ${index % 2 ? "bg-lime-600 hover:bg-lime-500":"bg-cyan-600 hover:bg-cyan-500"}`}>
                        {Object.keys(field).map((key) => (
                          
                            <th key={key} className={`flex items-center justify-center border-r-2 ${key==="codigoExterno" || key === "code" ?"w-[600px]":"w-full"}` } >
                                <p className={`text-lg font-mono font-normal tracking-widest text-center overflow-hidden overflow-wrap break-word ${key==="codigoExterno" || key === "code" ?"w-[600px]":"w-full "}`}>
                                    {field[key].toString()}
                                </p>
                            </th>
                        ))}
                  
                        {bombs && (
                            <th className='w-full py-2 flex items-center justify-center gap-2'>
                                <button disabled={role !== "[ROLE_ADMIN]"} className={` text-2xl font-mono font-normal tracking-widest hover:bg-slate-300 rounded-full p-1`} onClick={() => goOrder(index)}>
                                    <PropaneIcon className={`${role !== "[ROLE_ADMIN]" ? "text-slate-600":"text-blue-900"}`} style={{ fontSize: '2rem'}}/>
                                </button>
                               
                                    <button disabled={field?.estado < 4} onClick={() => openConcilModal(index)} className={` ${!field.estado < 4 && "hover:bg-slate-300"} text-2xl font-mono font-normal tracking-widest rounded-full p-1`}>
                                        <ArticleIcon className={`${field?.estado < 4 ? "text-slate-600" : "text-blue-900"}`} style={{ fontSize: '2rem'}}/>
                                    </button>
                              
                            </th>
                        )}
                            
                        </tr>
                    ))}
                    
                </tbody>
                <tfoot>
                    <tr className='w-full flex justify-center items-center rounded-b-xl bg-slate-500 border-b-2 border-t-2 border-slate-500  p-2'>
                        <th className='w-full relative flex justify-center p-2 items-center gap-2'>
                            {data.length == 0 && (
                                <p>Nada cargado aún...</p>
                            )}
                        </th>
                    </tr>
                </tfoot>
            </table>
        </div>
                             
        {!bombs && !cargas && role==="[ROLE_ADMIN]" && (
            <div className='flex justify-center'>
                <button className='w-40 h-10 rounded-b-full bg-slate-700 hover:bg-gray-600'>
                        <AddCircleIcon className={`text-slate-200`} style={{ fontSize: '2rem'}} onClick={() => openEditModal(false)}/> 
                </button>
            </div>
        )}
        {modalConcil && ordenActual && <ModalConciliacion orden={ordenActual} />}
       
    </>
  );
}