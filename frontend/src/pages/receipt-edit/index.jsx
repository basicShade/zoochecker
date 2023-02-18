import { Item, Form, PayersList } from '../../components'
import styles from './styles.module.css'
import { useState, useEffect } from 'react'
import api from '../../api'

import { useParams } from 'react-router-dom'
import { useFetching } from '../../hooks'
import { ReceiptContext } from '../../context'

const ReceiptEdit = () => {
    const params = useParams()
    const [receipt, setReceipt] = useState({})
    const [items, setItems] = useState({})
    const [paiersList, setPaiersList] = useState([])
    const [total, setTotal] = useState(0)

    const [fetchReceipt, isLoading, error] = useFetching(async (id) => {
        const response = await api.getReceipt(id)
        setReceipt(response.data)
        setItems(response.data.data.items)
    })

    useEffect(() => {
        fetchReceipt(params.id)
     }, [])

    return (
        <ReceiptContext.Provider value={{
            items,
            setItems,
            paiersList,
            setPaiersList,
            total,
            setTotal
        }}>
            <div>
                {isLoading
                    ? <div>Loading...</div>
                    : <Form className={styles.form}>
                        <h1 className={styles.title}>{receipt.name}</h1>
                        <div className={styles.totalParent}>
                            <p className={styles.total}>{total}Р</p>
                            <p className={styles.total}>{receipt.data.total}Р</p>
                            <PayersList className={styles.payers} payersList={paiersList} />
                        </div>
                        <div>Дата: {receipt.data.date}</div>
                        <div>Заведение: {receipt.data.merchant_name}</div>
                        {Object.entries(items).map((item) => {
                            return <Item key={item[0]} obj={item}/>
                        })}
                    </Form>
                }            
            </div>
        </ReceiptContext.Provider>
    )
}

export default ReceiptEdit