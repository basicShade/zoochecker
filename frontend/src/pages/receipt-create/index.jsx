import { Form, FileInput, Button, Input } from '../../components'
import styles from './styles.module.css'
import { useState } from 'react'
import api from '../../api'
import { useNavigate } from 'react-router-dom'

const ReceiptCreate = () => {
    const navigate = useNavigate()
    const [ receiptFile, setReceiptFile ] = useState(null)
    const [ receiptName, setReceiptName ] = useState('')

    return(
        <Form
            className={styles.form}
            onSubmit={e => {
                e.preventDefault()
                const data = {
                    name: receiptName,
                    image: receiptFile
                }
                api
                .createReceipt(data)
                .then(res => {
                    const result = res
                    // history.push(`/recipes/${res.id}`)
                  })
                .catch(err => {
                    return alert('Введите название и выберите фото')
                })
            }}
            >

                <Input
                    label='Название чека'
                    onChange = {e => {
                        const value = e.target.value
                        setReceiptName(value)
                    }}
                />

            
                <FileInput
                    onChange={file => {
                    setReceiptFile(file)
                }}
                    className={styles.fileInput}
                    label='Фото'>
                </FileInput>

                <Button className={styles.button} onClick={e => {e.preventDefault(); navigate('/receipts/')}}>На главную</Button>
                <Button className={styles.button}>Сохранить чек</Button>
                

        </Form>
    )
    

}

export default ReceiptCreate