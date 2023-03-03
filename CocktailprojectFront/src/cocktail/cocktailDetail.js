/* eslint-disable */
import React, { useEffect, useState } from "react";
import '../App.css';
import '../css/cocktailandingredient.css';
import axios from 'axios';
import {Routes, Route, Link, useParams, useNavigate, Outlet} from 'react-router-dom';
import parse from 'html-react-parser';

function CocktailDetail(props) {
    const cocktail = props.cocktail;
    const {no} = useParams();

    const eachCocktail = cocktail.filter((cocktail) => cocktail.no == no);
    console.log(eachCocktail[0]);

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
                                        <div className="cocktail-banner-box-minipiturebox">
                                            {/* {a.url} */}
                                            <img className="cocktail-banner-box-minipiture" src={a.url} width='420px' height='400px'></img>
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
                            <div className="cocktail-ingredient-image" style={{marginLeft:'0%', marginTop:'3%'}}>
                                <div className="cocktail-banner-box-contents-favorite">❤</div>
                                <div className="cocktail-banner-box-contents-favorite" style={{fontSize:'25px', marginTop:'0px'}}>5</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{paddingLeft:'15%', paddingRight:'15%', marginTop:'100px'}}>
                    <div style={{marginBottom:'50px'}}>
                        <span style={{fontSize:'20px', fontWeight:'bold'}}>재료정보 ▼</span>
                        <button className="cocktail-ingredient-btn"> ↻ 단위변경</button>
                    </div>
                    <div className="cocktail-ingredient-recipe-box">
                        {
                        a.cocktailRecipes.map(function(a, i) {
                            return (
                                <Link to={`/ingredient/${a.ingredient.no}`}>
                                    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 400px', padding:'0% 20%', marginBottom:'40px'}}>
                                        <div className="cocktail-ingredient-image">
                                            {/* "https://cocktail-bucket.s3.ap-northeast-2.amazonaws.com/TB_ITEM_MASTER/007.%EC%BD%94%EC%BD%94%EB%84%9B%EB%B0%80%ED%81%AC80.png" {a.ingredient.image} */}
                                            <img src={a.ingredient.image} width='100%' height='100%'></img>
                                        </div>
                                        <div className="cocktail-ingredient-contents" style={{paddingTop:'15%'}}>
                                            <div style={{fontSize:'13px', color:'rgb(242, 92, 92)', fontWeight:'bold'}}>{a.ingredient.type}</div>
                                            <div>{a.ingredient.name}</div>
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