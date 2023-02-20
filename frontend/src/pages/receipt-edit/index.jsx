import { Item, Form, PayersList, Button } from '../../components'
import styles from './styles.module.css'
import { useState, useEffect, useMemo, useCallback } from 'react'
import api from '../../api'

import { useParams, useNavigate } from 'react-router-dom'
import { useFetching } from '../../hooks'
import { ReceiptContext } from '../../context'
import { getPaiersList, updatePaiersTotals } from '../../utils'

const ReceiptEdit = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [receipt, setReceipt] = useState({})
    const [items, setItems] = useState({})
    const [paiersList, setPaiersList] = useState([])
    const [total, setTotal] = useState(0)
    const [isSaved, setIsSaved] = useState(true)
    const [isSending, setIsSending] = useState(false)

    const [fetchReceipt, isLoading, fetchError] = useFetching(async (id) => {
        const response = await api.getReceipt(id)
        let items = response.data.data.items
        let paiersList = getPaiersList(response.data)
        let total = paiersList.reduce((a, b) => a+b.total, 0)
        setReceipt(response.data)
        setItems(items)
        setPaiersList(paiersList)
        setTotal(total)
    })

    const [saveReceipt, isSaving, saveError] = useFetching(async(e, id, receipt) => {
        e.preventDefault()
        if (isSending) return
        setIsSending(true)
        console.log(paiersList)
        console.log(receipt)
        await api.patchReceipt(id, receipt)
        setIsSending(false)
        setIsSaved(true)
    })

    useEffect(() => {
        fetchReceipt(params.id)
     }, [])

    return (
        <ReceiptContext.Provider value={{
            items,
            paiersList,
            setPaiersList,
            total,
            setTotal,
            setIsSaved
            
        }}>
            <div>
                {fetchError
                    ? <div>Ошибка: сервер не отвечает</div>
                    : <div>
                        {isLoading
                            ? <div>Loading...</div>
                            : <Form className={styles.form}>
                                <div className={styles.header}>
                                    <div className={styles.title}>{receipt.name}</div>
                                    <div>
                                        <div className={styles.total}>
                                            <span style={{'fontSize': '15px', 'float': 'left'}}>
                                                Раcпределено:
                                            </span><br/>
                                            {total}Р
                                        </div>
                                        <div className={styles.total}>
                                            <span style={{'fontSize': '15px', 'float': 'left', 'marginLeft': '15px'}}>
                                                Всего:
                                            </span><br/>
                                            {receipt.data.total}Р
                                        </div>
                                        <PayersList className={styles.payers} payersList={paiersList} />
                                    </div>
                                    <div>
                                        Дата: {receipt.data.date}<br/>
                                        Заведение: {receipt.data.merchant_name}
                                    </div>
                                    <div>
                                        {!isSaved
                                            ? <Button
                                                className={styles.buttonRight}
                                                // clickHandler={api.patchReceipt}
                                                onClick={e => {saveReceipt(e, params.id, receipt)}}//api.patchReceipt(params.id, receipt); setIsSaved(true)}}
                                            >Сохранить изменения
                                            </Button>
                                            : ''
                                        }
                                        <Button
                                            className={styles.buttonRight}
                                            onClick={e => {e.preventDefault(); navigate('/receipts')}}
                                            >На главную
                                        </Button>
                                    </div>
                                    
                                </div>
                                {Object.entries(items).map((item) => {
                                    return <Item key={item[0]} obj={item}/>
                                })}
                                
                            </Form>
                        }            
                    </div>
                }
            </div>
        </ReceiptContext.Provider>
    )
}

export default ReceiptEdit