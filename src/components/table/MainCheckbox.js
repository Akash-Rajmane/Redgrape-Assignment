import React, { useId } from 'react';
import classes from "../../sass/Checkbox.module.sass";

const MainCheckbox = ({allChecked=false,onChange}) => {
  const cbId = useId();
  
  return (
    <label className={classes.checkbox_container} id={cbId}>
      <input type="checkbox" checked={allChecked} onChange={onChange} />
      <span className={classes.checkmark}></span>
    </label>
  )
}

export default MainCheckbox;