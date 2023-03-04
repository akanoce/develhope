import { ReactNode, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SyncLoader } from "react-spinners";
import { useLazyGetMenuCategoriesQuery, useLazyGetMenuQuery, useLazyGetOrdersQuery } from "./redux/api/menuApiSlice";
import { logOut, setCredentials } from "./redux/slice/authSlice";
import { setRestaurant } from "./redux/slice/restaurantSlice";
import { useNavigate } from 'react-router-dom'


export function AuthMiddleWare({ children }: { children: React.ReactElement }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [triggerMenu, { isLoading: isMenuLoading, isUninitialized: isMenuUninitialized }] = useLazyGetMenuQuery()
    const [triggerCategories, { isLoading: isCategoriesLoading, isUninitialized: isCategoriesUninitialized }] = useLazyGetMenuCategoriesQuery()
    const [triggerOrders, { isLoading: IsOrdersLoading, isUninitialized: isOrdersUninitialized }] = useLazyGetOrdersQuery()

    const [isUserLoading, setIsUserLoading] = useState<boolean>(true)

    const token = localStorage.getItem('accessToken')
    const loaders = [isUserLoading, isMenuLoading, isMenuUninitialized, isCategoriesLoading, isCategoriesUninitialized, IsOrdersLoading, isOrdersUninitialized]

    function checkUserLoggedIn() {
        setIsUserLoading(true)

        if (token) {
            dispatch(setCredentials({ user: {}, accessToken: token }))
            setIsUserLoading(false)
            return true
        }
        setIsUserLoading(false)
        return false

    }

    useEffect(() => {
        async function fetchData() {
            const isUser = checkUserLoggedIn()
            if (isUser) {
                try {
                    const menu = await triggerMenu({}).unwrap()
                    const categories = await triggerCategories({}).unwrap()
                    const orders = await triggerOrders({}).unwrap()
                    dispatch(setRestaurant({ menu: menu, categories: categories, orders: orders }))
                }
                catch (e: any) {
                    console.error(e)
                    dispatch(logOut())
                    navigate('/login')
                }
            }
        }
        fetchData()

    }, [token])

    if (token && loaders.includes(true))
        return (
            <div className='h-screen flex items-center justify-center' >
                <SyncLoader color='black' />
            </div>)

    return children
}