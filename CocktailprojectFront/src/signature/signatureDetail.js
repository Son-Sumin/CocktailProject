/* eslint-disable */
import React, { useEffect, useState } from "react";
import '../App.css';
import '../css/cocktailandingredient.css';
import { useParams } from 'react-router-dom';

function SignatureDetail(props) {
    const { signature, token, isLoggedIn } = props;
    const { no } = useParams(); // 파라미터를 변수로 추출

    // 좋아요 개수 저장 (버튼 클릭 시 실시간으로 좋아요 개수를 반영하기 위한 state)
    const [countLiked, setCountLiked] = useState([]);

    // 클릭시 하트상태 반전
    const handleLikeClick = async (e) => { 
        // 로그인 시에만 click이벤트 작동
        if (isLoggedIn) {
            await axios.post(`${process.env.REACT_APP_ENDPOINT}/signature/like/${no}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(() => {
                // Click이벤트 발생 시, 하트상태 반전을 위한 데이버를 서버에서 불러옴
                axios.get(`${process.env.REACT_APP_ENDPOINT}/signature/isliked/${no}`, {
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
            axios.get(`${process.env.REACT_APP_ENDPOINT}/signature/countliked/${no}`)
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
        axios.get(`${process.env.REACT_APP_ENDPOINT}/signature/isliked/${no}`, {
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
        axios.get(`${process.env.REACT_APP_ENDPOINT}/signature/countliked/${no}`)
            .then((res) => {
                const counted = res.data;
                setCountLiked(counted);
                console.log("좋아요 카운트데이터 가져오기 성공: " + counted);
            }).catch((err) => {
                console.log("좋아요 카운트데이터 가져오기 실패ㅠㅠ");
                console.log(err)
            })
    }, [countLiked]);

    // 전체 시그니처중 no와 맞는 시그니처
    const eachSignature = signature.filter((signature) => signature.no == no);
    console.log(eachSignature);

    return (
        <>
        {
        eachSignature.map(function(a, i) {
            return (
                <div className='banner cocktail-banner' style={{height:'530px'}} key={i}>
                    <div className="cocktail-banner-box">
                        <div className="cocktail-banner-box-piturebox">
                            <div style={{width:'80px', height:'100%'}}>
                                {
                                // a.cocktailImages.map(function(a, i) {
                                //     return (
                                        <div className="cocktail-banner-box-minipicturebox">
                                            {/* {a.url} */}
                                            <img className="cocktail-banner-box-minipicture" src="https://cocktail-bucket.s3.ap-northeast-2.amazonaws.com/TB_COCK_MASTER/71.Shirley_temple.jpg" width='420px' height='400px'></img>
                                        </div>
                                //     )
                                // })
                                }
                            </div>
                            <div style={{width:'420px', height:'100%'}}>
                                {/* {a.cocktailImages[0].url} */}
                                <img src="https://cocktail-bucket.s3.ap-northeast-2.amazonaws.com/TB_COCK_MASTER/71.Shirley_temple.jpg" width='420px' height='400px' style={{borderRadius:'10px'}}></img> 
                            </div>
                        </div>
                        <div className="cocktail-banner-box-contentsbox">
                            <div style={{color:'rgb(242, 92, 92)', fontWeight:'800'}}>#알콜 #재료6개</div>
                            <div>
                                <div className="cocktail-banner-box-contents-name">핑크 스카이 라이트 피즈</div>
                                <div className="cocktail-banner-box-contents-engname">Pink Skylight Fizz</div>
                            </div>
                            <div style={{color:'white'}}>라모스 진피즈의 모습을 간단하게 흉내내고, 색을 조금 바꾼 칵테일입니다.</div>
                            <div className="cocktail-banner-box-contents-isalcohol">도수 : 알콜</div>
                            <div className="cocktail-ingredient-image" style={{marginLeft:'0%', marginTop:'3%'}}>
                                <div className="cocktail-banner-box-contents-favorite" >
                                    ♥
                                </div>
                                <div className="cocktail-banner-box-contents-favorite" style={{fontSize:'25px', marginTop:'-15px'}}>5</div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        )
        }

        <div style={{paddingLeft:'15%', paddingRight:'15%', marginTop:'100px'}}>
            <div style={{marginBottom:'50px'}}>
                <span style={{fontSize:'20px', fontWeight:'bold'}}>재료정보 ▼</span>
            </div>
            <div className="cocktail-ingredient-recipe-box">
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 400px', padding:'2% 20%'}}>
                    <div className="cocktail-ingredient-image">
                        <img src="https://cocktail-bucket.s3.ap-northeast-2.amazonaws.com/TB_ITEM_MASTER/007.%EC%BD%94%EC%BD%94%EB%84%9B%EB%B0%80%ED%81%AC80.png" width='100%' height='100%'></img>
                    </div>
                    <div className="cocktail-ingredient-contents" style={{paddingTop:'15%'}}>
                        <div style={{fontSize:'13px', color:'rgb(242, 92, 92)', fontWeight:'bold'}}>음료수</div>
                        <div>코코넛밀크</div>
                    </div>
                    <div className="cocktail-ingredient-contents" style={{paddingTop:'10%', fontSize:'25px', fontWeight:'bold'}}>30ml</div>
                </div>
                
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 2fr', padding:'2% 20%'}}>
                    <div className="cocktail-ingredient-image">
                        <img src="https://cocktail-bucket.s3.ap-northeast-2.amazonaws.com/TB_ITEM_MASTER/007.%EC%BD%94%EC%BD%94%EB%84%9B%EB%B0%80%ED%81%AC80.png" width='100%' height='100%'></img>
                    </div>
                    <div className="cocktail-ingredient-contents" style={{paddingTop:'15%'}}>
                        <div style={{fontSize:'13px', color:'rgb(242, 92, 92)', fontWeight:'bold'}}>음료수</div>
                        <div>코코넛밀크</div>
                    </div>
                    <div className="cocktail-ingredient-contents" style={{paddingTop:'10%', fontSize:'25px', fontWeight:'bold'}}>30ml</div>
                </div>
            </div>
        </div>

        <div style={{paddingLeft:'15%', paddingRight:'15%', marginTop:'100px'}}>
            <div style={{marginBottom:'50px'}}>
                <span style={{fontSize:'20px', fontWeight:'bold'}}>레시피 설명 ▼</span>
            </div>
            <div className="cocktail-ingredient-recipe-box">
                <div style={{paddingLeft:'20%'}}>
                    <p className="cocktail-recipe-contents">1. 믹서기에 으깬 얼음을 넣는다.</p>
                    <p className="cocktail-recipe-contents">2. 코코넛 밀크(또는 코코넛 크림이나 코코넛 시럽) 30ml와 파인애플 주스 120ml를 추가한다. </p>
                    <p className="cocktail-recipe-contents">3. 부드러워질 때까지 갈아서 허리케인 잔에 붓는다.</p>
                    <p className="cocktail-recipe-contents">4. 휘핑크림으로 토핑하고 웨지 파인애플과 마라스키노 체리로 장식한다.</p>
                </div>
            </div>
        </div>
        </>
    )
}
export default SignatureDetail;