/* eslint-disable */
import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
import {Routes, Route, Link, useParams, useLocation } from 'react-router-dom';
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
import {getBanner, getCocktail, getIngredient, ScrolToTop} from "./api";
import SignatureJoin from "./signature/signatureJoin";

function App() {
  const [cocktail, setCocktail] = useState([]);
  const [ingredient, setIngredient] = useState([]);

  const location = useLocation();

  // 칵테일 JSON파일
  useEffect(() => {
    getCocktail(setCocktail);
  },[]);

  // 재료 JSON파일
  useEffect(() => {
    getIngredient(setIngredient);
  },[])

  return (
    <div className="App">
      {location.pathname !== '/join' && location.pathname !== '/login' && <Header /> }
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/join" element={<Join />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/cocktail" element={<Cocktail cocktail={cocktail} />}></Route>
        <Route path="/cocktail/:no" element={<CocktailDetail cocktail={cocktail} />}></Route>
        <Route path="/ingredient" element={<Ingredient ingredient={ingredient} />}></Route>
        <Route path="/ingredient/:no" element={<IngredientDetail ingredient={ingredient} />}></Route>
        <Route path="/board" element={<Board />}></Route>
        <Route path="signature" element={<Signature />}></Route>
        <Route path="signature/:no" element={<SignatureDetail />}></Route>
        <Route path="signature/join" element={<SignatureJoin ingredient={ingredient} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
