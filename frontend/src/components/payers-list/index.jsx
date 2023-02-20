import React from 'react';
import styles from './styles.module.css'

const PayersList = ({payersList, className}) => {
    return (
        <div>
            {payersList.length
                ? <div className={className}>Кто сколько платит:
                    {payersList.map((i) =>
                        <ol key={payersList.indexOf(i)}>
                            {payersList.indexOf(i)+1}. {i.value} = {i['total']}
                        </ol>
                    )}
                 </div>
                : ''
            }
        </div>
    );
};

export default PayersList;