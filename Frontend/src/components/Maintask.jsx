import React, { useState } from 'react'
import "./Maintask.css"

import Showdata from './Showdata'
import Mydata from './Mydata'
import { useUser } from '../UserContext';
import Addtodos from './Addtodos'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Maintask() {
  const [active ,setactive]=useState(<Showdata/>)
  const { user } = useUser();
  return (
    <div className='main'>
        <div className='left'>
            <h1>NOTES</h1><br/>
            <hr />
            <button className='todoss' onClick={()=>{
              setactive(<Showdata/>)
            }}>Show Notes</button><br/>

            <button className='todoss' onClick={()=>{
              if(!user){
                toast.warning("please login first", {
                  position: 'top-right',
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
                
              }else{
                setactive(<Mydata/>)
              }  
            }}>My Notes</button><br/>

            <button className='todoss' onClick={()=>{
              if(!user){
                toast.warning("please login first", {
                  position: 'top-right',
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }else{
                setactive(<Addtodos/>)
              } 
              
            }}>Add Notes</button><br/>



          </div>
        <div className='right'>
          
          {active}
            
        </div>
      
    </div>
  )
}
