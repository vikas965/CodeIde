import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams, } from 'react-router-dom'
import { useEffect } from 'react'
const EditUser = () => {

  let navigate = useNavigate();

  const [user ,setuser]= useState({
    name:"",
    username:"",
    email:""
  })

   useEffect(() => {
    
  loadUser();
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  const ChangeInput = (e)=>{
    setuser({
      ...user,
      [e.target.name]:e.target.value
    })

  }

const {id} =useParams();

  const onSubmit= async (e)=>{
    e.preventDefault();
    // await axios.put(`http://localhost:8080/user/${id}`,user)
    await axios.put(`https://mern-crud-ngi2.onrender.com/user/${id}`,user)
    navigate("/")
}

const loadUser = async ()=>{
  // const result = await axios.get(`http://localhost:8080/user/${id}`)
  const result = await axios.get(`https://mern-crud-ngi2.onrender.com/user/${id}`)
  setuser(result.data)
}
  const {name,username,email} = user;
  const Navigatetohome = useNavigate();
  return (
    <div>
        <form action="" onSubmit={onSubmit}>
          <div className="form-inputs-add">
            <h1>Edit User</h1>
          <input name='name' value={name} type="text" placeholder='Name' onChange={ChangeInput} />
          <input name='username' value={username} type="text" placeholder='Username ' onChange={ChangeInput}/>
          <input name='email' value={email} type="email" placeholder='Email' onChange={ChangeInput} />
          <button onClick={()=>Navigatetohome('../')} className="btn btn-danger">Cancel</button>
          <button className='btn btn-primary'>Submit</button>
          </div>
        </form>
      
    </div>
  )
}

export default EditUser
