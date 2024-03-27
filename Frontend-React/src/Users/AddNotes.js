import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import '../index.css'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useEffect } from 'react'
const AddNotes = () => {
    let navigate = useNavigate();

    const isLoggedIn = localStorage.getItem('token');
    
    console.log(isLoggedIn);
    

    useEffect(() => {
      if (!isLoggedIn || isLoggedIn === undefined) {
        navigate('/');
      }
    }, [isLoggedIn, navigate]);
    const [notes , setnotes] = useState({
        title:"",
        content:""
    })   
    const ChangeInput = (e)=>{
        setnotes({
          ...notes,
          [e.target.name]:e.target.value
        })
    
      }
      const onSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        // console.log('Token:', token);
        // console.log('Notes:', notes);
      
        try {
          await axios.post("https://mern-crud-ngi2.onrender.com/user/add", notes, {
            headers: {
              Authorization: `${token}`,
            }
          });
          toast("Notes Added!");
          console.log('Notes added successfully!');
          navigate("/");
        } catch (error) {
          console.error('Error adding notes:', error);
        }
      };
      
    const {title,content} = notes;
    // const Navigatetohome = useNavigate();
    return (
      <div>
          <form action="" onSubmit={onSubmit}>
            <div className="form-inputs-add">
              <h1 style={{color:"whitesmoke"}}>Add Notes</h1>
            <input className='inp' style={{outline:"0",boxShadow:"none", borderRadius:"7px"}} name='title' value={title} type="text" placeholder='Title' onChange={ChangeInput} />
            <textarea className='inp' style={{outline:"0",boxShadow:"none",padding:"7px", borderRadius:"8px"}} name="content" value={content} onChange={ChangeInput} id="" cols="30" rows="10"> </textarea>
           
            
            {/* <button onClick={()=>Navigatetohome('../')} className="btn btn-danger">Cancel</button> */}
            <button className='btn btn-primary'>Add notes</button>
            </div>
          </form>
        
      </div>
    )
  }

export default AddNotes
