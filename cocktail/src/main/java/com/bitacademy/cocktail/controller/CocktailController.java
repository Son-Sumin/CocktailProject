package com.bitacademy.cocktail.controller;

import java.util.List;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bitacademy.cocktail.domain.Cocktail;
import com.bitacademy.cocktail.domain.CocktailRecipe;
import com.bitacademy.cocktail.domain.Member;
import com.bitacademy.cocktail.jwt.SecurityUtil;
import com.bitacademy.cocktail.service.CocktailRecipeService;
import com.bitacademy.cocktail.service.CocktailService;
import com.bitacademy.cocktail.service.LikeCocktailService;
import com.bitacademy.cocktail.service.MemberService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/cocktail")
@RequiredArgsConstructor
public class CocktailController {
	
	/* 생성자 주입 */
	private final CocktailService cocktailService;
	private final CocktailRecipeService cocktailRecipeService;
	private final MemberService memberService;
	private final LikeCocktailService likeCocktailService;
	
	/* 칵테일 목록 */
	@CrossOrigin(origins = "*")
	@GetMapping({"", "/list"})
	public List<Cocktail> list() {
		return cocktailService.listCocktail();
	}

	/* 칵테일 게시글 보기 + 칵테일별 재료 목록 */
	@CrossOrigin(origins = "*")
	@GetMapping("/view/{no}")
	public Cocktail view(@PathVariable("no") Long no, Model model, CocktailRecipe cocktailRecipe) {
		cocktailRecipeService.findByCocktail(no, cocktailRecipe);
		return cocktailService.findCocktailView(no);
	}
	
	/* 칵테일 좋아요 */
	@CrossOrigin(origins = "*")
	@PostMapping("/like/{no}")
	public void addLike(@PathVariable("no") Long no) {
		Member member = memberService.memberInfo(SecurityUtil.getCurrentMemberId()).get();
		likeCocktailService.addLike(member, no);
	}
	
	/* 좋아요 확인 */
	@CrossOrigin(origins = "*")
	@GetMapping("/isliked/{no}")
	public boolean isLiked(@PathVariable("no") Long no) {
		Cocktail cocktail = cocktailService.findCocktailView(no);
		Member member = memberService.memberInfo(SecurityUtil.getCurrentMemberId()).get();
//		System.out.println(!likeCocktailService.notLike(member, cocktail));
		return !likeCocktailService.notLike(member, cocktail);
	}
	
	/* 좋아요 갯수 */
	@CrossOrigin(origins = "*")
	@GetMapping("/countliked/{no}")
	public String countLiked(@PathVariable("no") Long no) {
		return likeCocktailService.countLiked(no);
	}
	
}


///* 칵테일 글 작성 */
//@PostMapping("/form")
//public List<Cocktail> enrollCocktail(@ModelAttribute Cocktail form) {
//
//	Cocktail cocktail = new Cocktail();
//
//	cocktail.setType(form.getType());
//	cocktail.setName(form.getName());
//	cocktail.setEngName(form.getEngName());
//	cocktail.setCocktailContents(form.getCocktailContents());
//	cocktail.setRecipeContents(form.getRecipeContents());
//
//	cocktailService.add(cocktail);
//	return cocktailService.listCocktail();
//}