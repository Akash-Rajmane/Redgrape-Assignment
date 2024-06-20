import React, { useState } from 'react';
import classes from "../../sass/Dropdown.module.sass";

const Dropdown = ({ label, options, selectedOption, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleToggle = () => setIsOpen(!isOpen);
    const handleSelect = (option) => {
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div className={classes.custom_dropdown_box} >
            <label>{label}:</label>
            <div className={classes.dropdown} onClick={handleToggle}>
                {selectedOption}
                <span className={classes.arrow}>&#8964;</span>
            </div>
            {isOpen && (
                <div className={classes.dropdown_menu}>
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={classes.dropdown_item}
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
