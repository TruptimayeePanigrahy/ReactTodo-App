import React, {  useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'
import { useNavigate ,Link} from 'react-router-dom'
export default function Signup() {
    let navigate=useNavigate()
    const [name,setname]=useState("")
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const [conpass,setconpass]=useState("")

    let handlename=(e)=>{
        setname(e.target.value)
    }

    let handlepassword=(e)=>{
        setpassword(e.target.value)
    }

    let handleemail=(e)=>{
        setemail(e.target.value)
    }

    let handleconpass=(e)=>{
        setconpass(e.target.value)
    }
    
    let takecare=(event)=>{
        event.preventDefault();
        if(password===conpass){
            let obj={
                name,
                email,
                password
            }
            console.log(obj)
            fetch("https://reactapp-ktfk.onrender.com/user/register",{
                method:"POST",
                headers:{
                "content-type":"application/json"
                },
                body:JSON.stringify(obj)
                })
                .then((res)=>res.json())
                .then((data)=>{
                    toast.success(data.msg, {
                        position: 'top-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                    navigate("/login")
                })
            
        }else{
            alert("not match password and conform password")
        }
    }
    
  return (
    <div className='main'>
        <h1 style={{color:"white",margin:"30px",borderBottom:"1px solid #058665"}}>Signup Here !!</h1>
      <form onSubmit={takecare} >
        <label>
            
            <input type="text" value={name} onChange={handlename} placeholder='Enter your name'/>
           
        </label>
        <label>
            
            <input type="email" value={email} onChange={handleemail} placeholder='Enter your Email'/>
            
        </label>
        <label>
            
            <input type="password" value={password} onChange={handlepassword} placeholder='Enter your Password'/>
            
        </label>
        <label>
            
            <input type="text" value={conpass} onChange={handleconpass} placeholder='Conform your password'/>
            
        </label>
        <input type="Submit" />
        <br/><br/>
        <p>Already user ? <Link to="/Login" style={{color:"#058665"}}>click here</Link></p>
      </form>
      
    </div>
  )
}
