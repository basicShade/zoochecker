import { Form, FileInput, Button, Input } from '../../components'
import styles from './styles.module.css'
import { useState } from 'react'
import api from '../../api'
import { useNavigate } from 'react-router-dom'
import { useFetching } from '../../hooks'

const ReceiptCreate = () => {
    const navigate = useNavigate()
    const [ receiptFile, setReceiptFile ] = useState(null)
    const [ receiptName, setReceiptName ] = useState('')
    const [isSaving, setIsSaving] = useState(false)

    const saveReceipt = async(e) => {
        
        setIsSaving(true)
        e.preventDefault()
        console.log(isSaving)
        const data = {
            name: receiptName,
            image: receiptFile
        }
        await api
        .createReceipt(data)
        .then(res => {
            // history.push(`/recipes/${res.id}`)
            navigate('/receipts/' + res.data.id)
          })
        .catch(err => {
            return alert('Введите название и выберите фото')
        })
        setIsSaving(false)
        
    }

    return(
        <Form className={styles.form} onSubmit={(e) => saveReceipt(e)}>

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

                {isSaving
                    ? <div>Loading...</div>
                    : <Button className={styles.button} onClick={e => {e.preventDefault(); navigate('/receipts')}}>На главную</Button>
                }
                {isSaving
                    ? ''
                    : <Button className={styles.button}>Сохранить чек</Button>
                }

        </Form>
    )
    

}

export default ReceiptCreate