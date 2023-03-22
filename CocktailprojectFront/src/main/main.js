/* eslint-disable */
import React, { useEffect, useState } from "react";
import '../App.css';
import axios from "axios";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Main(props) {
    const {banner} = props;

    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);
    const [eachBanner, setEachBanner] = useState([]);

    // const cocktail01 = process.env.PUBLIC_URL + '/cocktail01.jpg';
    // const cocktail02 = process.env.PUBLIC_URL + '/cocktail02.jpg';

    // const testImage = 'http://192.168.0.22:8080/files/0dab8024-1583-4090-a4c8-37a4a204037e_%ED%95%98%ED%8A%B8%EB%A7%B9%EA%B5%AC.jpg';

    // 배너설정
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000 // 2초마다 자동으로 넘어감
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
            await axios.post(`${process.env.REACT_APP_ENDPOINT}/banner/add`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              });
            console.log("배너 업로드 성공!");
            setTimeout(() => {
                window.location.reload();
              }, 1500);
        } catch(err) {
            console.log("배너 업로드 실패ㅠㅠ")
            console.log(err);
        }
    }

    useEffect(() => {
        setEachBanner(banner);
    },[banner]);

    return(
        <>
        <Slider {...settings}>
                {
                eachBanner.map(function(a,i) {
                    return (
                        <div className='banner'>
                            <img src={`${process.env.REACT_APP_ENDPOINT}${a.filepath}`} alt={`Image${i}`} key={i} style={{width:'100%'}}/>
                        </div>
                    )
                })
                }
        </Slider>

        <form onSubmit={handleSubmit} style={{margin:'50px'}}>
            {/* file 타입은 value 속성 사용못함. onChange 이벤트 핸들러에서 event.target.files를 통해 접근가능 */}
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