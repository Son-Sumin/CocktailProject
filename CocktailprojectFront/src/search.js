/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import './App.css';
import { Link, useParams } from 'react-router-dom';

function Search(props) {
    //전체 데이터 호출
    const cocktail = props.cocktail;
    const ingredient = props.ingredient;
    const { Sdata } = useParams();
    console.log(Sdata);

    const [Cdata, setCdata] = useState([]);
    const [Idata, setIdata] = useState([]);

    useEffect(() => {
        setCdata(cocktail.filter(x => x && x.name.includes(Sdata)));
        setIdata(ingredient.filter(x => x && x.name.includes(Sdata)));
    }, [cocktail, ingredient, Sdata]);

    return (
        <>
        <div className="cocktail-btn-box modal">
            <button className='cocktail-btn'>전체</button>
            <button className='cocktail-btn'>칵테일</button>
            <button className='cocktail-btn'>재료</button>
            <button className="cocktail-btn">시그니처</button>
        </div>

        <div className='search-contatiner'>
            <div>
                <h2 style={{marginBottom:'50px'}}>칵테일 ▼</h2>
                <div className='search-contents-box'>
                {Cdata.length === 0 ? (
                    <div className='search-contents-none'>
                        <h2 style={{paddingTop:'50px'}}>검색결과 없음</h2>
                    </div>
                ) : (
                    Cdata.map((x, i) => {
                        return (
                            <Link to={`/cocktail/${x.no}`} key={i}>
                                <div style={{ cursor: "pointer" }}>
                                    <img src={x.cocktailImages[0].url} width='280px' height='200px' style={{ borderRadius: '10px' }} alt="cocktail"></img>
                                    <div className='signature-contents' style={{ fontWeight: '800', padding: '10px 0px' }}>{x.name}</div>
                                    <div className='signature-contents' style={{ color: 'rgb(131, 131, 131)', fontSize: '12px' }}>{x.cocktailContents}</div>
                                </div>
                            </Link>
                        )
                    })
                )}
            </div>
            </div>

            <div>
                <h2 style={{marginBottom:'50px'}}>재료 ▼</h2>
                <div className='search-contents-box'>
                {Idata.length === 0 ? (
                    <div className='search-contents-none'>
                        <h2 style={{paddingTop:'50px'}}>검색결과 없음</h2>
                    </div>
                ) : (
                    Idata.map(x => {
                        return (
                            <Link to={`/cocktail/${x.no}`}>
                                <div style={{ cursor: "pointer"}}>
                                    <img src={x.image} width='280px' height='200px' style={{ borderRadius: '10px' }} alt="ingredient"></img>
                                    <div className='signature-contents' style={{ fontWeight: '800', padding: '10px 0px' }}>{x.name}</div>
                                    <div className='signature-contents' style={{ color: 'rgb(131, 131, 131)', fontSize: '12px' }}>{x.contents}</div>
                                </div>
                            </Link>
                        )
                    })
                )}
                </div>
            </div>
        </div>
        </>
    )
}

export default Search;