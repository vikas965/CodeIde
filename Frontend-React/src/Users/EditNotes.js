import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams, } from 'react-router-dom'
import { useEffect } from 'react'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddNotes = () => {
    let navigate = useNavigate();

    const [notes , setnotes] = useState({
        id:"",
        title:"",
        content:""

    })

    const {id} =useParams();

    const loadNotes = async ()=>{
      // const result = await axios.get(`http://localhost:8080/user/${id}`)
      const token = localStorage.getItem('token');
      const result = await axios.get(`https://mern-crud-ngi2.onrender.com/note/${id}`,{
        headers: {
          Authorization: `${token}`,
        }
      })
      setnotes(result.data)
    }

    useEffect(() => {
    
      loadNotes();
        
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

    const ChangeInput = (e)=>{
        setnotes({
          ...notes,
          [e.target.name]:e.target.value
        })
    
      }

   
      
    
   
  
  
      const onSubmit= async (e)=>{
        e.preventDefault();
        const token = localStorage.getItem('token');
        // await axios.put(`http://localhost:8080/user/${id}`,user)
        await axios.put(`https://mern-crud-ngi2.onrender.com/notesupdate/${id}`,notes,{
          headers: {
            Authorization: `${token}`,
          }
        })
        toast("Edited Succesfully!");
        navigate("/")
    }
    const {title,content} = notes;
    // const Navigatetohome = useNavigate();
    return (
      <div>
          <form action="" onSubmit={onSubmit}>
            <div className="form-inputs-add">
              <h1 style={{color:"whitesmoke"}}>Edit Notes</h1>
            <input className='inp' style={{outline:"0",boxShadow:"none",borderRadius:"7px"}} name='title' value={title} type="text" placeholder='Title' onChange={ChangeInput} />
            <textarea className='inp' style={{outline:"0",boxShadow:"none",padding:"7px", borderRadius:"8px"}} name="content" value={content} onChange={ChangeInput} id="" cols="30" rows="10"> </textarea>
           
            
            {/* <button onClick={()=>Navigatetohome('../')} className="btn btn-danger">Cancel</button> */}
            <button className='btn btn-primary'>Edit Notes</button>
            </div>
          </form>
        
      </div>
    )
  }

export default AddNotes
