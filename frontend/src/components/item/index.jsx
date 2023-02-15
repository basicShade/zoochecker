import { useState } from 'react'
import styles from './styles.module.css'
import { Select } from '../../components'


const Index = (obj) => {
    const key = obj['obj'][0]
    const item = obj['obj'][1]
    const [itemOwner, setItemOwner] = useState('')

    return (
        <div className={styles.item}>
            <div className={styles.itemDesc}>
                {key}. {item['description']}
            </div>
            <div className={styles.itemQty}>
                {item['qty'] ? item['qty'] : 1} 
            </div>
            <div className={styles.itemAmt}>
                {item['amount']}Р  
            </div>
            <Select
                onChange = {e => {
                    const value = e.target.value
                    setItemOwner(value)
                }}
            />
        </div>
    );
};

export default Index;