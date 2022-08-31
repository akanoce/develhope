import Menu from 'pages/menu'
import Orders from 'pages/orders'
import { Routes, Route, Navigate } from 'react-router-dom'


export default function Router() {
    
    return (
        <Routes>
            <Route path='menu' element={<Menu />} />
            <Route path='orders' element={<Orders />} />
            <Route path='*' element={<Navigate to='menu' replace={true} />} />
        </Routes>
    )
}