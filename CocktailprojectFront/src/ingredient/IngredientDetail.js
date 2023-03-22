/* eslint-disable */
import React, { useEffect, useState } from "react";
import '../App.css';
import '../css/cocktailandingredient.css';
import '../css/signature.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function IngredientDetail(props) {
    const ingredient = props.ingredient;
    const { no } = useParams();
    // console.log(ingredient);

    const eachIngredient = ingredient.filter((ingredient) => ingredient.no == no);
    // console.log(eachIngredient[0])

    function IsType(a) {
        if (a.type === "strong") {
            return <span>술(강한도수)</span>
        } else if (a.type === "weak") {
            return <span>술(약한도수)</span>
        } else if (a.type === "beverage") {
            return <span>음료수</span>
        } else if (a.type === "juice") {
            return <span>주스</span>
        } else if (a.type === "fruit") {
            return <span>과일</span>
        } else {
            return <span>기타</span>
        }
    }

    return (
        <>
            {
                eachIngredient.map(function (a, i) {
                    return (
                        <div key={i}>
                            <div className='banner cocktail-banner'>
                                <div className="cocktail-banner-box">
                                    <div className="cocktail-banner-box-piturebox">
                                        <div style={{ width: '420px', height: '100%', backgroundColor: 'white', borderRadius: '10px' }}>
                                            {/* {a.cocktailImages[0].url} */}
                                            <img src={a.image} width='420px' height='400px' style={{ borderRadius: '10px' }}></img>
                                        </div>
                                    </div>
                                    <div className="cocktail-banner-box-contentsbox">
                                        <div style={{ color: 'rgb(242, 92, 92)', fontWeight: '800' }}>#{IsType(a)}</div>
                                        <div>
                                            <div className="cocktail-banner-box-contents-name">{a.name}</div>
                                            <div className="cocktail-banner-box-contents-engname">{a.engName}</div>
                                        </div>
                                        <div style={{ color: 'white', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.contents}</div>
                                        <div className="cocktail-banner-box-contents-isalcohol">도수 : {a.degree}도</div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ paddingLeft: '15%', paddingRight: '15%', marginTop: '100px' }}>
                                <div style={{ marginBottom: '50px' }}><span style={{ fontSize: '20px', fontWeight: 'bold' }}>해당 재료로 만들 수 있는 칵테일 ▼</span></div>
                                <div className="signature-list">
                                    {a.cocktailRecipes.length == 0 ? (
                                        <div style={{textAlign:"center"}}>
                                            <h2>준비중입니다</h2>
                                            <Link to={'/ingredient'}>
                                                <h2>≪＝돌아가기</h2>
                                            </Link>
                                        </div>
                                    ) : (

                                        a.cocktailRecipes.map(function (a, i) {
                                            return (
                                                <Link to={`/cocktail/${a.cocktail.no}`}>
                                                    <div style={{ cursor: "pointer" }}>
                                                        <img src={a.cocktail.cocktailImages[0].url} width='280px' height='200px' style={{ borderRadius: '10px' }} alt="cocktail"></img>
                                                        <div className='signature-contents' style={{ fontWeight: '800', padding: '10px 0px' }}>{a.cocktail.name}</div>
                                                        <div className='signature-contents' style={{ color: 'rgb(131, 131, 131)', fontSize: '12px' }}>{a.cocktail.cocktailContents}</div>
                                                    </div>
                                                </Link>
                                            )
                                        })

                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}
export default IngredientDetail;