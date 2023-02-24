package com.bitacademy.cocktail.controller;

import java.util.List;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bitacademy.cocktail.domain.Cocktail;
import com.bitacademy.cocktail.domain.CocktailRecipe;
import com.bitacademy.cocktail.service.CocktailRecipeService;
import com.bitacademy.cocktail.service.CocktailService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/cocktail")
@RequiredArgsConstructor
public class CocktailController {
	
	/* 생성자 주입 */
	private final CocktailService cocktailService;
	private final CocktailRecipeService cocktailRecipeService;
	
	/* 칵테일 목록 */
	@GetMapping({"", "/list"})
	public List<Cocktail> list(Model model) {
		List<Cocktail> cocktail = cocktailService.listCocktail();
		model.addAttribute("cocktails", cocktail);
		return cocktailService.listCocktail();
	}

	/* 칵테일 글 작성 */
	@PostMapping("/form")
	public List<Cocktail> enrollCocktail(@ModelAttribute Cocktail form) {

		Cocktail cocktail = new Cocktail();

		cocktail.setType(form.getType());
		cocktail.setName(form.getName());
		cocktail.setEngName(form.getEngName());
		cocktail.setCocktailContents(form.getCocktailContents());
		cocktail.setRecipeContents(form.getRecipeContents());

		cocktailService.add(cocktail);
		return cocktailService.listCocktail();
	}

	/* 칵테일 게시글 보기 + 칵테일별 재료 목록 */
	@GetMapping("/view/{no}")
	public Cocktail view(@PathVariable("no") Long no, Model model, CocktailRecipe cocktailRecipe) {
		// 칵테일 게시글 보기
		model.addAttribute("cocktail", cocktailService.findCocktailView(no));
		
		//칵테일별 재료 목록
		List<CocktailRecipe> list =  cocktailRecipeService.findByCocktail(no, cocktailRecipe);
		model.addAttribute("cocktailRecipes", list);
		
		return cocktailService.findCocktailView(no);
	}
	
}