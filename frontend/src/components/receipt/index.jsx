import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from './styles.module.css'
import PayersList from "../payers-list"
import { getPaiersList } from "../../utils"
import Button from "../button"

const Receipt = ({receipt}) => {

    // let navigate = useNavigate();
    // const routeChange = () =>{
    //   let path = `newPath`;
    //   navigate(path);
    // }
    const navigate = useNavigate();
    const payersList = getPaiersList(receipt)
    console.log(receipt)



    return (
        <div className={styles.receipt}>
            <h3>{receipt.name}</h3>
            <div>
                Дата: {receipt.data.date}<br/>
                Заведение: {receipt.data.merchant_name}
            </div>
            <PayersList className={styles.payers} payersList={payersList} />
            <Button
                className={styles.buttonRight}
                onClick={e => {e.preventDefault(); navigate('/receipts/' + receipt.id)}}
            >Редактировать
            </Button>
            <p>Распределено: {payersList.reduce((a,b) => a + b['total'], 0)} из {receipt.data.total}</p>
        </div>
    )
}

export default Receipt