import React, { useState } from 'react'
import Checkbox from './Checkbox';
import MainCheckbox from './MainCheckbox';
import classes from "../../sass/Table.module.sass";
import { DeleteIcon } from '../../assets';
import ProfilePic from "../../assets/profile-photo.jpg"
import { dateConversion } from '../../utils/functions';

const Table = ({ data, setContact, modalOpener }) => {
    const [allChecked, setAllChecked] = useState(false);
    const headings = ["Contact Pic", "Name & Address", "Number", "Created On", "Contact Status", "Notes", "Delete"];

    const checkboxHandler = (e) => {
        setAllChecked(e.target.checked);
    }

    const handleRowClick = (e, el) => {
        e.stopPropagation();
        setContact(el);
    }

    const handleDeleteClick = (e, id) => {
        e.stopPropagation();
        modalOpener(id);
    }

    const handleCheckboxClick = (e) => {
        e.stopPropagation();
    }

    return (
        <div className={classes.table_container}>
            <table className={classes.table}>
                <thead className={classes.headings}>
                    <tr>
                        <th className={classes.center+" "+classes.cb}><MainCheckbox allChecked={allChecked} onChange={checkboxHandler} /></th>
                        {headings.map((el, idx) => {
                            return (
                                <th key={idx + 1} className={el === "Delete" ? classes.center : ""}>{el}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.map((el) => {
                        const date = dateConversion(el.created_on);

                        return (
                            <tr key={el.id} onClick={(e) => handleRowClick(e, el)}>
                                <td className={classes.center+" "+classes.cb}><Checkbox allChecked={allChecked} onClick={handleCheckboxClick}/></td>
                                <td><img src={el.contact_pic || ProfilePic} alt="profile pic" width={"40px"} height={"40px"} className={classes.timage} /></td>
                                <td><p>{el.contact_name}</p><p>{el.contact_address}</p></td>
                                <td>{el.contact_number}</td>
                                <td><p>{date[0]} |</p><p>{date[1]}</p></td>
                                <td>{el.contact_status}</td>
                                <td>{el.contact_notes}</td>
                                <td className={classes.center}><DeleteIcon strokeColor={"#702963"} onClick={(e) => handleDeleteClick(e, el.id)}  /></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Table;
