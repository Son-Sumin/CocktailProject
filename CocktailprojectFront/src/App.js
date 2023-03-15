/* eslint-disable */
import React, { useEffect, useState } from "react";
import './App.css';
import { Routes, Route, Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from './header';
import Main from './main/main';
import Join from "./user/join";
import Login from "./user/login";
import MyPage from "./user/mypage";
import Cocktail from './cocktail/cocktail';
import CocktailDetail from './cocktail/cocktailDetail';
import Ingredient from "./ingredient/ingredient";
import IngredientDetail from "./ingredient/IngredientDetail";
import Board from "./board/board";
import Signature from "./signature/signature";
import SignatureDetail from "./signature/signatureDetail";
import { getCocktail, getIngredient, ScrolToTop, getBanner, getBoard} from "./api";
import SignatureJoin from "./signature/signatureJoin";
import Map from "./map/map";

import BoardDetail from "./board/boardIn";
import Search from "./search";
import Writing from "./board/writing";
import BoardRe from "./board/boardRe";


function App() {
  // 서버에서 받아온 토큰
  const token = localStorage.getItem('accessToken');

  // 몇몇 페이지에서 헤더를 포함할지 말지를 지정하는 location 변수
  const location = useLocation();

  // api.js의 axios를 통해서 서버에서 받아온 각종 데이터들
  const [cocktail, setCocktail] = useState([]);
  const [ingredient, setIngredient] = useState([]);
  const [banner, setBanner] = useState([]);
  const [board, setBoard] = useState([]);

  // localStorage에서 isLoggedIn 값을 가져옴. 값이 없으면 false를 반환합니다.
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    return isLoggedIn ? JSON.parse(isLoggedIn) : false;
  });

  // 로그인 시 서버에서 보내준 유저에 관한 정보를 보관해주기 위한 state
  const [user, setUser] = useState("");
  const [likePlace, setLikePlace] = useState([]);

  console.log("유저정보: " + user);
  // console.log("likePlace: " + JSON.stringify(likePlace));


  // 칵테일 JSON파일
  useEffect(() => {
    getCocktail(setCocktail);
  }, []);

  // 재료 JSON파일
  useEffect(() => {
    getIngredient(setIngredient);
  }, [])

  // 배너 JSON파일
  useEffect(() => {
    getBanner(setBanner);
  }, [])

  // 게시판 JSON파일
  useEffect(() => {
    getBoard(setBoard);
  }, [])

  // 로그인 한 유저정보 받아옴
  useEffect(() => {
    axios.get('/member/info', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      // 유저 정보를 처리
      setUser(response.data.name);
      setLikePlace(response.data.likePlace);

      console.log("로그인여부: " + isLoggedIn);
    }).catch(error => {
        // 에러를 처리
        console.error(error);
      });
  }, [token]);

  // isLoggedIn 값이 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  // 로그아웃 시에 localStorage에 저장된 token 삭제
  const removeToken = useEffect(() => {
    if (!isLoggedIn) {
      localStorage.setItem('accessToken', '');
    }
  }, []);

  // 최상단 이동 버튼
  // const buttonClick = () => {
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // };
  // const [yPosition, setYPosition] = useState(0);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setYPosition(window.scrollY);
  //   };
  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [yPosition]);

  return (
    <>
      <div className="App">
        {!['/join', '/login', '/mypage'].includes(location.pathname) && 
          <Header setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} user={user} removeToken={removeToken} token={token} />} 
        <Routes>
          <Route path="/" element={<Main banner={banner} />}></Route>
          <Route path="/join" element={<Join />}></Route>
          <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>
          <Route path="/cocktail" element={<Cocktail cocktail={cocktail} isLoggedIn={isLoggedIn} />}></Route>
          <Route path="/cocktail/:no" element={<CocktailDetail cocktail={cocktail} token={token} isLoggedIn={isLoggedIn} />}></Route>
          <Route path="/ingredient" element={<Ingredient ingredient={ingredient} />}></Route>
          <Route path="/ingredient/:no" element={<IngredientDetail ingredient={ingredient} />}></Route>
          <Route path="signature" element={<Signature />}></Route>
          <Route path="signature/:no" element={<SignatureDetail />}></Route>
          <Route path="signature/join" element={<SignatureJoin ingredient={ingredient} />}></Route>
          {/* <Route path="/map" element={<Map />}></Route> */}

          <Route path="/board" element={<Board board={board} />}></Route>
          <Route path="/board/view/:no" element={<BoardDetail board={board} token={token} />}></Route>
          <Route path="/search/:Sdata" element={<Search cocktail={cocktail} ingredient={ingredient} />}></Route>
          <Route path='/writing' element={<Writing board={board} token={token} />} />
          <Route path='/board/update/:no' element={<BoardRe board={board} token={token} />} />
        </Routes>
      </div>
      {/* <button onClick={buttonClick}
        style={{position:'fixed', padding:'5px 10px', right:'10px', bottom:'10px', borderRadius:'5px', 
        backgroundColor:'rgb(216, 167, 7)', border:'0px', cursor:'pointer'}}>▲</button> */}
    </>
  );
}

export default App;
