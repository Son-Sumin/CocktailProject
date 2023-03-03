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

export {getCocktail, getIngredient, ScrollToTop};