import React, { useContext, useEffect } from 'react'
import DefaultTable from '../components/DefaultTable'
import { ProductContext } from '../hooks/ProductContext'
import Spinner from '../components/Spinner'
import { ModalContext } from '../hooks/ModalContext'
import ModalDelete from '../components/Modals/ModalDelete'
import ModalEditProduct from '../components/Modals/ModalEditProduct'

const Products = () => {
    const [products,getProducts,loading,actualProduct,handleActualProduct,deleteProduct,editProduct] = useContext(ProductContext)
    const [modalDelete, modalEdit] = useContext(ModalContext);

    const headers = ["Nombre", "Descripcion", "Código"]

    useEffect(() => {
        getProducts()
    }, [])
    
  return (
    <>
        <div>
            <h1 className='text-left text-7xl font-mono font-semibold mt-10 ml-10'>Productos</h1>
            <div>
                {loading ?(
                    <div className='flex justify-center mt-60'>
                        <Spinner/>
                    </div>
                ) : (
                    
                        <div className='mt-20'>
                            <DefaultTable headers={headers} data={
                                products.map((product) => { 
                                    return {
                                        nombre: product.nombre,
                                        descripcion: product.descripcion,
                                        code: product.code
                                    }
                                })     
                            } tipo="product" setActual={handleActualProduct}/>
                        </div>
                   
                )}
            </div>
            { modalDelete && <ModalDelete deleteActual={() => deleteProduct()}/> }
            { modalEdit && <ModalEditProduct editActual={editProduct}/> }
        </div>
    </>
  )
}

export default Products