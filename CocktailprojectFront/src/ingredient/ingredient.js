/* eslint-disable */
import React, { useEffect, useState } from "react";
import '../App.css';
import '../css/cocktailandingredient.css';
import axios from 'axios';
import {Routes, Route, Link, useParams, useNavigate, Outlet} from 'react-router-dom';

function Ingredient(props) {
    const ingredient = props.ingredient;
    console.log(ingredient);

    return (
    <div>
        <div className="cocktail-btn-box">
            <button className='cocktail-btn'>전체</button>
            <button className='cocktail-btn'>술(강한도수)</button>
            <button className='cocktail-btn'>술(약한도수)</button>
            <button className='cocktail-btn'>음료수</button>
            <button className='cocktail-btn'>주스</button>
            <button className='cocktail-btn'>기타</button>
        </div>

        <div className="cocktail-list">
            {
            ingredient.map(function(a, i) {
                // console.log(a);
                return (
                    <Link to={`/ingredient/${a.no}`} key={i}>
                        <div className="cocktail-box" style={{backgroundColor:'rgb(248, 248, 248)', borderRadius:'10px'}}>
                            <img src={a.image} width='200px' height='200px' style={{marginLeft:'35px'}} alt="ingredient"></img>
                            <div className='cocktail-contents' style={{fontWeight:'800', padding:'10px 0px'}}>{a.name}</div>
                            <div className='cocktail-contents' style={{color:'rgb(131, 131, 131)', fontSize:'12px'}}>{a.contents}</div>
                        </div>
                    </Link>
                )
            })
            }
        </div>
    </div>
    )
}

export default Ingredient;