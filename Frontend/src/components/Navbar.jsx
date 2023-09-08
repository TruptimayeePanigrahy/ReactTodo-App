import React from 'react'
import "./Navbar.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../UserContext';
import { Link } from 'react-router-dom'
export default function Navbar() {
    const { user,setUser } = useUser();
    const logout=()=>{
      fetch("https://reactapp-ktfk.onrender.com/user/logout")
        .then((res)=>res.json())
        .then((data)=>{
            if(data.msg==="logout successfull"){
              toast.success(data.msg, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
                setUser(null)
            }
        })
        .catch((error)=>{
            console.log(error)
        }) 
    }
  return (
    <div className='navbar'>
      <div className='name'>
        <h1>NOTES APP</h1>
      </div>
      <div className='content'>
        <Link to="/" style={{textDecoration:"none"}}><h3>Home</h3></Link>
        
        <h3>Profile</h3>
        {user?(<button id='logout'onClick={logout}><h3>Logout</h3></button>):(<Link to="/login" style={{textDecoration:"none"}}><h3>LogIn/Signup</h3></Link>)}
        
      </div>
    </div>
  )
}
