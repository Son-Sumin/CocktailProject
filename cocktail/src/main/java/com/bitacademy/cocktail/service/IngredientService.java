package com.bitacademy.cocktail.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.bitacademy.cocktail.domain.Ingredient;
import com.bitacademy.cocktail.repository.IngredientRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class IngredientService {
	
	/* IngredientRepository, CocktailRecipeRepository 생성자 주입 */
	private final IngredientRepository ingredientRepository;

	/* 재료 목록 불러오기 */
	public List<Ingredient> listIngredient() {
		return ingredientRepository.findAll();
	}

	/* 재료 게시글 불러오기 */
	public Ingredient findIngredientView(Long no) {
		return ingredientRepository.findByNo(no);
	}

}
