import React, {useId} from 'react';
import classes from "../../sass/Input.module.sass";


const Input = ({label,placehoder="",value,onChange,type="text",name}) => {
    const inputId = useId() + label;

  return (
    <div className={classes.input_box}>
       <label htmlFor={inputId}>{label}:</label>
       <input type={type} id={inputId} value={value} placeholder={placehoder} onChange={onChange} name={name}/>
    </div>
  )
}

export default Input;