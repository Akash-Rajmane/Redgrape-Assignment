
import classes from "./sass/App.module.sass";
import {  Routes, Route } from "react-router-dom";
import Sidebar from './components/sidebar/Sidebar';
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { useEffect, useState } from "react";

function App() {
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState({});
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    const fetchContacts = async () => {
      try{
        const res  = await fetch("https://demobackend.web2.99cloudhosting.com/user/list_contacts");
        
        if(res.ok){
          const {record} = await res.json();
          setContacts(record);
          setContact(record[0]);
        }
      }catch(err){
        console.error(err);
      }
      setLoading(false);
    }

    fetchContacts();
  },[])

  useEffect(()=>{
    setContact(contacts[0]);
  },[contacts])



  return (
    <div className={classes.app}>
      <Sidebar/>
      <main className={classes.page}>
        { loading ? <>...Loading</> :
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/dashboard" element={<Dashboard data={contacts} setContacts={setContacts} contact={contact} setContact={setContact}/>}/>
          </Routes> 
        }
      </main>
    </div>
  );
}

export default App;
