import { useFetch } from "hooks/useFetch"
import { MenuCategoryModel, MenuItemModel } from "types"

export default function Menu() {

    const { loading, error, data: menu } = useFetch<MenuItemModel[]>('/menu')
    const { loading: categoryLoading, error: categoryError, data: categories } = useFetch<MenuCategoryModel[]>('/categories')

    return (
        <div className="menu_container">
            {(loading || categoryLoading) && <h1>Loading ...</h1>}
            {(error || categoryError) && <h1>Errore nel fetch ...</h1>}
            {(menu && categories) && menu.map(item => <MenuItem item={item} categories={categories} />)}
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