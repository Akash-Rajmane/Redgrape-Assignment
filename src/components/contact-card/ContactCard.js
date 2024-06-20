import React from 'react';
import classes from "../../sass/ContactCard.module.sass";
import ProfilePic from "../../assets/profile-photo.jpg";
import { PencilIcon, DeleteIcon } from '../../assets';
import { convertToDMY, dateConversion } from '../../utils/functions';


const ContactCard = ({contact,setIsEditMode,modalOpener}) => {
  const {id,contact_name,contact_address,contact_number,created_on,contact_status,contact_notes,contact_pic} = contact;
  const [date,time] = dateConversion(created_on);
  const checkInDate = convertToDMY(date);


  return (
    <div className={classes.card}>
      <div className={classes.card_header}>
        <h4 className={classes.card_title}>Conatct Card</h4>
        <img src={contact_pic||ProfilePic} alt="contact img" className={classes.card_image}/>
      </div>
      <div className={classes.card_body}>
        <p><span className={classes.card_text}>Name:</span><span className={classes.card_subtext}>{contact_name}</span></p>
        <p><span className={classes.card_text}>Address:</span><span className={classes.card_subtext}>{contact_address}</span></p>
        <p><span className={classes.card_text}>Number:</span><span className={classes.card_subtext}>{contact_number}</span></p>
        <p><span className={classes.card_text}>Created On:</span><span className={classes.card_subtext}>{date+" | "+time}</span></p>
        <p><span className={classes.card_text}>Contact Status:</span><span className={classes.card_subtext}>{contact_status}</span></p>
        <p><span className={classes.card_text}>Notes:</span><span className={classes.card_subtext}>{contact_notes}</span></p>
      </div>
      <div className={classes.card_footer}>
        <p><span>Ckeck-in:</span><span className={classes.card_subtext}>{checkInDate+" "+time}</span></p>
        <div className={classes.btns}>
          <DeleteIcon onClick={()=>modalOpener(id)}/>
          <img src={PencilIcon} alt="pencil icon" width={"24px"} height={"24px"} onClick={()=>setIsEditMode(true)}/>
        </div>
      </div>
    </div>
  )
}

export default ContactCard;