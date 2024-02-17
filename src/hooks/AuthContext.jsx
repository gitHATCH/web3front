/* Contexto del Slidebar */
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axiosClient from '../config/axiosClient'
import { jwtDecode } from "jwt-decode";

const AuthContext = React.createContext([{}, ()=>{}])

const AuthProvider = (props) => {
    const [auth, setAuth] = useState(false)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    if(auth) {
        const decodedToken = jwtDecode(auth);
        const currentTime = Date.now() / 1000; 
        if (decodedToken.exp < currentTime) {
            toast.error("Expired token")
            localStorage.removeItem('token')
            setAuth(false)
            router.push("/")
        }
    }

    useEffect(() => {
        const authUser = async() => {
            const token = localStorage.getItem('token')
            if(!token){
                setLoading(false)
                return
            }
            setAuth(token)
            setLoading(false)
            if(router.pathname === "/"){
                router.push("/orders")
            }
            authorize()

        }
        authUser()
    }, [])
    

    const authorize = async() => {
        const token = localStorage.getItem('token')
        if(!token){
            return
        }

        setAuth(token)
        router.push("/orders")

    }
    const unAuthorize = async() => {
        setAuth(false)
        setLoading(false)
        localStorage.removeItem('token')
        router.push("/")
    }
    const handleAuth = (token) => {
        setAuth(token)
    }

    const loginUser = async(username, password) => {

        try {
            const response = await axiosClient.post('/auth/login', 
                new URLSearchParams({
                    'username': username,
                    'password': password
                  }), {
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    }
                  });
            localStorage.setItem('token',response.data);
            authorize();
            
        } catch (error) {
            toast.error(error.response.data);
        }
    }

    return (
        <AuthContext.Provider value={{auth,handleAuth,loading,authorize,unAuthorize,loginUser}}>
            {props.children}
        </AuthContext.Provider>
    )      
}

export {AuthContext, AuthProvider}