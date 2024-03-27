import React, { useEffect, useState } from 'react'
// import { Link} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
const Shownotes = () => {
    const isLoggedIn = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear the token from local storage
        localStorage.removeItem('token');
        navigate('/login');
        toast("Logout successful!");
        console.log('Logout successful!');
        // Redirect or perform other actions after successful logout
      };
  
    const [notes, shownotes] = useState([]);
    // const id = '65e1adf5f6b920c3ef38603f';
    useEffect(() => {
        loadnotes();
    }, [])

    useEffect(() => {
        if (!isLoggedIn) {
          // If user is not logged in, navigate to the login page
          navigate('/login');
        }
      }, [isLoggedIn, navigate]);
    const loadnotes = async () => {
        try {
            const token = localStorage.getItem('token');
            const result = await axios.get(`https://mern-crud-ngi2.onrender.com/notes`,{
                headers: {
                  Authorization: `${token}`,
                }
              });
            console.log("Received data:", result.data);
    
            // Ensure result.data is an array before updating state
            if (Array.isArray(result.data)) {
                shownotes(result.data);
            } else {
                console.error("Invalid data format received:", result.data);
            }
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    }
    
    
    
    const deletenotes = async (id) => {
        const token = localStorage.getItem('token');
        await axios.delete(`https://mern-crud-ngi2.onrender.com/noteseach/${id}`,{
            headers: {
              Authorization: `${token}`,
            }
          })
        toast('Notes deleted successfully!');
        loadnotes();
      }


    return (
        <div className="container-main">
            <ToastContainer />
            <div className='table-home'>
      <center>
        <div className="buttons" style={{ display: "flex" }}>
          {/* <h1 className="text-center"><Link to="/adduser"><button className='btn btn-primary m-3'>Add User</button></Link></h1> */}
          <h1 className="text-center"><Link to="/addnotes"><button className='btn btn-primary m-3'>Add notes</button></Link></h1>
          {/* <h1 className="text-center"><Link to="/shownotes"><button className='btn btn-success m-3'>Show notes</button></Link></h1> */}
          {isLoggedIn && <h1 className="text-center"><button onClick={handleLogout} className='btn btn-danger m-3'>Logout</button></h1>}
        </div>
      </center>
    </div>
            <div className='notes-container' >
                {
                    notes.map((eachitem) => {
                        const { _id, title, content } = eachitem;
                        return (

                            <div className="eachnotes" key={_id}>

                                <div className="title-icons">
                                    <div className="title">
                                    <h5 style={{textTransform:"capitalize",color:"rgb(0,0,0,0.8)"}} className="title">{title}</h5>
                                    </div>

                                    <div className="icons">
                                    <Link to={`/editnotes/${_id}`}> <i style={{color:"lightseagreen"}} className="fa-regular fa-pen-to-square"></i></Link>     
                                        <i  onClick={() => deletenotes(_id)} style={{color:"red"}} className="fa-regular fa-trash-can"></i>
                                        
                                    </div>

                                </div>
                               
                                <div className="content">
                                    <p>{content}</p>
                                </div>


                            </div>


                        )
                    })
                }

            </div>
        </div>
    )
}

export default Shownotes
