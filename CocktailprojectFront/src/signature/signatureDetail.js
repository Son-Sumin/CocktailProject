/* eslint-disable */
import React, { useEffect, useState } from "react";

function SignatureDetail() {
    return (
        <>
        {/* {
        eachCocktail.map(function(a, i) {
            return ( */}
                <div className='banner cocktail-banner'>
                    <div className="cocktail-banner-box">
                        <div className="cocktail-banner-box-piturebox">
                            <div style={{width:'80px', height:'100%'}}>
                                {
                                // a.cocktailImages.map(function(a, i) {
                                //     return (
                                        <div className="cocktail-banner-box-minipiturebox">
                                            {/* {a.url} */}
                                            <img className="cocktail-banner-box-minipiture" src="https://cocktail-bucket.s3.ap-northeast-2.amazonaws.com/TB_COCK_MASTER/71.Shirley_temple.jpg" width='420px' height='400px'></img>
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
                            <div className="cocktail-ingredient-image" style={{marginLeft:'0%', marginTop:'5%'}}>
                                <div className="cocktail-banner-box-contents-favorite">❤</div>
                                <div className="cocktail-banner-box-contents-favorite" style={{fontSize:'25px', marginTop:'0px'}}>5</div>
                            </div>
                        </div>
                    </div>
                </div>
            {/* )
        }
        )
        } */}

        <div style={{paddingLeft:'15%', paddingRight:'15%', marginTop:'100px'}}>
            <div style={{marginBottom:'50px'}}>
                <span style={{fontSize:'20px', fontWeight:'bold'}}>재료정보 ▼</span>
                <button className="cocktail-ingredient-btn"> ↻ 단위변경</button>
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