import React, { useState, useContext } from 'react';
import CreatableSelect from 'react-select/creatable';
import { getPaiersList, getPaierTotal, updatePaiersTotals } from '../../utils';
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
  const {items, paiersList, setPaiersList, total, setTotal, setIsSaved, setIsUpdated } = useContext(ReceiptContext)
  // console.log(items[item_index])
  // console.log(items[item_index]['payers'])
  const [value, setValue] = useState(paiersList.find(i => i.value === items[item_index]['payers'][index]))//<Option & null>()
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = (inputValue) => {
    setIsLoading(true);
    const newOption = createOption(inputValue);
    setValue(newOption);

    paiersList[paiersList.length] = newOption
    items[item_index]['payers'][index] = newOption['value']
    setIsUpdated(false)
    setIsLoading(false)
  };

  const handleChange = (newValue) => {
    setIsLoading(true);
    setValue(newValue)
    // console.log(newValue)
    if (newValue) {items[item_index]['payers'][index] = newValue['value']}
    else {items[item_index]['payers'][index]=null}
    // setTotal(updatePaiersTotals(paiersList, items))
    // setPaiersList([...paiersList])
    setIsUpdated(false)
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
      // defaultValue={{label: 'hacha', value: 'hachik'}}
      // defaultInputValue={value}
    />
  );
};

export default PayerSelect