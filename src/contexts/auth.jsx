import React, { createContext, useState, useEffect } from "react";
import { api ,createSession } from "../services/api";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const user = localStorage.getItem('user')
        const token = localStorage.getItem('token')

        if(user && token) setUser(JSON.parse(user))
    },
    [])

    const login = async (email, password) => {
        const response = await createSession(email, password)

        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('token', response.data.token)

        api.defaults.headers.Authorization = `Bearer ${response.data.token}`

        setUser(response.data.user)

        navigate('/')
    }

    
    const logout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')

        api.defaults.headers.Authorization = null

        setUser(null);

        navigate('/login')
    }

    return(
        <AuthContext.Provider
            value={{
                autheticaded: !!user,
                userId: '123',
                user,
                loading,
                login,
                logout
                }
        }>
            {children}
        </AuthContext.Provider>
    )
}