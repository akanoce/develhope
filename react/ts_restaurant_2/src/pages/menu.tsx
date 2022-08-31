import useFetch from "../hooks/useFetch"
import { MenuItem } from "../types"

export default function Menu() {

    const { loading, error, data, trigger } = useFetch<MenuItem[]>('/menu')

    return (
        <div className='menu_container'>
            <button onClick={trigger}>Nuovo fetch</button>
            {loading && <h1>Loading....</h1>}
            {error && 'Errore di fetch'}
            {data && data.map(item => <Item data={item} />)}
        </div>
    )
}



type ItemProps = {
    data: MenuItem
}

export function Item({ data }: ItemProps) {


    return (
        <div className='item_card'>
            <img src={data.img} alt={`${data.name} img`} />
            <h1>{data.name}</h1>
            <div className="item_card__footer">
                <h2>{data.price}</h2>
                <h2>{data.category_id}</h2>
            </div>
        </div>
    )
}