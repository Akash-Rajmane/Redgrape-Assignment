import React, { useState, useId } from 'react';
import classes from "../../sass/Checkbox.module.sass";

const Checkbox = ({allChecked=false,cb=null,onClick}) => {
  const [isChecked,setIsChecked] = useState(false);
  const cbId = useId();

  const checkboxHandler = (e) => {
    setIsChecked(e.target.checked);
    if(cb){
      cb();
    }
  }
  
  return (
    <label className={classes.checkbox_container} id={cbId} onClick={onClick}>
      <input type="checkbox" checked={allChecked||isChecked} onChange={checkboxHandler} />
      <span className={classes.checkmark}></span>
    </label>
  )
}

export default Checkbox;