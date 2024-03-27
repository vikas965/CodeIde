import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const AddUser = () => {

  let navigate = useNavigate();

  const [user ,setuser]= useState({
    name:"",
    username:"",
    email:"",
    password:""
  })

  const ChangeInput = (e)=>{
    setuser({
      ...user,
      [e.target.name]:e.target.value
    })

  }


  const onSubmit= async (e)=>{
    e.preventDefault();
    // await axios.post("http://localhost:8080/user",user)
    await axios.post("https://mern-crud-ngi2.onrender.com/user",user)
    navigate("/")
}
  const {name,username,email,password} = user;
  // const Navigatetohome = useNavigate();
  return (
    <div>
        <form style={{marginTop:"50px"}} action="" onSubmit={onSubmit}>
          <div className="form-inputs-add">
            <h1 style={{color:"whitesmoke"}}>Register</h1>
          <input className='inp' name='name' value={name} type="text" placeholder='Name' onChange={ChangeInput} />
          <input  className='inp' name='username' value={username} type="text" placeholder='Username ' onChange={ChangeInput}/>
          <input  className='inp' name='email' value={email} type="email" placeholder='Email' onChange={ChangeInput} />
          <input  className='inp' name='password' value={password} type="password" placeholder='password' onChange={ChangeInput} />
          {/* <button onClick={()=>Navigatetohome('../')} className="btn btn-danger">Cancel</button> */}
          <button className='btn btn-primary'>Register</button>
          </div>
        </form>
      
    </div>
  )
}

export default AddUser
