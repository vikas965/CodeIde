import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
const ViewUser = () => {
  const {id} = useParams();
 const [user,setuser]= useState({
    name:"",
    username:"",
    email:""
});


useEffect(()=>{
  loadUser()
})

  const loadUser = async ()=>{
    // const result = await axios.get(`http://localhost:8080/user/${id}`)
    const result = await axios.get(`https://mern-crud-ngi2.onrender.com/user/${id}`)
    setuser(result.data)
  }
  const {name,username,email} = user;
  return (
    <div>
<center>
<h1>{name}</h1>
<h2>{username}</h2>
<h3>{email}</h3>
      
</center>
     
    </div>
  )
}

export default ViewUser
