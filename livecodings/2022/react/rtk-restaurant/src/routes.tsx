
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom'
import { Navbar } from './components/navbar'
import { ProtectedContainer } from './components/protectedContainer'
import Login from './pages/login'
import Menu from './pages/protected/menu'
import Orders from './pages/protected/orders'
import Register from './pages/register'
import { selectCurrentToken, setCredentials } from './redux/slice/authSlice'

export default function Router() {




    return (

        <Routes>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='/' element={<RequiredAuth />}>
                <Route path='orders' element={<Orders />} />
                <Route path='menu' element={<Menu />} />
            </Route>
            <Route path='*' element={<Navigate to="/" replace={true} />} />
        </Routes>
    )
}

//wrapper per rotte autenticate 
//ogni volta che la rotta cambia, verifico se l'utente è loggato 
// e quindi se è autorizzato a visitare quella pagina 
export function RequiredAuth() {

    const token = useSelector(selectCurrentToken)

    return (
        <>
            {token ? <ProtectedContainer><Outlet /></ProtectedContainer>
                : <Navigate to="/login" replace={true} />
            }
        </>

    )
}