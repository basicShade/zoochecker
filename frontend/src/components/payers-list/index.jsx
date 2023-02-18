import React from 'react';

const PayersList = ({payersList, className}) => {
    return (
        <div className={className}>
            {payersList.map((i) =>
                <div key={payersList.indexOf(i)}>
                    {payersList.indexOf(i)+1}. {i.label} = {i['total']}
                </div>
            )}
        </div>
    );
};

export default PayersList;