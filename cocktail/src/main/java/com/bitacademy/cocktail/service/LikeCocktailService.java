package com.bitacademy.cocktail.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bitacademy.cocktail.domain.Cocktail;
import com.bitacademy.cocktail.domain.LikeCocktail;
import com.bitacademy.cocktail.domain.Member;
import com.bitacademy.cocktail.repository.CocktailRepository;
import com.bitacademy.cocktail.repository.LikeCocktailRepository;

@Transactional
@Service
public class LikeCocktailService {

	@Autowired
	LikeCocktailRepository likeCocktailRepository;
	
	@Autowired
	CocktailRepository cocktailRepository;
	
	public void addLike(Member member, Long no) {
		Cocktail cocktail = cocktailRepository.findByNo(no);
		
		if(notLike(member, cocktail)) {
			LikeCocktail likeCocktail = LikeCocktail.builder()
											.member(member)
											.cocktail(cocktail)
											.build();
			likeCocktailRepository.save(likeCocktail);
			System.out.println("좋아요성공");
		} else {
			likeCocktailRepository.deleteByNo(
					likeCocktailRepository.findBymemberAndCocktail(member, cocktail).get().getNo());
			System.out.println("좋아요취소");
		}
	}
	public boolean notLike(Member member, Cocktail cocktail) {
		return likeCocktailRepository.findBymemberAndCocktail(member, cocktail).isEmpty();
	}
	
	public String countLiked(Long no) {
		Cocktail cocktail = cocktailRepository.findByNo(no);
		return likeCocktailRepository.countByCocktail(cocktail);
	}
}
