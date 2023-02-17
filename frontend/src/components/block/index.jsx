import React from "react";


import s from './styles.module.css'
import cn from 'classnames'

const MyBlock = ({className}) => {

    return (
        <div className={cn(s.block, className)}>
            sdfsdf
        </div>
  )
}

export default MyBlock
