/* eslint-disable */
import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// 스크롤 최상단으로 올리기
function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

// 칵테일 JSON파일
async function getCocktail(setCocktail) {
    const cocktailData = await axios.get(
        '/cocktail'
    );
    setCocktail(cocktailData.data);
}

// 재료 JSON파일
async function getIngredient(setIngredient) {
    const ingredientData = await axios.get(
        '/ingredient'
    );
    setIngredient(ingredientData.data);
}

// 사진 JSON파일
async function getBanner(setBanner) {
    const bannerData = await axios.get(
        '/banner'
    );
    setBanner(bannerData.data);
}

// 게시판 JSON파일
async function getBoard(setBoard) {
    const boardData = await axios.get(
        '/board/list'
    );
    setBoard(boardData.data);
}

export {getCocktail, getIngredient, ScrollToTop, getBanner, getBoard};