import { Form, FileInput, Button, Input } from '../../components'
import styles from './styles.module.css'
import { useState } from 'react'

const ReceiptCreate = () => {
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
                console.log(data)
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
                    label='Загрузить фото!'>
                </FileInput>

                <Button>Сохранить чек</Button>

        </Form>
    )
    

}

export default ReceiptCreate