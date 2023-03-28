/* eslint-disable */
import React, { useEffect, useState } from "react";
import '../App.css';
import axios from "axios";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Main(props) {
    const { banner, cocktail } = props;

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

        // formData에 데이터 들어가있나 확인
        for (const [key, value] of formData.entries()) {
            console.log("formData: " + `${key}: ${value}`);
            console.log("--------");
        }

        try {
            await axios.post(`${process.env.REACT_APP_ENDPOINT}/banner/add`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log("배너 업로드 성공!");

            setTimeout(() => {
                window.location.reload();
            }, 5000);
        } catch (err) {
            console.log("배너 업로드 실패ㅠㅠ")
            console.log(err);
        }
    }

    useEffect(() => {
        setEachBanner(banner);
        setCocktailData(cocktail)
    }, [banner, cocktail]);

    //정렬 소스코드
    var sortJSON = function (data, key, type) {
        if (type == undefined) {
            type = "asc";
        }
        return data.sort(function (a, b) {
            var x = a[key];
            var y = b[key];
            if (type == "desc") {
                return x > y ? -1 : x < y ? 1 : 0;
            } else if (type == "asc") {
                return x < y ? -1 : x > y ? 1 : 0;
            }
        });
    };

    // 칵테일 데이터
    const [cocktailData, setCocktailData] = useState([]);
    const [count, setCount] = useState(0);

    const buttonMinus = (e) => {
        e.preventDefault();
        setCount(count - 3);
        console.log(count)
    };
    const buttonPlus = (e) => {
        e.preventDefault();
        setCount(count + 3);
        console.log(count)
    };


    sortJSON(cocktailData, "likeBoard", "desc")

    return (
        <>
            <Slider {...settings}>
                {
                    eachBanner.map(function (a, i) {
                        return (
                            <div className='banner' key={i}>
                                <img src={`${process.env.REACT_APP_ENDPOINT}${a.filepath}`} alt={`Image${i}`} key={i} style={{ width: '100%' }} />
                            </div>
                        )
                    })
                }
            </Slider>
            {/* 
        <form onSubmit={handleSubmit} style={{margin:'50px'}}>
            {/* file 타입은 value 속성 사용못함. onChange 이벤트 핸들러에서 event.target.files를 통해 접근가능 
            <input type="file" name="file" onChange={handleFileChange} />
            <label>배너이름 :
                <input type="text" name="title" value={title} onChange={handleTitleChange} ></input>
            </label>
            <button type="submit" style={{ marginLeft: '70px' }}>배너 업로드</button>
        </form>  */}
            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ display: "grid", gridTemplateColumns: "150px 800px 150px" }}>
                    {count !== 0 ? (
                        <div><button onClick={buttonMinus} className="cocktail-count-button">&lt;</button></div>
                    ) : (
                        <div><button className="cocktail-count-button">&lt;</button></div>
                    )}
                    <div>
                        <h2>▶칵테일 좋아요</h2>
                        <div style={{ textAlign: "center" }}>
                            {cocktailData.map((app, i) => {
                                if (count === 0 && i < 3) {
                                    return (
                                        <div style={{ width: "200px", display: "inline-block" }}>
                                            <div>{app.no}</div>
                                            <div><img src={app.cocktailImages[0].url} style={{ margin: "5px", height: "150px", width: "150px", }} /></div>
                                            <div>{app.name}</div>
                                            <div>{app.likeCocktail.length}</div>
                                        </div>
                                    );
                                } else if (count > 0 && count <= i && i < 3 + count) {
                                    return (
                                        <div className="cocktail-count-box" >
                                            <div>{app.no}</div>
                                            <div><img src={app.cocktailImages[0].url} style={{ margin: "5px", height: "150px", width: "150px", }} /></div>
                                            <div>{app.name}</div>
                                            <div>{app.likeCocktail.length}</div>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>
                    <div><button onClick={buttonPlus} className="cocktail-count-button">&gt;</button></div>
                </div>
            </div>
        </>
    )
}

export default Main;