package com.bitacademy.cocktail.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bitacademy.cocktail.domain.SignatureRecipe;

public interface SignatureRecipeRepository extends JpaRepository<SignatureRecipe, Long>{

	List<SignatureRecipe> findBySignatureNo(Long signatureNo);

	void deleteBySignatureNo(Long signatureNo);

}

