/* eslint-disable */
import React, { useEffect, useState } from "react";
import '../App.css';
import axios from "axios";
import Swiper from 'react-id-swiper';

function Main(props) {
    const banner = props.banner;
    // console.log("props.banner: " + banner);

    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);
    const [eachBanner, setEachBanner] = useState([]);

    const cocktail01 = process.env.PUBLIC_URL + '/cocktail01.jpg';
    const cocktail02 = process.env.PUBLIC_URL + '/cocktail02.jpg';

    useEffect(() => {
        setEachBanner(banner);
    },[banner]);
    // console.log("eachBanner: " + banner);

    const swiperParams = {
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true,
        },
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        loop: true,
      };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('file', file);

        try {
            await axios.post('/banner/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              });
        } catch(err) {
            console.log(err);
        }
        
        console.log(formData);
    }

    return(
        <>
        <Swiper {...swiperParams}>
            <div className='banner'>
                {/* {
                eachBanner.map(function(a,i) {
                    return (
                        <img src={`C:\\bitacademyBigdata\\eclipse-workspace\\CocktailProject\\cocktail\\src\\main\\resources\\static${a.filepath}`} alt={"Image"} key={i} />
                    )
                })
                } */}
                <img src={cocktail01} alt={"Image"} style={{width:'100%', height:'100%'}}/>
            </div>
            <div className='banner'>
                <img src={cocktail02} alt={"Image"} style={{width:'100%', height:'100%'}}/>
            </div>
        </Swiper>
        <form onSubmit={handleSubmit} style={{margin:'50px'}}>
            <input type="file" name="file" onChange={handleFileChange} />
            <label>배너이름 : 
                <input type="text" name="title" value={title} onChange={handleTitleChange} ></input>
            </label>
            <button type="submit" style={{marginLeft:'70px'}}>배너 업로드</button>
        </form>
        </>
    )
}

export default Main;