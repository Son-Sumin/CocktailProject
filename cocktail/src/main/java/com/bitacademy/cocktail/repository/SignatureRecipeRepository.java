package com.bitacademy.cocktail.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bitacademy.cocktail.domain.SignatureRecipe;

public interface SignatureRecipeRepository extends JpaRepository<SignatureRecipe, Long>{

	List<SignatureRecipe> findBySignature_No(Long signatureNo);

}

