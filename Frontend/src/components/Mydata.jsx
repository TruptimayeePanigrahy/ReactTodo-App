import React, { useEffect, useState } from 'react'
import "./Mydata.css"
import EditModal from './EditModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../UserContext';
export default function Mydata() {
    const [postdata,setpostdata]=useState([])
    const { user } = useUser();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    console.log(user)

    function edit(post) {
    setSelectedPost(post);
    setIsEditModalOpen(true);
   }
    
    
    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleEditSubmit = (id,updatedPost) => {
        // Send the updated post data to the backend
        console.log("Updated Post:", updatedPost);
        // ... implement update logic ...
        fetch(`https://reactapp-ktfk.onrender.com/post/post/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify(updatedPost)
        })
        .then((res) => res.json())
        .then((data) => {
            //console.log(data);
            toast.success(data.msg, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            fetchdata();
        });
    };


    
    function deletetodos(ele){


        fetch(`https://reactapp-ktfk.onrender.com/post/post/${ele}`,{
            method:"DELETE",
            header:{"content-type":"application/json"}
        })
        .then((res)=>{
            return res.json()
        })
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
            fetchdata()
        })
    }

    function fetchdata(){
        fetch(`https://reactapp-ktfk.onrender.com/post/${user._id}`)
        .then((res)=>res.json())
        .then((data)=>{
            if(data.msg){
                toast.success(data.msg, {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }else{
                setpostdata(data.allpost)
            }
            //console.log(data.allpost)
            
            
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    useEffect(()=>{
        fetchdata()
    },[])
    return (
        <div className='appendcard'>
          {postdata.map(ele => (
            <div key={ele._id} className='card'>
              <h1>{ele.title}</h1>
              <p>{ele.description}</p>
              <div className='bottom1'>
                <button onClick={() => edit(ele)}>Edit</button>
                <button onClick={() => deletetodos(ele._id)}>Delete</button>
              </div>
            </div>
          ))}
          <EditModal
            isOpen={isEditModalOpen}
            onRequestClose={() => setIsEditModalOpen(false)}
            post={selectedPost}
            onSubmit={handleEditSubmit}
          />
        </div>
      );
    }