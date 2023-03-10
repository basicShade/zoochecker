import { Form, Receipt } from '../../components'
import styles from './styles.module.css'
import { useState, useEffect } from 'react'
import api from '../../api'
import cn  from 'classnames'
import { Button } from '../../components'
import { CreatableSelect } from '../../components'
import { useFetching } from '../../hooks'
import { useNavigate } from "react-router-dom"

const ReceiptList = () => {
    const navigate = useNavigate()
    const [receiptList, setReceiptList] = useState([])

    const [fetchReceiptList, isLoading, fetchError] = useFetching(async () => {
        const response = await api.getReceiptList()
        setReceiptList(response.data)
    })

    useEffect(() => {
        fetchReceiptList()
     }, [])

    return(
        <div>
            {fetchError
                ? <div>Ошибка: сервер не отвечает</div>
                : <div>
                    {isLoading
                        ? <div>Loading...</div>
                        : <Form className={styles.form}>
                            { receiptList.length
                                ? ''
                                : <div>Чеки не найдены</div>
                            }
                            <Button className={styles.button} onClick={e => {e.preventDefault(); navigate('/')}}>+ Добавить новый чек</Button>
                            {receiptList.map((receipt) => {return <Receipt key={receipt.id} receipt={receipt}/>})}
                          </Form>
                    }
                  </div>
            }
        </div>
    )
    

}

export default ReceiptList