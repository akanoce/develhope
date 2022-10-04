import { useEffect, useState } from "react"
import { InsertProductDialog } from "../components/dialog"
import { useData } from "../context/dataContext"
import useFetch from "../hooks/useFetch"
import { MenuCategoryModel, MenuItemModel } from "../types"

export default function Menu() {

    const { menu, menuLoading, menuError, categories, categoriesLoading, categoriesError } = useData()

    return (<>
        {(menuLoading || categoriesLoading) && <h1>Loading....</h1>}
        {(!!menuError || !!categoriesError) && 'Errore di fetch'}
        <div className='menu_container'>
            {(menu && categories) && menu.map(item => <MenuItem menuItem={item} categories={categories} />)}
        </div>
    </>
    )
}


type ItemProps = {
    menuItem: MenuItemModel,
    categories: MenuCategoryModel[]
}

export function MenuItem({ menuItem, categories }: ItemProps) {

    const [isOpen, setIsOpen] = useState(false)
    const category = categories.find(item => item.id === menuItem.category_id)


    return (
        <>
            <InsertProductDialog isOpen={isOpen} closeModal={() => setIsOpen(false)} product={menuItem} />
            <div className='card cursor-pointer' onClick={() => setIsOpen(true)}>
                <img src={menuItem.img} alt={`${menuItem.name} img`} />
                <div className='w-full px-2 py-3'>
                    <h1>{menuItem.name}</h1>
                    <div className="card__footer">
                        <span>{category?.name || menuItem.category_id}</span>
                        <span>{menuItem.price}€</span>
                    </div>
                </div>
            </div>
        </>
    )
}