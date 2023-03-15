/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import './App.css';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";

// 회원메뉴 모달창 (하위 컴포넌트)
function HeaderModal(props) {
  const { isModalOpen, handleModalClose, token} = props;

  // 모달창 이외의 부분 클릭시 모달창 닫기
  if (!isModalOpen) return null;

  // 로그아웃 시 토큰삭제 & isLoggedIn false로 변경
  const handleLogout = () => {
    handleModalClose;

    axios.post('/member/logout', {}, {
      headers: {
        Authorization: `${token}`
      }
    }).then(res => {
      console.log("로그아웃 서버전달 성공!");
    }).catch(() => {
      console.log("로그아웃 서버전달 실패ㅠㅠ");
    })

    props.setIsLoggedIn(false);
    props.removeToken;

    // setTimeout(() => {
      window.location.reload();
    // }, 1000);
  }

  return (
    <div>
      <div className="overlay" onClick={handleModalClose}></div>
        <div className="modal-container">
          <Link to="/mypage" style={{fontSize:'20px'}} onClick={handleModalClose}>
            <span className="modal-container-contents">마이페이지</span>
          </Link>
          <Link to="/signature/join">
            <span className="modal-container-contents" onClick={handleModalClose}>시그니처 참가하기</span>
          </Link>
          <div className="modal-contents-logout" onClick={handleLogout}>
            <span>로그아웃</span>
          </div>
        </div>
    </div>
  )
}




// 헤더 (상위 컴포넌트)
function Header(props) {
  const navigate = useNavigate();
  const { setIsLoggedIn, isLoggedIn, user, removeToken, token } = props;

  const [selectedMenu, setSelectedMenu] = useState(''); // 현재 선택된 메뉴
  const [isModalOpen, setIsModalOpen] = useState(false); // 회원 메뉴바

  const bannerLogo = process.env.PUBLIC_URL + '/project-logo.png';
  const search = process.env.PUBLIC_URL + '/search.png';


  // 모달 핸들러
  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  }
  function handleModal() {
    setIsModalOpen(true);
    // console.log("회원모달메뉴: " + isModalOpen);
  }
  function handleModalClose() {
    setIsModalOpen(false);
  }


  //검색
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
        <Link to="/" onClick={() => handleMenuClick('')}>
          <img src={bannerLogo} alt="project-logo" />
        </Link>
      </div>
      <div style={{ gridColumn: '5/6' }}></div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px 200px 150px', columnGap: '10px' }}>
        {
        isLoggedIn ? (
          <div style={{ gridColumn: '3/4'}}>
            <>
            <button className='login-btn' onClick={handleModal} style={{color:'black'}}>{user} 님</button>
            {isModalOpen && <HeaderModal isModalOpen={isModalOpen} handleModalClose={handleModalClose} 
              setIsLoggedIn={setIsLoggedIn} removeToken={removeToken} token={token}/>}
            </>
          </div>
        ) : (
          <div style={{ gridColumn: '3/4' }}>
            <button className='login-btn'>
              <Link to="/login">로그인</Link>
            </button>
          </div>
        )
        }
        <div style={{ gridColumn: '4/5' }}>
          <button className='login-btn'>
            <Link to="/join">회원가입</Link>
          </button>
        </div>
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

      <Link to="/map" className={`header-menu-box ${selectedMenu === 'class' ? 'selected' : ''}`} onClick={() => handleMenuClick('class')}>
        <li className='header-menu'>주변Bar</li>
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