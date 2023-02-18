import { useState } from 'react'
import { CreatableSelect } from '../../components'
import { ReceiptContext } from '../../context'
import { range } from '../../utils'
import styles from './styles.module.css'

const Item = ({obj}) => {

    const index = obj[0]
    const item = obj[1]
    const [selectCnt, setSelectCnt] = useState(0)   // счетчик количества select блоков

    return (
        <div className={styles.item}>
            <div className={styles.itemDesc}>
                {index}. {item['description']}
            </div>
            <div className={styles.itemQty}>
                {item['qty'] ? item['qty'] : 1} 
            </div>
            <div className={styles.itemAmt}>
                {item['amount']}Р  
            </div>
            <div className={styles.inputField}>
                {range(0, selectCnt).map(i =>
                    <CreatableSelect
                        key={i}
                        index={i}
                        item_index={index}
                        ReceiptContext={ReceiptContext}
                    />
                )}
                <button
                    style={{float: 'right'}}
                    onClick={e => {
                        e.preventDefault()
                        setSelectCnt(selectCnt+1)
                    }}
                >Share</button>
            </div>
        </div>
    );
};

export default Item;