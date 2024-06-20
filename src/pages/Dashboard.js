import React, {useState} from 'react'
import ContactCard from '../components/contact-card/ContactCard';
import ContactForm from '../components/contact-form/ContactForm';
import classes from "../sass/Dashboard.module.sass";
import Table from '../components/table/Table';
import Modal from '../components/modal/Modal';

const Dashboard = ({data,setContacts,contact,setContact}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showModal,setShowModal] = useState(false);
  const [delId,setDelId] = useState(null);
  const [delName,setDelName] = useState("");
 

  const deleteHandler = async (id) => {
    try{
      const res = await fetch('https://demobackend.web2.99cloudhosting.com/user/delete_contact',{
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify({ contact_id:id })
      });

      if(res.ok){
        const newData = data.filter(el=>el.id!==id);
        setContacts(newData);
        alert("Contact deleted successfully!");
      }
    }catch(err){
      console.log(err);
      alert(err);
    }
    setShowModal(false);
  } 

  const modalOpener = (id) => {
    setShowModal(true);
    setDelId(id);
    const {contact_name} = data.filter(el=>el.id===id)[0];
    setDelName(contact_name);
  }

  const modalCloser = () => {
    setShowModal(false);
    setDelId(null);
    setDelName("");
    return;
  }

  return (
    <div>
      {showModal && <Modal name={delName} delId={delId} onDelete={deleteHandler} onCancel={modalCloser}/>}
      <div className={classes.container}>
        <ContactCard contact={contact} setIsEditMode={setIsEditMode} modalOpener={modalOpener}/>
        <ContactForm isEditMode={isEditMode} setIsEditMode={setIsEditMode} contact={contact} data={data} setContacts={setContacts}/>
      </div>
      <Table data={data} setContact={setContact} deleteHandler={deleteHandler} modalOpener={modalOpener}/>
    </div>
  )
}

export default Dashboard;