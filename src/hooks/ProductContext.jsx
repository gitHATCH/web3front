import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const ProductContext = React.createContext([{}, ()=>{}])

const ProductProvider = (props) => {
    const [products, setProducts] = useState([])
    const [actualProduct, setActualProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    
    const getProducts = async () => {
        setLoading(true)  
        try {
            const data = [
                {
                    nombre: "Abng2",
                    descripcion: "Gas peligroso",
                },
                {
                    nombre: "Abng2",
                    descripcion: "Gas peligroso",
                },
                {
                    nombre: "Abng2",
                    descripcion: "Gas peligroso",
                },
            ]
            setProducts(data)
            setLoading(false)
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