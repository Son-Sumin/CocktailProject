package com.bitacademy.cocktail.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bitacademy.cocktail.domain.CocktailRecipe;

public interface CocktailRecipeRepository extends JpaRepository<CocktailRecipe, Long> {

	List<CocktailRecipe> findByCocktailNo(Long cocktailNo);
	
	List<CocktailRecipe> findByIngredientNo(Long ingredientNo);
}
