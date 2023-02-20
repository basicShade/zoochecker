import React from 'react';
import styles from './styles.module.css'

const PayersList = ({payersList, className}) => {
    return (
        <div className={className}>Кто сколько платит:
            {payersList
                ? payersList.map((i) =>
                    <ol key={payersList.indexOf(i)}>
                        {payersList.indexOf(i)+1}. {i.value} = {i['total']}
                    </ol>
            
                )
                : ''
            }
        </div>
    );
};

export default PayersList;