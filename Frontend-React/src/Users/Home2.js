import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom';
import axios from 'axios';

const Home = () => {

  const isLoggedIn = !!localStorage.getItem('token');

//   const { id } = useParams();
const handleLogout = () => {
  // Clear the token from local storage
  localStorage.removeItem('token');
  console.log('Logout successful!');
  // Redirect or perform other actions after successful logout
};


  const [users, setusers] = useState([]);

  useEffect(() => {
    loadusers();
  }, [])

  const loadusers = async () => {
    // const result = await  axios.get("http://localhost:8080/users")
    const result = await axios.get("https://mern-crud-ngi2.onrender.com/users")
    // const resultnew = await result.json();
    setusers(result.data)
    console.log(result.data);
  }

  const deleteUser = async (id) => {
    await axios.delete(`https://mern-crud-ngi2.onrender.com/user/${id}`)
    loadusers();
  }

  return (
    <div className='table-home'>
      <center>
<div className="buttons" style={{display:"flex"}}>
  
<h1 className="text-center"><Link to="/adduser"><button className='btn btn-primary m-3'>Add User</button></Link></h1>
        <h1 className="text-center"><Link to="/Login"><button className='btn btn-primary m-3'>Login</button></Link></h1>
        <h1 className="text-center"><Link to="/addnotes"><button className='btn btn-primary m-3'>Add notes</button></Link></h1>
        <h1 className="text-center"><Link to="/shownotes"><button className='btn btn-success m-3'>Show notes</button></Link></h1>
        {isLoggedIn && <h1 className="text-center"><buttonm onClick={handleLogout} className='btn btn-danger m-3'>Logout</buttonm></h1> }
</div>

        <table className="table table-bordered table-hover text-center" id="table">
          <thead className="thead-dark ">
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Username</th>
              <th scope="col">Name</th>

              <th scope="col">Email</th>

              <th scope="col">Action</th>


            </tr>
          </thead>
          <tbody>

            {
              users.map((eachitem) => {
                const { _id, username, name, email } = eachitem;
                return (
                  <tr key={_id}>
                    <td className>{_id}</td>
                    <td className>{username}</td>
                    <td className>{name}</td>

                    <td className>{email}</td>
                    <td  >

                      <Link to={`/viewuser/${_id}`}> <button className='btn btn-primary mx-3'>View</button> </Link>
                      <Link to={`/edituser/${_id}`}> <button className='btn btn-outline-primary mx-3'>Edit</button> </Link>
                  
                      <button onClick={() => deleteUser(_id)} className='btn btn-danger mx-3'>Delete</button>


                    </td>


                  </tr>
                )
              })
            }


          </tbody>
        </table>

      </center>

    </div>
  )
}

export default Home
