import React from 'react';
import classes from "../../sass/Button.module.sass";

const Button = ({label,onClick=null,type="button"}) => {
  return (
    <button onClick={onClick} type={type} className={classes.btn}>{label}</button>
  )
}

export default Button;