import React, { useEffect, useState } from 'react';
import "./showcard.css";
import FavoriteIcon from '@mui/icons-material/Favorite';
import SmsIcon from '@mui/icons-material/Sms';

export default function Showdata() {
    const [postdata, setpostdata] = useState([]);
    const [selectedCards, setSelectedCards] = useState({});

    useEffect(() => {
        fetch("http://localhost:3033/post/allpost")
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
        <div className='appendcard'>
            {postdata.map(ele => (
                <div key={ele._id} className={`card ${selectedCards[ele._id] ? 'selected' : ''}`}>
                    <h2>{ele.title}</h2>
                    <p>{ele.description}</p>
                    <div className='bottom'>
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
