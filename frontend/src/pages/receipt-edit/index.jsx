import { Item } from '../../components'
import styles from './styles.module.css'
import { useState, useEffect } from 'react'
import api from '../../api'

import { useParams } from 'react-router-dom'
import { useFetching } from '../../hooks'

const ReceiptEdit = () => {
    const params = useParams()
    const [receipt, setReceipt] = useState({})
    const [items, setItems] = useState({})

    const [fetchReceipt, isLoading, error] = useFetching(async (id) => {
        const response = await api.getReceipt(id)
        setReceipt(response.data)
        setItems(response.data.data.items)
    })

    useEffect(() => {
        fetchReceipt(params.id)
 
    }, [])

    return (
        <div>
            {isLoading
                ? <div>hey</div>
                : <div>
                    <h1>{receipt.name}</h1>
                    <div>Дата: {receipt.data.date}</div>
                    <div>Заведение: {receipt.data.merchant_name}</div>
                    {
                    Object.entries(items).map((item) => {
                        return (
                            <Item key={item[0]} obj={item}/>
                        )
                    })

                    }
                </div>
            }            
        </div>
    )
}

export default ReceiptEdit