import React, { useEffect, useState } from 'react';
import classes from "../../sass/ContactForm.module.sass";
import Input from "./Input";
import Button from './Button';
import Dropdown from './Dropdown';
import FileInput from './FileInput';
import { formatDateTimeLocal,dateTimeLocalToTimestamp } from '../../utils/functions';

const ContactForm = ({isEditMode,contact,setContacts,data,setIsEditMode}) => {
  const [form,setForm] = useState({
    contact_name: "",
    contact_address: "",
    contact_number: "",
    created_on :"",
    contact_notes: ""
  });
  const [selectedOption, setSelectedOption] = useState("");
  const [file, setFile] = useState(null);


  useEffect(()=>{
    if(isEditMode){
      const {contact_name,contact_address,contact_number,created_on,contact_notes,contact_status,contact_pic} = contact;
      const formatted_created_on = formatDateTimeLocal(created_on);
      setForm({
        contact_name,
        contact_address,
        contact_number,
        created_on:formatted_created_on,
        contact_notes
      })
      setSelectedOption(contact_status);
      setFile(contact_pic);
    }
  },[isEditMode,contact])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  }

  const dropdownChangeHandler = (option) => {
    setSelectedOption(option);
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const handleProfilePicUpload = async (contactId) => {
      if (file) {
        const formData = new FormData();
        formData.append('contact_id', contactId);
        formData.append('photo', file);
  
        const res = await fetch('https://demobackend.web2.99cloudhosting.com/profile_pic/add_contact_pic', {
          method: 'POST',
          body: formData
        });
  
        if (!res.ok) {
          throw new Error('Failed to upload profile picture');
        }
      }
    };

    if(isEditMode){
      try{
        const res = await fetch(`https://demobackend.web2.99cloudhosting.com/user/update_contact_details`,{
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify({
            id: contact.id,
            contact_name: form.contact_name,
            contact_address: form.contact_address,
            contact_number: form.contact_number,
            created_on: dateTimeLocalToTimestamp(form.created_on),
            contact_notes: form.contact_notes,
            contact_status: selectedOption,
            contact_pic: file 
          })
        });

        if(res.ok){
          await handleProfilePicUpload(contact.id);
          const jsonData = await res.json();
          const { apiresponse: {message}} = jsonData;
          const newContacts = data.map(el=>{
            if(el.id===contact.id){
              return {
                ...el,
                contact_name: form.contact_name,
                contact_address: form.contact_address,
                contact_number: form.contact_number,
                created_on: dateTimeLocalToTimestamp(form.created_on),
                contact_notes: form.contact_notes,
                contact_status: selectedOption,
                contact_pic: file 
              }
            }
            return el;
          });
          setContacts(newContacts);
          alert(message);
          setIsEditMode(false);
          setForm({
            contact_name: "",
            contact_address: "",
            contact_number: "",
            created_on :"",
            contact_notes: ""
          })
          setSelectedOption("");
          setFile(null);
        }
      }catch(err){
        console.error(err);
        alert(err);
      }
    }else{
      try {
        
        const newContact = {
          contact_name: form.contact_name,
          contact_address: form.contact_address,
          contact_number: form.contact_number,
          created_on: dateTimeLocalToTimestamp(form.created_on),
          contact_notes: form.contact_notes,
          contact_status: selectedOption, 
          contact_pic: file
        }

        const res = await fetch('https://demobackend.web2.99cloudhosting.com/user/add_contact', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify(newContact)
        });
  
        if (res.ok) {
          const jsonData = await res.json();
          const id = jsonData.record.id;
          await handleProfilePicUpload(id);
          const updatedRes  = await fetch("https://demobackend.web2.99cloudhosting.com/user/list_contacts");
          if(updatedRes.ok){
            const {record: updatedContacts} = await updatedRes.json();
            setContacts(updatedContacts);
            alert("New contact added successfully!");
            setForm({
              contact_name: "",
              contact_address: "",
              contact_number: "",
              created_on :"",
              contact_notes: ""
            })
            setSelectedOption("");
            setFile(null);
          }
          
        }
      } catch (err) {
        console.error(err);
        alert(err);
      }
    }

  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.form_header}>
        <h4 className={classes.form_title}>{isEditMode ? "Update Contact Card" :"Add New Contact Card"}</h4>
      </div>
      <div className={classes.form_body}>
        <div className={classes.input_container}>
        <Input type="text" label="Name" name="contact_name" value={form.contact_name} onChange={handleInputChange} />
        <Input type="text" label="Address" name="contact_address" value={form.contact_address} onChange={handleInputChange} />
        </div>
        <div className={classes.input_container}>
        <Input type="tel" label="Number" name="contact_number" value={form.contact_number} onChange={handleInputChange} />
        <Input type="datetime-local" label="Created On" name="created_on" value={form.created_on} onChange={handleInputChange} />
        </div>
        <div className={classes.input_container}>
          <Dropdown label={"Contact Status"} onChange={dropdownChangeHandler} selectedOption={selectedOption} options={["ACTIVE","INACTIVE"]}/>
          <Input type="text" label="Notes" name="contact_notes" value={form.contact_notes} onChange={handleInputChange} />
        </div>
      </div>
      <div className={classes.form_footer}>
        <div className={classes.file_input_box}>
          <FileInput label={"Attachment File"} onChange={handleFileChange} name="attach file" initialFileName={file ? file.name || file : ""}/>
        </div>
        <Button label={isEditMode ? "Update" : "Submit"} type="submit"/>
      </div>
    </form>
  )
}

export default ContactForm;