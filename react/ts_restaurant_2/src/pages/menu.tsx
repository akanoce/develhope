import useFetch from "../hooks/useFetch"
import { MenuCategoryModel, MenuItemModel } from "../types"

export default function Menu() {

    const { loading: menuLoading, error: menuError, data: menu } = useFetch<MenuItemModel[]>('/menu')
    const { loading: categoriesLoading, error: categoriesError, data: categories } = useFetch<MenuCategoryModel[]>('/categories')

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

    const category = categories.find(item => item.id === menuItem.category_id)
    return (
        <div className='card'>
            <img src={menuItem.img} alt={`${menuItem.name} img`} />
            <div className='card__body'>
                <h1>{menuItem.name}</h1>
                <div className="card__footer">
                    <span>{category?.name || menuItem.category_id}</span>
                    <span>{menuItem.price}€</span>
                </div>
            </div>
        </div>
    )
}