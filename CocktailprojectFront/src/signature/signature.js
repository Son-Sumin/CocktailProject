/* eslint-disable */
import React, { useEffect, useState } from "react";
import '../App.css';
import '../css/signature.css';
import { getSignature } from "../api";
import { Link } from 'react-router-dom';

function Signature(props) {
    const {signature, setSignature, isLoggedIn} = props;
    const signatureBannerPicture = process.env.PUBLIC_URL + '/Signature.PNG';
    
    useEffect(() => {
        getSignature(setSignature);
    }, []);

    return (
    <>
    <div className="banner" style={{position:'relative'}}>
        <img src={signatureBannerPicture} style={{width:'100%', height:'100%'}} alt="Signature banner" />
        <div className="banner-contents-container" style={{position:'absolute', top:'50%', left:'50%', transform: 'translate(-50%, -50%)'}}>
            <div style={{marginTop:'22%', fontSize:'30px'}}>누구나 참여할 수 있는 창작레시피 게시판</div>
            <div style={{fontSize:'45px', fontWeight:'600'}}>너만의 시그니처 칵테일을 만들어봐!!</div>
            <Link to={isLoggedIn ? "/signature/join" : "/login"}>
                <button className="banner-contents-btn">
                    <h2>참가신청 바로가기</h2>
                </button>
            </Link>
        </div>
    </div>
    <div style={{paddingLeft:'15%', paddingRight:'15%', marginTop:'100px'}}>
        <div style={{marginBottom:'50px'}}><span style={{fontSize:'20px', fontWeight:'bold'}}>시그니처 리스트 ▼</span></div>
        <div className="signature-list">
            {
            signature.map(function(a, i) {
                return (
                    <Link to={`/signature/${a.no}`} key={i}>
                        <div style={{cursor: "pointer"}}>
                            {a.signatureImages[0] && <img src={`${process.env.REACT_APP_ENDPOINT}${a.signatureImages[0].path}`} width='280px' height='200px' style={{borderRadius:'10px'}} alt="cocktail" />}
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