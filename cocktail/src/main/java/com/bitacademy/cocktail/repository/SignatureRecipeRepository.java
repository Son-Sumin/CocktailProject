package com.bitacademy.cocktail.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bitacademy.cocktail.domain.Ingredient;
import com.bitacademy.cocktail.domain.SignatureRecipe;

public interface SignatureRecipeRepository extends JpaRepository<SignatureRecipe, Long>{

	List<SignatureRecipe> findBySignatureNo(Long signatureNo);

	void deleteBySignatureNo(Long signatureNo);

//	@Query(value= "SELECT r, i FROM signatureRecipe r, ingredient i "
//			+ "WHERE i.name = :name",
//			nativeQuery=true)
	
//	@Query("SELECT i FROM Ingredient i "
//			+ "WHERE i. = :#{ingredient.no}")
//	Ingredient findIngredient(@Param(value = "ingredient") Ingredient ingredient);

}

