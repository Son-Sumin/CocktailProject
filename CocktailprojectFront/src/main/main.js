/* eslint-disable */
import React, { useEffect, useState } from "react";
import { getCocktail, getBanner, getSignature } from "../api";
import '../App.css';
import axios from "axios";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Main() {

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
    //데이터 입력
    useEffect(() => {
        getBanner(setEachBanner);
        getCocktail(setTopCocktailData);
        getSignature(setTopSignatureData);
    }, []);

    //좋아요 페이지
    const [topCocktailData, setTopCocktailData] = useState([]);
    const [topSignatureData, setTopSignatureData] = useState([]);

    const sortJSON = (data, key, type) => {
        if (type == undefined) {
            type = "asc";
        }
        return data.sort((a, b) => {
            const x = a[key];
            const y = b[key];
            if (type === "desc") {
                return x > y ? -1 : x < y ? 1 : 0;
            } else if (type === "asc") {
                return x < y ? -1 : x > y ? 1 : 0;
            }
        });
    };

    useEffect(() => {
        setTopCocktailData(sortJSON(topCocktailData, "likeCocktail", "desc"));
        setTopSignatureData(sortJSON(topSignatureData, "likeSignature", "desc"));
    }, [topCocktailData, topSignatureData]);

    //버튼 컨트롤
    const [count1, setCount1] = useState(0);

    const buttonMinus1 = (e) => {
        e.preventDefault();
        setCount1(count1 - 3);
    };
    const buttonPlus1 = (e) => {
        e.preventDefault();
        setCount1(count1 + 3);
    };

    const [count2, setCount2] = useState(0);

    const buttonMinus2 = (e) => {
        e.preventDefault();
        setCount2(count2 - 3);
    };
    const buttonPlus2 = (e) => {
        e.preventDefault();
        setCount2(count2 + 3);
    };
    return (
        <>
            <Slider {...settings}>
                {
                    eachBanner.map(function (a, i) {
                        return (
                            <div className='banner' key={i}>
                                <img src={`${process.env.REACT_APP_ENDPOINT}${a.filepath}`} alt={`Image${i}`} key={i} style={{ width: '100%', height: '100%' }} />
                            </div>
                        )
                    })
                }
            </Slider>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "5%" }}>
                <div style={{ display: "grid", gridTemplateColumns: "150px 800px 150px" }}>
                    {count1 !== 0 ? (
                        <div><button onClick={buttonMinus1} className="cocktail-count-button">&lt;</button></div>
                    ) : (
                        <div><button className="cocktail-count-button">&lt;</button></div>
                    )}
                    <div>
                        <h2>▶칵테일 좋아요</h2>
                        <div style={{ textAlign: "center" }}>
                            {topCocktailData.slice(count1, count1 + 3).map((app) => (
                                <div className="cocktail-count-box" >
                                    <div><img src={app.cocktailImages[0].url}
                                        style={{ margin: "5px", height: "180px", width: "180px" }} /></div>
                                    <div>{app.name}</div>
                                    <div style={{ color: 'rgb(242, 92, 92)' }}>♥  {app.likeCocktail.length}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div><button onClick={buttonPlus1} className="cocktail-count-button">&gt;</button></div>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "5%" }}>
                <div style={{ display: "grid", gridTemplateColumns: "150px 800px 150px" }}>
                    {count2 !== 0 ? (
                        <div><button onClick={buttonMinus2} className="cocktail-count-button">&lt;</button></div>
                    ) : (
                        <div><button className="cocktail-count-button">&lt;</button></div>
                    )}
                    <div>
                        <h2>▶시그니처 좋아요</h2>
                        <div style={{ textAlign: "center" }}>
                            {topSignatureData.slice(count2, count2 + 3).map((app) => (
                                <div className="cocktail-count-box" >
                                    <div><img src={`${process.env.REACT_APP_ENDPOINT}${app.signatureImages[0].path}`}
                                        style={{ margin: "5px", height: "180px", width: "180px" }} /></div>
                                    <div>{app.cocktailName}</div>
                                    <div style={{ color: 'rgb(242, 92, 92)' }}>♥  {app.likeSignature.length}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div><button onClick={buttonPlus2} className="cocktail-count-button">&gt;</button></div>
                </div>
            </div>
        </>
    )
}

export default Main;