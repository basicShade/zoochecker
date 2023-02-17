import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'
import cn from 'classnames'
import { ReceiptContext } from '../../context'

const Select = ({
    index,
    onChange,
    placeholder,
    label,
    disabled,
    type = 'text',
    inputClassName,
    name,
    required,
    onFocus,
    onBlur,
    value = ''
  }) => {

  const [ inputValue, setInputValue ] = useState(value)
  const {receipt, setReceipt} = useContext(ReceiptContext)
  const {ownersList, setOwnersList} = useContext(ReceiptContext)
  const {items, setItems} = useContext(ReceiptContext)

  const handleValueChange = (e) => {
    const value = e.target.value
    setInputValue(value)
  }
  // useEffect(_ => {
  //   if (value !== inputValue) {
  //     setInputValue(value)
  //   }
  // }, [value])

  const getKeyByValue = (object, value) => {
    const key = Object.keys(object).find(key => object[key]['value'] === value)
    return key
  }

  return <div>
        <input
        placeholder='Кто платит'
        type={type}
        required={required}
        name={name}
        list='data'
        className={cn(styles.inputField, inputClassName)}
        onChange={e => {
          handleValueChange(e)
        }}
        onFocus={onFocus}
        value={inputValue}
        onBlur={e => {
          {
            const value = e.target.value.toLowerCase()
            items[index]['payer'] = value

            if (value !== '' && getKeyByValue(ownersList, value) === undefined)
              setOwnersList(oldList => [...oldList, {value: value}])
            console.log(items)
          }
        }}
        />
        <datalist id='data'>
          {/* <option>One</option>
          <option>Two</option> */}
          {ownersList.map((op) => <option>{op['value']}</option>)}
        </datalist>
      </div>


}

export default Select
