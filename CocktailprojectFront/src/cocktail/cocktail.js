/* eslint-disable */
import React, { useEffect, useState } from "react";
import '../App.css';
import '../css/cocktailandingredient.css'
import { Routes, Route, Link, useParams, useNavigate, Outlet } from 'react-router-dom';

function Cocktail(props) {
    // 전체 칵테일데이터
    const {cocktail} = props;

    // 원본 cocktail 데이터에서 새로 담을 state
    const [eachCocktail, setEachCocktail] = useState([]);

    useEffect(() => {
        setEachCocktail(cocktail);
    }, [cocktail]);

    const [countValue, setCountValue] = useState(0);

    const handleCountValueChange = (e) => {
        setCountValue(e.target.value)
    }

    return (
        <div>
            <div className="cocktail-btn-box">
                <button className='cocktail-btn' onClick={() => setEachCocktail(cocktail)}>전체</button>
                <button className='cocktail-btn' onClick={() => setEachCocktail(cocktail.filter(data => data.type === 'alcohol'))}>알콜</button>
                <button className='cocktail-btn' onClick={() => setEachCocktail(cocktail.filter(data => data.type === 'nonalcohol'))}>논알콜</button>
                <button className="cocktail-btn" onClick={() => setEachCocktail(cocktail.filter(data => data.cocktailRecipes.length >= countValue))}>재료수</button>
                <select className="modal" onChange={handleCountValueChange} defaultValue="0">
                    <option value="0"> all</option>
                    <option value="3"> 3↑</option>
                    <option value="5"> 5↑</option>
                </select>
            </div>

            <div className="cocktail-list">
                {
                    eachCocktail.map( (cocktail, i)=> {
                        return (
                            <Link to={`/cocktail/${cocktail.no}`} key={i}>
                                <div className="cocktail-box">
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