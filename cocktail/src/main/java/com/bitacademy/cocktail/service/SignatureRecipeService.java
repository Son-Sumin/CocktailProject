package com.bitacademy.cocktail.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.bitacademy.cocktail.domain.Ingredient;
import com.bitacademy.cocktail.domain.Signature;
import com.bitacademy.cocktail.domain.SignatureRecipe;
import com.bitacademy.cocktail.repository.IngredientRepository;
import com.bitacademy.cocktail.repository.SignatureRecipeRepository;
import com.bitacademy.cocktail.repository.SignatureRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class SignatureRecipeService {
	
	/* 생성자 주입 */
	private final SignatureRepository signatureRepository;
	private final SignatureRecipeRepository signatureRecipeRepository;
	private final IngredientRepository ingredientRepository;
	
	/* 시그니처 레시피 리스트 */
	public List<SignatureRecipe> listSignatureRecipe() {
		return signatureRecipeRepository.findAll();
	}
	
	/* signatureNo에 따른 칵테일 레시피 */
	public List<SignatureRecipe> findBySignature(Long signatureNo, SignatureRecipe signatureRecipe) {
		Signature signature = signatureRepository.findByNo(signatureNo);
		signatureRecipe.setSignature(signature);
		return signatureRecipeRepository.findBySignatureNo(signatureNo);
	}
	
	/* 시그니처 레시피 등록 */
	public void addRecipes(List<SignatureRecipe> recipes, Long signatureNo) {
		
		Signature signature = signatureRepository.findByNo(signatureNo);
		
		List<SignatureRecipe> signatureRecipes  = new ArrayList<>();
		
		System.out.println("signature : " + signature);
		
		for(SignatureRecipe recipe : recipes) {
			
//			Ingredient ingredient = ingredientRepository.findByNo(recipe.getIngredient().getNo());
//			System.out.println("ingredient 22 : " + ingredient);
			
			SignatureRecipe sigRecipe = new SignatureRecipe();
			sigRecipe.setSignature(signature);
			sigRecipe.setIngredient(recipe.getIngredient());
			//sigRecipe.setIngredient(ingredient);
			//sigRecipe.setIngredient(ingredientRepository.findByNo(recipe.getIngredient().getNo()));
			sigRecipe.setAmount(recipe.getAmount());
			sigRecipe.setUnit(recipe.getUnit());
			
			System.out.println("sigRecipe1 : " + sigRecipe);
			
			signatureRecipes .add(sigRecipe);
			
			System.out.println("sigRecipe2 : " + sigRecipe);
			
			signatureRecipeRepository.saveAll(signatureRecipes);
		}
		
		System.out.println("signatureRecipes : " + recipes);
	}
	
	/* 시그니처 레시피 삭제 */
	public void deleteRecipe(Long signatureNo) {
		signatureRecipeRepository.deleteBySignatureNo(signatureNo);
	}
}
