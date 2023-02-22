import { Item, Form, PayersList, Button } from '../../components'
import styles from './styles.module.css'
import { useState, useEffect, useMemo, useCallback } from 'react'
import api from '../../api'

import { useParams, useNavigate } from 'react-router-dom'
import { useFetching } from '../../hooks'
import { ReceiptContext } from '../../context'
import { getPaiersList, updatePaiersTotals } from '../../utils'
import { Component } from 'react'

import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';

const ReceiptEdit = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [receipt, setReceipt] = useState({})
    const [items, setItems] = useState({})
    const [paiersList, setPaiersList] = useState([])
    const [total, setTotal] = useState(0)
    const [isUpdated, setIsUpdated] = useState(true) //пересчитаны суммы в заголовке чека
    const [isSaved, setIsSaved] = useState(true) //сохранено в базе данных
    const [isSending, setIsSending] = useState(false)
    const [isFirstLoad, setIsFirstLoad] = useState(true)
    
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
        receipt.data.items = items
        await api.patchReceipt(id, receipt)
        setIsSending(false)
        setIsSaved(true)
    })

    useEffect(() => {
        fetchReceipt(params.id)
     }, [])

    useEffect(() => {
        if (isFirstLoad) {setIsFirstLoad(false); return}
        setTotal(updatePaiersTotals(paiersList, items))
        setIsSaved(false)
        setIsUpdated(true)
     }, [isUpdated])

    return (
        <ReceiptContext.Provider value={{
            items,
            setItems,
            paiersList,
            setPaiersList,
            total,
            setTotal,
            setIsSaved,
            setIsUpdated

        }}>
            <div>
                {fetchError
                    ? <div>Ошибка: сервер не отвечает</div>
                    : <div>
                        {isLoading
                            ? <div>Loading...</div>
                            : <Form className={styles.form}>
                                <div className={styles.header}>
                                    <div className={styles.title}>
                                        <EditText
                                            type='string' inline showEditButton
                                            style={{width: '95%', whiteSpace: 'pre-wrap'}}
                                            defaultValue={receipt.name}
                                            onSave={(n)=>{receipt.name=n.value; setIsSaved(false)}}
                                            />
                                    </div>
                                    <div>
                                        <div className={styles.total}>
                                            <span style={{'fontSize': '15px', 'float': 'left'}}>
                                                Раcпределено (руб):
                                            </span><br/>
                                            {total}
                                        </div>
                                        <div className={styles.total}>
                                            <span style={{'fontSize': '15px', 'float': 'left', 'marginLeft': '15px'}}>
                                                Всего (руб):
                                            </span><br/>
 
                                            <EditText
                                                type="number" inline showEditButton
                                                style={{width: '60px', fontSize: '25px'}}
                                                defaultValue={receipt.data.total}
                                                onSave={(n)=>{receipt.data.total=n.value; setIsSaved(false)}}
                                            />
                                        </div>
                                        <PayersList className={styles.payers} payersList={paiersList} />
                                    </div>
                                    <div>
                                        Дата: <EditText
                                            // onChange={(e)=>console.log(e)}
                                            // onEditMode={(e)=>console.log(e)}
                                            type='date' inline showEditButton
                                            style={{width: '95%', whiteSpace: 'pre-wrap'}}
                                            defaultValue={receipt.data.date}
                                            onSave={(n)=>{receipt.data.date=n.value; setIsSaved(false)}}
                                        /><br/>
                                        Заведение: <EditText
                                            type='string' inline showEditButton
                                            style={{width: '95%', whiteSpace: 'pre-wrap'}}
                                            defaultValue={receipt.data.merchant_name}
                                            onSave={(n)=>{receipt.data.merchant_name=n.value; setIsSaved(false)}}
                                        />
                                        {/* Заведение: {receipt.data.merchant_name} */}
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