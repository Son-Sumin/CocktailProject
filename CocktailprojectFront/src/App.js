/* eslint-disable */
import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from './header';
import Main from './main/main';
import Join from "./user/join";
import Login from "./user/login";
import Cocktail from './cocktail/cocktail';
import CocktailDetail from './cocktail/cocktailDetail';
import Ingredient from "./ingredient/ingredient";
import IngredientDetail from "./ingredient/IngredientDetail";
import Board from "./board/board";
import Signature from "./signature/signature";
import SignatureDetail from "./signature/signatureDetail";
import { getCocktail, getIngredient, ScrolToTop, getBanner, getBoard } from "./api";
import SignatureJoin from "./signature/signatureJoin";

import BoardDetail from "./board/boardIn";
import Search from "./select";
import Writing from "./board/writing";
import BoardRe from "./board/boardRe";


function App() {
  const token = localStorage.getItem('accessToken');
  const location = useLocation();

  const [cocktail, setCocktail] = useState([]);
  const [ingredient, setIngredient] = useState([]);
  const [banner, setBanner] = useState([]);
  const [board, setBoard] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // localStorage에서 isLoggedIn 값을 가져옵니다. 값이 없으면 false를 반환합니다.
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    return isLoggedIn ? JSON.parse(isLoggedIn) : false;
  });

  const [user, setUser] = useState("");

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
    axios.get('member/info', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      // 유저 정보를 처리합니다.
      console.log(response.data);
      console.log("로그인여부: " + isLoggedIn);

      setUser(response.data.name);
    })
      .catch(error => {
        // 에러를 처리합니다.
        console.error(error);
      });
  }, [token]);

  useEffect(() => {
    // isLoggedIn 값이 변경될 때마다 localStorage에 저장합니다.
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  // 최상단 이동 버튼
  const buttonClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const [yPosition, setYPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setYPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="App">
        {location.pathname !== '/join' && location.pathname !== '/login' && <Header setIsLoggedIn={setIsLoggedIn} />}
        <Routes>
          <Route path="/" element={<Main banner={banner} />}></Route>
          <Route path="/join" element={<Join />}></Route>
          <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}></Route>
          <Route path="/cocktail" element={<Cocktail cocktail={cocktail} isLoggedIn={isLoggedIn} />}></Route>
          <Route path="/cocktail/:no" element={<CocktailDetail cocktail={cocktail} />}></Route>
          <Route path="/ingredient" element={<Ingredient ingredient={ingredient} />}></Route>
          <Route path="/ingredient/:no" element={<IngredientDetail ingredient={ingredient} />}></Route>
          <Route path="/board" element={<Board board={board} />}></Route>
          <Route path="signature" element={<Signature />}></Route>
          <Route path="signature/:no" element={<SignatureDetail />}></Route>
          <Route path="signature/join" element={<SignatureJoin ingredient={ingredient} />}></Route>

          <Route path="/board/:no" element={<BoardDetail board={board} />}></Route>
          <Route path="/search/:Sdata" element={<Search cocktail={cocktail} ingredient={ingredient} />}></Route>
          <Route path='/writing' element={<Writing board={board} />} />
          <Route path='/board/update/:no' element={<BoardRe board={board} />} />

        </Routes>
      </div>
      <button onClick={buttonClick} style={{ position: 'fixed', right: '10px', bottom: '10px' }}>⬆️</button>
    </>
  );
}

export default App;
