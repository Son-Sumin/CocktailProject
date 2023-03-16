package com.bitacademy.cocktail.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

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
	//private final IngredientRepository ingredientRepository;
	
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
	public void addRecipe(Long signatureNo, SignatureRecipe recipe) {
		
		Signature signature = signatureRepository.findByNo(signatureNo);
		
		SignatureRecipe sigRecipe = new SignatureRecipe();
		sigRecipe.setSignature(signature);
		sigRecipe.setIngredient(recipe.getIngredient());
		sigRecipe.setAmount(recipe.getAmount());
		sigRecipe.setUnit(recipe.getUnit());
		
		signatureRecipeRepository.save(sigRecipe);
	}
	
	/* 시그니처 레시피 삭제 */
	public void deleteRecipe(Long signatureNo) {
		signatureRecipeRepository.deleteBySignatureNo(signatureNo);
	}
}
