import React, { useState } from 'react'
import { useUser } from '../UserContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
export default function Login() {
    let navigate=useNavigate()
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const { setUser } = useUser();
    const handleemail=(e)=>{
        setemail(e.target.value)
    }
    const handlepass=(e)=>{
        setpassword(e.target.value)
    }
    const submitdetalis=(e)=>{
        e.preventDefault();
        let obj={
            email,
            password
        }
        fetch("https://reactapp-ktfk.onrender.com/user/login",{
          method:"POST",
          headers:{
            "content-type":"application/json"
          },
          body:JSON.stringify(obj)
        })
        .then((res)=>res.json())
        .then((data)=>{
          if (data.userdetails) {
            console.log(data)
            
            setUser(data.userdetails); 
            toast.success(data.msg, {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            
            navigate('/');
          } else {
            toast.error(data.msg, {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        })
        .catch((error)=>{
          console.log(error)
          alert(error.msg)
        })
    }
  return (
    <div className='main123'>
      
     
      <form onSubmit={submitdetalis}>
       <h1 style={{color:"white"}} className='heading' >Login Here !!</h1>
        <lebel>
           
            <input type="email" value={email} onChange={handleemail} placeholder=' Enter your email'/>
            <h1>{email}</h1>
            
        </lebel>
        <lebel>
            
            <input type="password" value={password} onChange={handlepass} placeholder=' Enter your password'/>
            
        </lebel>
        <input type="submit" value={"Login"}  />
        <br/><br/>
        <p style={{fontSize:"18px"}}>New user?  <Link to="/Signup" style={{color:"#058665"}}>Signup</Link></p>
        
      </form>
      
      

    </div>
  )
}
