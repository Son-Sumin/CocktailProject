/* eslint-disable */
import React, { useState } from "react";
import './App.css';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Header(props) {
  const navigate = useNavigate();
  const setIsLoggedIn = props.setIsLoggedIn;

  const bannerLogo = process.env.PUBLIC_URL + '/project-logo.png';
  const search = process.env.PUBLIC_URL + '/search.png';

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      // setIsLoggedIn(false);
      navigate('/');
      alert("로그아웃 성공!");
    } catch(error) {
      console.log(error);
      alert("로그아웃 실패!");
    }
  };

  return (
    <div className='header-container'>
      <div style={{gridColumn:'1/4'}}>
        <Link to="/">
          <img src={bannerLogo } alt="project-logo" />
          {/* <h1>로고</h1> */}
        </Link>
      </div>
      <div style={{gridColumn:'5/6'}}></div>
        
      <div style={{display:'grid', gridTemplateColumns:'1fr 200px 110px 130px' , columnGap:'10px'}}>
        <div style={{gridColumn:'2/3', paddingTop:'20px'}}>
          <button className='login-btn' onClick={handleLogout} >로그아웃</button>
        </div>
        
        <Link to="/login" style={{gridColumn:'3/4'}}>
          <button className='login-btn'>로그인</button>
        </Link>
        
        <Link to="/join" style={{gridColumn:'4/5'}}>
          <button className='login-btn'>회원가입</button>
        </Link>
      </div>

      <Link to="/cocktail" className="header-menu-box">
          <li className='header-menu'>칵테일</li>
          <div className='header-animationbar'></div>
      </Link>

      <Link to="/ingredient" className="header-menu-box">
          <li className='header-menu'>재료</li>
          <div className="header-animationbar"></div>
      </Link>

      <Link to="/board" className="header-menu-box">
          <li className='header-menu'>게시판</li>
          <div className="header-animationbar"></div>
      </Link>

      <Link to="/signature" className="header-menu-box">
          <li className='header-menu'>시그니처</li>
          <div className="header-animationbar"></div>
      </Link>

      <Link to="/" className="header-menu-box">
          <li className='header-menu'>클래스</li>
          <div className="header-animationbar"></div>
      </Link>
      

      <div style={{gridColumn:'6/7', position:'relative'}}>
        <img src={search} style={{position:'absolute', right:'5px', top:'4.5px', cursor:'pointer'}}></img>
        <input className='header-search' placeholder='만들고 싶은 칵테일 또는 재료를 검색하세요 :)'></input>
      </div>
    </div>
  )
}

export default Header;