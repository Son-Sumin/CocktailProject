/* eslint-disable */
import React, { useEffect, useState } from "react";
import '../App.css';
import '../css/signature.css';
import axios from 'axios';
import {Routes, Route, Link, useParams, useNavigate, Outlet} from 'react-router-dom';

function Signature(props) {
    const {signature, isLoggedIn} = props;

    const [eachSignature, setEachSignature] = useState([]);

    useEffect(() => {
        setEachSignature(signature);
    }, [signature]);

    return (
    <>
    <div className="banner">
        <div className="banner-contents-container">
            <div style={{marginTop:'22%'}}>누구나 참여할 수 있는 창작레시피 게시판</div>
            <div style={{fontSize:'30px'}}>너만의 시그니처 칵테일을 만들어봐!!</div>
            <Link to={isLoggedIn ? "/signature/join" : "/login"}>
                <div><button className="banner-contents-btn">참가신청 바로가기</button></div>
            </Link>
        </div>
    </div>
    <div style={{paddingLeft:'15%', paddingRight:'15%', marginTop:'100px'}}>
        <div style={{marginBottom:'50px'}}><span style={{fontSize:'20px', fontWeight:'bold'}}>시그니처 리스트 ▼</span></div>
        <div className="signature-list">
            {
            eachSignature.map(function(a, i) {
                return (
                    <Link to={`/signature/${a.no}`} key={i}>
                        <div style={{cursor: "pointer"}}>
                            <img src="https://cocktail-bucket.s3.ap-northeast-2.amazonaws.com/TB_COCK_MASTER/71.Shirley_temple.jpg" width='280px' height='200px' style={{borderRadius:'10px'}} alt="cocktail"></img>
                            <div className='signature-contents' style={{fontWeight:'800', padding:'10px 0px'}}>{a.cocktailName}</div>
                            <div className='signature-contents' style={{color:'rgb(131, 131, 131)', fontSize:'12px'}}>{a.cocktailContents}</div>
                        </div>
                    </Link>
                )
            })
            }
        </div>
    </div>
    </>
    );
}

export default Signature;