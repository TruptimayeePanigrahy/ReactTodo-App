import React, { useEffect, useState } from 'react';
import "./showcard.css";
import FavoriteIcon from '@mui/icons-material/Favorite';
import SmsIcon from '@mui/icons-material/Sms';

import { useUser } from '../UserContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Showdata() {
    const { user } = useUser();
    const [postdata, setpostdata] = useState([]);
    const [selectedCards, setSelectedCards] = useState({});
    const [favoriteCounts, setFavoriteCounts] = useState({}); 

    useEffect(() => {
        fetch("https://reactapp-ktfk.onrender.com/post/allpost")
            .then((res) => res.json())
            .then((data) => {
                setpostdata(data.allpost);
                initializeFavoriteCounts(data.allpost);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const initializeFavoriteCounts = (allPosts) => {
        const initialCounts = {};
        allPosts.forEach((post) => {
            initialCounts[post._id] = post.likesCount || 0;
        });
        setFavoriteCounts(initialCounts);
    };

    const toggleFavorite = (postId) => {
        console.log(user,postId)
        if (!user) {
          try {
                toast.warning("Please Login first", {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } catch (error) {
                console.error(error);
            }
            return;
            
        }

        fetch(`https://reactapp-ktfk.onrender.com/post/${postId}/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: user._id }),
        })
        .then((res) => res.json())
        .then((data) => {
            setFavoriteCounts((prevCounts) => ({
                ...prevCounts,
                [postId]: data.likes,
            }));
            setSelectedCards((prevSelectedCards) => ({
                ...prevSelectedCards,
                [postId]: !prevSelectedCards[postId],
            }));
        })
        .catch((error) => {
            console.error(error);
        });
    };

    return (
        <div className='appendcard2'>
            {postdata.map(ele => (
                <div key={ele._id} className={`showcard ${selectedCards[ele._id] ? 'selected' : ''}`}>
                    <h1>Title: {ele.title}</h1>
                    <p>Description: {ele.description}</p><br />
                    <h3>Posted By: <span className='username'>{ele.username}</span> </h3>
                    <div className='bottom2'>
                        <button onClick={() => toggleFavorite(ele._id)}>
                            {console.log(ele._id)}
                            <FavoriteIcon style={{ color: selectedCards[ele._id] ? 'red' : '#058665' }} />
                            <span>{favoriteCounts[ele._id] || 0}</span>
                        </button>
                        <button><SmsIcon style={{ color: "#058665" }} /> <span></span></button>
                    </div>
                </div>
            ))}
        </div>
    );
}
