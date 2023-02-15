import { Form, FileInput, Button, Input } from '../../components'
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
        setItems(response.data.data)
    })

    function iterateItems(json) {
        result = []
        {Object.keys(json).map((k, i) => {
            result.append(
                <div key={i}>
                    <div>item: {receipt.data[k]}</div>
                </div>
            )
        })}
        return result.join('')
    }

    useEffect(() => {
        fetchReceipt(params.id)
    }, [])

    return (
        <div>
            {isLoading
                ? <div>hey</div>
                : <div>{receipt.name}
                    {
                    Object.keys(items).map((key, index) => {
                        return (
                        <div key={index} style={{marginTop: 15, marginLeft: 10}}>
                            Позиция {key}
                            <div>Количество: {items[key]['quantity']}</div>
                            <div>Сумма: {items[key]['total']}</div>
                        </div>
                        )
                    })

                    }
                </div>
            }            
        </div>
    )
}

export default ReceiptEdit