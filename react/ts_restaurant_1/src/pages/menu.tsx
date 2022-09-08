import { DataContext, useData } from "context/dataContext"
import { useFetch } from "hooks/useFetch"
import { useContext } from "react"
import { MenuCategoryModel, MenuItemModel } from "types"

export default function Menu() {

    const { categories, categoriesLoading, categoriesError, menuLoading, menuError, menu, ordersLoading, ordersError, orders } = useData()

    return (
        <div className="menu_container">
            {(menuLoading || categoriesLoading) && <h1>Loading ...</h1>}
            {(menuError || ordersError) && <h1>Errore nel fetch ...</h1>}
            {menu.map(item => <MenuItem item={item} categories={categories} />)}
        </div>
    )
}

export function MenuItem({ item, categories }: { item: MenuItemModel, categories: MenuCategoryModel[] }) {

    const productCategory = categories.find(cat => cat.id === item.category_id)

    return (
        <>
            <div className="menuitem_card">
                <div className="img_container">
                    <img src={item.img} alt={`${item.name} img`} />
                </div>
                <div className="menuitem_body">
                    <h3>{item.name}</h3>
                    <div className="menuitem_footer">
                        <h3>{productCategory?.name || item.id}</h3>
                        <h3>{item.price}</h3>
                    </div>
                </div>
            </div>
        </>
    )
}