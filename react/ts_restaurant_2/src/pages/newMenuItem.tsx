import { useState } from "react"
import useFetch from "../hooks/useFetch"
import useLazyFetch from "../hooks/useLazyFetch"
import { MenuCategory, MenuItem } from "../types"

type NewMenuItemForm =
    {
        name: string | undefined,
        price: number | undefined,
        img: string | undefined,
        category: number | undefined
    }

export function NewMenuItem() {
    const { data: categories, loading, error } = useFetch<MenuCategory[]>('/categories')
    const { data: newProduct, trigger: newProductRequest } = useLazyFetch<MenuItem>('/menu')

    const [name, setName] = useState('')
    const [formState, setFormState] = useState<NewMenuItemForm>(
        {
            name: undefined,
            price: undefined,
            img: undefined,
            category: undefined
        }
    )



    function onFormChange(data: Partial<NewMenuItemForm>) {
        setFormState({ ...formState, ...data })
    }

    function onFormFinish() {
        newProductRequest({
            method: 'POST',
            body: JSON.stringify(formState)
        })

    }

    return (
        <>
            {categories &&
                <form onSubmit={(e) => { e.preventDefault(); onFormFinish() }} >
                    <input name='name' onChange={(e) => onFormChange({ name: e.target.value })} type='text' placeholder='Name' />
                    <input name='price' onChange={(e) => onFormChange({ price: parseFloat(e.target.value) })} type='number' placeholder='price' />
                    <input name='img' onChange={(e) => onFormChange({ img: e.target.value })} type='text' placeholder='img' />
                    <select name='category' onChange={(e) => onFormChange({ category: parseInt(e.target.value) })}>
                        {categories.map(category => <option value={category.id}>{category.name}</option>)}
                    </select>
                    <button type='submit'> Inserisci</button>
                </form>
            }
        </>
    )
}