import { useState, useContext } from 'react'
import { CreatableSelect } from '../../components'
import { ReceiptContext } from '../../context'
import { range } from '../../utils'
import styles from './styles.module.css'
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';

const Item = ({obj}) => {

    const index = obj[0]
    const item = obj[1]
    const [selectCnt, setSelectCnt] = useState(item.payers.length ? item.payers.length-1 : 0)   // счетчик количества select блоков
    const { items, setItems, setIsSaved, setIsUpdated } = useContext(ReceiptContext)

    return (
        <span>
            
            <div className={styles.item}>
                <div className={styles.itemDesc}>
                    {Number(index)+1}.
                    <EditText
                        type='string' inline
                        style={{width: '95%', whiteSpace: 'pre-wrap'}}
                        placeholder='название...'
                        defaultValue={item['description']}
                        onSave={(n)=>{item['description']=n.value; setIsSaved(false)}}
                    />
                </div>
                <EditText
                    type="number" inline
                    style={{width: '30px', paddingRight: '20px'}}
                    defaultValue={item['qty'] ? String(item['qty']) : String(1)}
                    onSave={(n)=>{item['qty']=n.value; setIsSaved(false)}}
                />
                <div>
                    <EditText
                        type="number" inline
                        style={{width: '50px'}}
                        defaultValue={String(item['amount'])}
                        placeholder={String(0)}
                        onSave={(n)=>{item['amount']=n.value; setIsUpdated(false)}}
                    /><span style={{paddingRight: '20px'}}>Р</span>
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
                <button
                    style={{position: 'relative', top: '-8px', left: '5px'}}
                    onClick={(e) => {
                        e.preventDefault()
                        setItems(items.filter(item => item !== items[index]))
                        setIsUpdated(false)
                    }}
                >X</button>
            </div>
            
        </span>
    );
};

export default Item;