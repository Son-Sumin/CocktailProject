package com.bitacademy.cocktail.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.bitacademy.cocktail.domain.Ingredient;
import com.bitacademy.cocktail.domain.Signature;
import com.bitacademy.cocktail.domain.SignatureRecipe;
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
	
	/* 시그니처 레시피 리스트 */
	public List<SignatureRecipe> listSignatureRecipe() {
		return signatureRecipeRepository.findAll();
	}
	
	/* signatureNo에 따른 칵테일 레시피 */
	public List<SignatureRecipe> findBySignature(Long signatureNo, SignatureRecipe signatureRecipe) {
		Optional<Signature> signature = signatureRepository.findByNo(signatureNo);
		//signatureRecipe.setSignature(signature).get();
		return signatureRecipeRepository.findBySignatureNo(signatureNo);
	}
	
	public void addRecipes(Signature signature, List<SignatureRecipe> recipes) {
		
		List<SignatureRecipe> signatureRecipes = new ArrayList<>();
		
		for(SignatureRecipe recipe : recipes) {
			
			SignatureRecipe sigRecipe = new SignatureRecipe();
			sigRecipe.setSignature(signature);
			sigRecipe.setIngredient(signatureRecipeRepository.findIngredient(recipe.getIngredient()));
			sigRecipe.setAmount(recipe.getAmount());
			sigRecipe.setUnit(recipe.getUnit());
			signatureRecipes.add(sigRecipe);
			
			signatureRecipeRepository.saveAll(signatureRecipes);
		}
	}
	
	public void findByIngredient(Ingredient ingredient) {
		signatureRecipeRepository.findIngredient(ingredient);
	}
	
//	/* 시그니처 작성 */
//	public SignatureRecipe add(SignatureRecipe signatureRecipe) {		
//		return signatureRecipeRepository.save(signatureRecipe);
//	}
}
