import React, { useState, useContext } from 'react';
import CreatableSelect from 'react-select/creatable';
import { getPaierTotal, updatePaiersTotals } from '../../utils';
import styles from './styles.module.css';
// interface Option {
//   readonly label: string;
//   readonly value: string;
// }

const createOption = (label) => ({
  label,
  value: label.toLowerCase()//.replace(/\W/g, ''),
});

const PayerSelect = ({index, item_index, ReceiptContext}) => {
  const [value, setValue] = useState()//<Option & null>()
  const [isLoading, setIsLoading] = useState(false);
  const {
    items, setItems, paiersList, setPaiersList, total, setTotal
  } = useContext(ReceiptContext)

  const handleCreate = (inputValue) => {
    setIsLoading(true);
    const newOption = createOption(inputValue);
    setValue(newOption);

    paiersList[paiersList.length] = newOption
    items[item_index]['payers'][index] = newOption

    setTotal(updatePaiersTotals(paiersList, items))
    setIsLoading(false);
  };

  const handleChange = (newValue) => {
    setIsLoading(true);
    setValue(newValue)

    if (newValue) {items[item_index]['payers'][index] = newValue}
    else {items[item_index]['payers'][index]=null}

    setTotal(updatePaiersTotals(paiersList, items))
    setIsLoading(false)
  }

  return (
    <CreatableSelect
      className={styles.inputField}
      isClearable
      isDisabled={isLoading}
      isLoading={isLoading}
      onChange={handleChange}
      onCreateOption={handleCreate}
      options={paiersList}
      value={value}
    />
  );
};

export default PayerSelect