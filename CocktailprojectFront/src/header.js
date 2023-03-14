/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import './App.css';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function HeaderModal(props) {
  const { isModalOpen, handleModalClose } = props;

  if (!isModalOpen) return null;

  return (
    <div>
      <div className="overlay" onClick={handleModalClose}></div>
        <div className="modal-container">
          <span>모달</span>
        </div>
    </div>
  )
}

function Header(props) {
  const navigate = useNavigate();
  const { setIsLoggedIn, isLoggedIn, user } = props;

  const [selectedMenu, setSelectedMenu] = useState(''); // 현재 선택된 메뉴
  const [isModalOpen, setIsModalOpen] = useState(false); // 회원 메뉴바

  const bannerLogo = process.env.PUBLIC_URL + '/project-logo.png';
  const search = process.env.PUBLIC_URL + '/search.png';

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  }
  
  function handleModal() {
    setIsModalOpen(true);
    console.log("회원모달메뉴: " + isModalOpen);
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  const handleLogout = async (props) => {
    try {
      await axios.post('/member/logout', {}, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })

      localStorage.removeItem('token');
      // delete axios.defaults.headers.common['Authorization'];

      setIsLoggedIn(false);
      navigate('/');
      alert("로그아웃 성공!");
    } catch (error) {
      console.log(error);
      alert("로그아웃 실패!");
    }
  };

  //검색
  //검색자료 저장
  const [inputValue, setInputValue] = useState("");

  function onSubmit(event) {
    event.preventDefault();
    navigate(`/search/${inputValue}`);
  }

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  return (
    <div className='header-container'>
      <div style={{ gridColumn: '1/4' }}>
        <Link to="/">
          <img src={bannerLogo} alt="project-logo" />
        </Link>
      </div>
      <div style={{ gridColumn: '5/6' }}></div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px 130px 150px', columnGap: '10px' }}>
        {
        isLoggedIn ? (
          <div style={{ gridColumn: '3/4'}}>
            <>
            <button className='login-btn' onClick={handleModal}>{user} 님</button>
            {isModalOpen && <HeaderModal isModalOpen={isModalOpen} handleModalClose={handleModalClose} />}
            </>
          </div>
        ) : (
          <Link to="/login" style={{ gridColumn: '3/4' }}>
            <button className='login-btn'>로그인</button>
          </Link>
        )
        }
        <Link to="/join" style={{ gridColumn: '4/5' }}>
          <button className='login-btn'>회원가입</button>
        </Link>
      </div>

      <Link to="/cocktail" className={`header-menu-box ${selectedMenu === 'cocktail' ? 'selected' : ''}`} onClick={() => handleMenuClick('cocktail')}>
        <li className='header-menu'>칵테일</li>
        <div className='header-animationbar'></div>
      </Link>

      <Link to="/ingredient" className={`header-menu-box ${selectedMenu === 'ingredient' ? 'selected' : ''}`} onClick={() => handleMenuClick('ingredient')}>
        <li className='header-menu'>재료</li>
        <div className="header-animationbar"></div>
      </Link>

      <Link to="/board" className={`header-menu-box ${selectedMenu === 'board' ? 'selected' : ''}`} onClick={() => handleMenuClick('board')}>
        <li className='header-menu'>게시판</li>
        <div className="header-animationbar"></div>
      </Link>

      <Link to="/signature" className={`header-menu-box ${selectedMenu === 'signature' ? 'selected' : ''}`} onClick={() => handleMenuClick('signature')}>
        <li className='header-menu'>시그니처</li>
        <div className="header-animationbar"></div>
      </Link>

      <Link to="/" className={`header-menu-box ${selectedMenu === 'class' ? 'selected' : ''}`} onClick={() => handleMenuClick('class')}>
        <li className='header-menu'>클래스</li>
        <div className="header-animationbar"></div>
      </Link>


      <div style={{ gridColumn: '6/7', position: 'relative' }}>
        <img src={search} style={{ position: 'absolute', right: '5px', top: '4.5px', cursor: 'pointer' }}></img>
        <form onSubmit={onSubmit}>
          <input type="text" className='header-search' value={inputValue} onChange={handleChange} placeholder='만들고 싶은 칵테일 또는 재료를 검색하세요 :)'></input>
        </form>
      </div>
    </div>
  )
}

export default Header;