/* eslint-disable */
import React, { useEffect, useState } from "react";
import '../App.css';
import '../css/cocktailandingredient.css'
import axios from 'axios';
import { Routes, Route, Link, useParams, useNavigate, Outlet } from 'react-router-dom';
import { getCocktail, getIngredient } from "../api";
// import Modal from 'react-modal';

function Cocktail(props) {
    // 전체 칵테일데이터
    const cocktail = props.cocktail;
    // console.log(cocktail);


    // 필터링 할 칵테일데이터(copy)
    const [eachCocktail, setEachCocktail] = useState([]);

    // 이거 없으면 초기화면 출력에 아무것도 mapping이 안됨
    useEffect(() => {
        setEachCocktail(cocktail);
    }, [cocktail]);

    // console.log(eachCocktail);

    const [countValue, setCountValue] = useState(0);

    const handleCountValueChange = (e) => {
        setCountValue(e.target.value)
    }
    // console.log(eachCocktail[0].cocktailRecipes.length);
    // console.log(countValue);

    const [isOpen, setIsOpen] = useState(false);

    const handleButtonClick = () => {
        setIsOpen(true);
    };

    return (
        <div>
            <div className="cocktail-btn-box modal">
                <button className='cocktail-btn' onClick={() => setEachCocktail(cocktail)}>전체</button>
                <button className='cocktail-btn' onClick={() => setEachCocktail(cocktail.filter(data => data.type === 'alcohol'))}>알콜</button>
                <button className='cocktail-btn' onClick={() => setEachCocktail(cocktail.filter(data => data.type === 'nonalcohol'))}>논알콜</button>
                <button className="cocktail-btn modalContainer" onClick={() => setEachCocktail(cocktail.filter(data => data.cocktailRecipes.length >= countValue))}>재료수</button>
                <select className="modal" onChange={handleCountValueChange} defaultValue="0">
                    <option value="0"> all</option>
                    <option value="3"> 3↑</option>
                    <option value="5"> 5↑</option>
                </select>
            </div>

            <div className="cocktail-list">
                {
                    eachCocktail.map(function (cocktail, i) {
                        return (
                            <Link to={`/cocktail/${cocktail.no}`} key={i}>
                                <div className="cocktail-box">
                                    {/* {cocktail.cocktailImages[0].url} */} {/* "https://cocktail-bucket.s3.ap-northeast-2.amazonaws.com/TB_COCK_MASTER/71.Shirley_temple.jpg" */}
                                    <img src={cocktail.cocktailImages[0].url} width='280px' height='200px' style={{ borderRadius: '10px' }} alt="cocktail"></img>
                                    <div className='cocktail-contents' style={{ fontWeight: '800', padding: '10px 0px' }}>{cocktail.name}</div>
                                    <div className='cocktail-contents' style={{ color: 'rgb(131, 131, 131)', fontSize: '12px' }}>{cocktail.cocktailContents}</div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Cocktail;