package com.bitacademy.cocktail.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bitacademy.cocktail.domain.Ingredient;

public interface IngredientRepository extends JpaRepository<Ingredient, Long> {

	Ingredient findByNo(Long no);

	Ingredient findByName(String name);
	
}
