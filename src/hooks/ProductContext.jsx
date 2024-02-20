import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axiosClient from '../config/axiosClient';
import { v4 as uuidv4 } from 'uuid';

const ProductContext = React.createContext([{}, ()=>{}])

const ProductProvider = (props) => {
    const [products, setProducts] = useState([])
    const [actualProduct, setActualProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token');
    
    const getProducts = async () => {
        setLoading(true)
        try {
            const response = (await axiosClient.get('/producto/find-all', { headers: { Authorization: `Bearer ${token}` } }));
            const data = response.data
            /*
            .map((product) => { 
                return {
                    nombre: product.nombre,
                    descripcion: product.descripcion,
                    code: product.code
                }
            })     
            */     
            setProducts(data)

        } catch (error) {
            console.log(error);
        } 
        setLoading(false) 
    }
    
    const handleActualProduct = (product) => {
        setActualProduct(product)
    }

    const deleteProduct = async() => {
        try {
            const updatedProducts = products.filter((_, index) => index !== actualProduct);
            setProducts(updatedProducts);
            setActualProduct(null);
            toast.success("Producto eliminado correctamente")
        } catch (error) {
            console.log(error);
        }
    }

    const editProduct = async(product) => {
        try {
            const updatedProducts = [...products];
            updatedProducts[actualProduct] = product;
            setProducts(updatedProducts);
            setActualProduct(null);
            toast.success("Producto editado correctamente")
        } catch (error) {
            console.log(error);
        }
    }

    const addProduct = async(product) => {
        try {

            product = {...product, code: uuidv4()};
            await axiosClient.post('/producto', product, { headers: { Authorization: `Bearer ${token}` } })
            const updatedProducts = [...products];
            updatedProducts.push(product)
            setProducts(updatedProducts);
            toast.success("Producto agregado correctamente")
        } catch (error) {
            console.log(error);
        }   
    }
    
    return (
        <ProductContext.Provider value={[products,getProducts,loading,actualProduct,handleActualProduct,deleteProduct,editProduct, addProduct]}>
            {props.children}
        </ProductContext.Provider>
    )      
}

export {ProductContext, ProductProvider}