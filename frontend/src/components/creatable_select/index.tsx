import React, { useState, useContext, useEffect } from 'react';
import { ReceiptContext } from '../../context'
import CreatableSelect from 'react-select/creatable';
import styles from './styles.module.css';

interface Option {
  readonly label: string;
  readonly value: string;
}

const getOwnerTotal = (owner, items) => {
  let ownerTotal = 0

  items.map((item) => {
      var count = {}
      var byOwner = item['payers'].map((e, i) => e === owner ? i : '').filter(String)
      var byAnyone = item['payers'].map((e, i) => e !== null ? i : '').filter(String)
      var itemCost = item['amount'] * byOwner.length / byAnyone.length
      if (itemCost) ownerTotal = ownerTotal + itemCost
  })
  return Math.ceil(ownerTotal)
}

const createOption = (label: string) => ({
  label,
  value: label.toLowerCase()//.replace(/\W/g, ''),
});

const getKeyByValue = (object, value) => {
  const key = Object.keys(object).find(key => object[key]['value'] === value)
  return key
}

export default ({index, item_index}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState<Option & null>();

  const {ownersList, setOwnersList} = useContext(ReceiptContext)
  const {items, setItems} = useContext(ReceiptContext)
  const {total, setTotal} = useContext(ReceiptContext)



  const handleCreate = (inputValue: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const newOption = createOption(inputValue);
      setIsLoading(false);
      setOwnersList((prev) => [...prev, newOption]);
      setValue(newOption);
      if (!items[item_index]['payers'].length) setTotal(total + items[item_index]['amount'])
      items[item_index]['payers'][index] = newOption
      newOption['total'] = getOwnerTotal(newOption, items)
      ownersList.map((payer) => payer['total']=getOwnerTotal(payer, items))
    }, 200);
  };

  return (
    <CreatableSelect
      className={styles.inputField}
      isClearable
      isDisabled={isLoading}
      isLoading={isLoading}
      onChange={(newValue) => {
        setValue(newValue)

        setOwnersList((prev) => [...prev])
        if (newValue) {
          items[item_index]['payers'][index] = newValue
        }
        else {items[item_index]['payers'][index]=null}//.splice(index,1)}

        let temp_total = 0
        ownersList.map((payer) => {
          payer['total']=getOwnerTotal(payer, items)
          temp_total = temp_total + payer['total']
        })
        console.log(ownersList)
        console.log(items)
        setOwnersList((prev) => [...prev])
        setTotal(temp_total)

      }}
      
      onCreateOption={handleCreate}
      options={ownersList}
      value={value}
    />
  );
};