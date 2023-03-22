/* eslint-disable */
import React, { useEffect, useState } from "react";
import '../App.css';
import '../css/cocktailandingredient.css';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import parse from 'html-react-parser';

function CocktailDetail(props) {
    const {cocktail, token, isLoggedIn, isLiked, setIsLiked} = props;
    const {no} = useParams(); // 파라미터를 변수로 추출

    // 좋아요 버튼 (false일때에는 하얀하트, true일때에는 빨간하트)
    // const [isLiked, setIsLiked] = useState(false);

    // 좋아요 개수 저장 (버튼 클릭 시 실시간으로 좋아요 개수를 반영하기 위한 state)
    const[countLiked, setCountLiked] = useState([]);

    // 클릭시 하트상태 반전
    const handleLikeClick = async (e) => {
        // 로그인 시에만 click이벤트 작동
        if (isLoggedIn) {
            await axios.post(`${process.env.REACT_APP_ENDPOINT}/cocktail/like/${no}`, {}, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
            }).then(() => {
                // Click이벤트 발생 시, 하트상태 반전을 위한 데이버를 서버에서 불러옴
                axios.get(`${process.env.REACT_APP_ENDPOINT}/cocktail/isliked/${no}`, {
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
                }).then((res) => {
                    const liked = res.data; // 서버에서 회원의 좋아요정보 요청 => true or false
                    setIsLiked(liked); // true or false를 isLiked state에 저장
                    console.log("좋아요 데이터 가져오기 성공: " + liked);
                }).catch((err) => {
                    console.log("좋아요 데이터 가져오기 실패ㅠㅠ");
                    console.log(err)
                })
                // console.log("좋아요 서버전달 성공!");
            }).catch((err) => {
                // console.log("좋아요 서버전달 실패!");
                console.log(err);
            });
    
            // Click이벤트 발생 시, 실시간으로 숫자를 반영
            axios.get(`${process.env.REACT_APP_ENDPOINT}/cocktail/countliked/${no}`)
            .then((res) => {
                const counted = res.data;
                setCountLiked(counted);
                console.log("좋아요 카운트데이터 가져오기 성공: " + counted);
            }).catch((err) => {
                console.log("좋아요 카운트데이터 가져오기 실패ㅠㅠ");
                console.log(err)
            });
        } else {
            // 비로그인 시, Click이벤트 막음
            e.preventDefault();
        }
    }

    // 렌더링 할때마다, 예전에 좋아요 버튼 클릭했다면 ♥으로 고정, 안했다면 ♡으로 고정... 서버에서 데이터를 불러옴
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_ENDPOINT}/cocktail/isliked/${no}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            const liked = res.data;
            setIsLiked(liked);
            console.log("좋아요 데이터 가져오기 성공: " + liked);
        }).catch((err) => {
            console.log("좋아요 데이터 가져오기 실패ㅠㅠ");
            console.log(err)
        })
    }, []);

    // 렌더링 할때마다, 실시간으로 숫자를 반영
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_ENDPOINT}/cocktail/countliked/${no}`)
        .then((res) => {
            const counted = res.data;
            setCountLiked(counted);
            console.log("좋아요 카운트데이터 가져오기 성공: " + counted);
        }).catch((err) => {
            console.log("좋아요 카운트데이터 가져오기 실패ㅠㅠ");
            console.log(err)
        })
    }, [countLiked]);

    // 전체 칵테일중 no와 맞는 칵테일
    const eachCocktail = cocktail.filter((cocktail) => cocktail.no == no);

    return (
        <>
        {
        eachCocktail.map(function(a, i) {
            return (
            <div key={i}>
                <div className='banner cocktail-banner'>
                    <div className="cocktail-banner-box">
                        <div className="cocktail-banner-box-piturebox">
                            <div style={{width:'80px', height:'100%'}}>
                                {
                                a.cocktailImages.map(function(a, i) {
                                    return (
                                        <div className="cocktail-banner-box-minipicturebox">
                                            <img className="cocktail-banner-box-minipicture" src={a.url} width='420px' height='400px'></img>
                                        </div>
                                    )
                                })
                                }
                            </div>
                            <div style={{width:'420px', height:'100%'}}>
                                {/* {a.cocktailImages[0].url} */}
                                <img src={a.cocktailImages[0].url} width='420px' height='400px' style={{borderRadius:'10px'}}></img> 
                            </div>
                        </div>
                        <div className="cocktail-banner-box-contentsbox">
                            <div style={{color:'rgb(242, 92, 92)', fontWeight:'800'}}>#{(a.type == "alcohol") ? "알콜" : "논알콜"} #재료{a.cocktailRecipes.length}개</div>
                            <div>
                                <div className="cocktail-banner-box-contents-name">{a.name}</div>
                                <div className="cocktail-banner-box-contents-engname">{a.engName}</div>
                            </div>
                            <div style={{color:'white'}}>{a.cocktailContents}</div>
                            <div className="cocktail-banner-box-contents-isalcohol">도수 : {(a.type == "alcohol") ? "알콜" : "논알콜"}</div>
                            <div className="cocktail-ingredient-image" style={{marginLeft:'0%', marginTop:'3%', cursor: isLoggedIn ? 'pointer' : 'default'}} onClick={handleLikeClick}>
                                <div className="cocktail-banner-box-contents-favorite">
                                    {isLiked ? '♥' : '♡'}
                                </div>
                                <div className="cocktail-banner-box-contents-favorite" style={{fontSize:'25px', marginTop:'-15px'}}>{countLiked}</div> 
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{paddingLeft:'15%', paddingRight:'15%', marginTop:'100px'}}>
                    <div style={{marginBottom:'50px'}}>
                        <span style={{fontSize:'20px', fontWeight:'bold'}}>재료정보 ▼</span>
                    </div>
                    <div className="cocktail-ingredient-recipe-box">
                        {
                        a.cocktailRecipes.map(function(a, i) {
                            return (
                                <Link to={`/ingredient/${a.ingredient.no}`}>
                                    <div className="cocktail-ingredient-container">
                                        <div className="cocktail-ingredient-image">
                                            {/* "https://cocktail-bucket.s3.ap-northeast-2.amazonaws.com/TB_ITEM_MASTER/007.%EC%BD%94%EC%BD%94%EB%84%9B%EB%B0%80%ED%81%AC80.png" {a.ingredient.image} */}
                                            <img src={a.ingredient.image} width='100%' height='100%'></img>
                                        </div>
                                        <div className="cocktail-ingredient-contents" style={{paddingTop:'15%'}}>
                                            <div style={{fontSize:'13px', color:'rgb(242, 92, 92)', fontWeight:'bold'}}>{a.ingredient.type}</div>
                                            <div className="cocktail-ingredient-contents-name">{a.ingredient.name}</div>
                                        </div>
                                        <div className="cocktail-ingredient-contents" style={{paddingTop:'10%', fontSize:'25px', fontWeight:'bold'}}>{a.amount}{a.unit}</div>
                                    </div>
                                </Link>
                            )
                        })
                        }
                    </div>
                </div>

                <div style={{paddingLeft:'15%', paddingRight:'15%', marginTop:'100px'}}>
                    <div style={{marginBottom:'50px'}}>
                        <span style={{fontSize:'20px', fontWeight:'bold'}}>레시피 설명 ▼</span>
                    </div>
                    <div className="cocktail-ingredient-recipe-box">
                        <div style={{paddingLeft:'20%'}}>
                            <p className="cocktail-recipe-contents" style={{whiteSpace:'pre-line'}}>{parse(a.recipeContents)}</p>
                        </div>
                    </div>
                </div>
            </div>
            )
        })
        }
        </>
    )
}
export default CocktailDetail;