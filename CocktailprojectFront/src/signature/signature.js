/* eslint-disable */
import React, { useEffect, useState } from "react";
import '../App.css';
import '../css/signature.css';
import axios from 'axios';
import {Routes, Route, Link, useParams, useNavigate, Outlet} from 'react-router-dom';

function Signature() {
    return (
    <>
    <div className="banner">
        <div className="banner-contents-container">
            <div style={{marginTop:'22%'}}>누구나 참여할 수 있는 창작레시피 게시판</div>
            <div style={{fontSize:'30px'}}>너만의 시그니처 칵테일을 만들어봐!!</div>
            <Link to="/signature/join">
                <div><button className="banner-contents-btn">참가신청 바로가기</button></div>
            </Link>
        </div>
    </div>
    <div style={{paddingLeft:'15%', paddingRight:'15%', marginTop:'100px'}}>
        <div style={{marginBottom:'50px'}}><span style={{fontSize:'20px', fontWeight:'bold'}}>시그니처 리스트 ▼</span></div>
        <div className="signature-list">
            <Link to={`/signature/1`}>
                <div style={{cursor: "pointer"}}>
                    <img src="https://cocktail-bucket.s3.ap-northeast-2.amazonaws.com/TB_COCK_MASTER/71.Shirley_temple.jpg" width='280px' height='200px' style={{borderRadius:'10px'}} alt="cocktail"></img>
                    <div className='signature-contents' style={{fontWeight:'800', padding:'10px 0px'}}>칵테일</div>
                    <div className='signature-contents' style={{color:'rgb(131, 131, 131)', fontSize:'12px'}}>칵테일내용칵테일내용칵테일내용칵테일내용칵테일내용칵테일내용</div>
                </div>
            </Link>
            <div style={{cursor: "pointer"}}>
                <img src="https://cocktail-bucket.s3.ap-northeast-2.amazonaws.com/TB_COCK_MASTER/71.Shirley_temple.jpg" width='280px' height='200px' style={{borderRadius:'10px'}} alt="cocktail"></img>
                <div className='signature-contents' style={{fontWeight:'800', padding:'10px 0px'}}>칵테일</div>
                <div className='signature-contents' style={{color:'rgb(131, 131, 131)', fontSize:'12px'}}>칵테일내용칵테일내용칵테일내용칵테일내용칵테일내용칵테일내용</div>
            </div>
            <div style={{cursor: "pointer"}}>
                <img src="https://cocktail-bucket.s3.ap-northeast-2.amazonaws.com/TB_COCK_MASTER/71.Shirley_temple.jpg" width='280px' height='200px' style={{borderRadius:'10px'}} alt="cocktail"></img>
                <div className='signature-contents' style={{fontWeight:'800', padding:'10px 0px'}}>칵테일</div>
                <div className='signature-contents' style={{color:'rgb(131, 131, 131)', fontSize:'12px'}}>칵테일내용칵테일내용칵테일내용칵테일내용칵테일내용칵테일내용</div>
            </div>
            <div style={{cursor: "pointer"}}>
                <img src="https://cocktail-bucket.s3.ap-northeast-2.amazonaws.com/TB_COCK_MASTER/71.Shirley_temple.jpg" width='280px' height='200px' style={{borderRadius:'10px'}} alt="cocktail"></img>
                <div className='signature-contents' style={{fontWeight:'800', padding:'10px 0px'}}>칵테일</div>
                <div className='signature-contents' style={{color:'rgb(131, 131, 131)', fontSize:'12px'}}>칵테일내용칵테일내용칵테일내용칵테일내용칵테일내용칵테일내용</div>
            </div>
            <div style={{cursor: "pointer"}}>
                <img src="https://cocktail-bucket.s3.ap-northeast-2.amazonaws.com/TB_COCK_MASTER/71.Shirley_temple.jpg" width='280px' height='200px' style={{borderRadius:'10px'}} alt="cocktail"></img>
                <div className='signature-contents' style={{fontWeight:'800', padding:'10px 0px'}}>칵테일</div>
                <div className='signature-contents' style={{color:'rgb(131, 131, 131)', fontSize:'12px'}}>칵테일내용칵테일내용칵테일내용칵테일내용칵테일내용칵테일내용</div>
            </div>
        </div>
    </div>
    </>
    );
}

export default Signature;