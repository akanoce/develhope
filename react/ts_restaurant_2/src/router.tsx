import { Routes, Route, Navigate } from 'react-router-dom'
import Menu from './pages/menu'
import { NewMenuItem } from './pages/newMenuItem'
import Orders from './pages/orders'

export default function Router() {


    return (

        <Routes>
            <Route path='menu'>
                <Route index element={<Menu />} />
                <Route path='new' element={<NewMenuItem />} />
            </Route>
            <Route path='orders' element={<Orders />} />
            <Route path='*' element={<Navigate to='/menu' replace={true} />} />
        </Routes>


    )



}