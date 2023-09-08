import React, { useEffect, useState } from 'react';
import "./showcard.css";
import FavoriteIcon from '@mui/icons-material/Favorite';
import SmsIcon from '@mui/icons-material/Sms';

import { useUser } from '../UserContext';
export default function Showdata() {
    const { user } = useUser();
    console.log("user",user)
    const [postdata, setpostdata] = useState([]);
    const [selectedCards, setSelectedCards] = useState({});

    useEffect(() => {
        fetch("https://reactapp-ktfk.onrender.com/post/allpost")
            .then((res) => res.json())
            .then((data) => {
                setpostdata(data.allpost);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const toggleFavorite = (cardId) => {
        setSelectedCards(prevSelectedCards => ({
            ...prevSelectedCards,
            [cardId]: !prevSelectedCards[cardId]
        }));
    };

    return (
        <div className='appendcard2'>
            {postdata.map(ele => (
                
                <div key={ele._id} className={`showcard ${selectedCards[ele._id] ? 'selected' : ''}`}>
                    <h1>{ele.title}</h1>
                    <p>{ele.description}</p><br />
                    {console.log(ele)}
                    <h3>posted By:- <span className='username'>{ele.username}</span> </h3>
                    <div className='bottom2'>
                        <button onClick={() => toggleFavorite(ele._id)}>
                            <FavoriteIcon style={{ color: selectedCards[ele._id] ? 'red' : '#058665' }} />
                            <span></span>
                        </button>
                        <button><SmsIcon style={{color:"#058665"}}/> <span></span></button>
                    </div>
                </div>
            ))}
        </div>
    );
}
