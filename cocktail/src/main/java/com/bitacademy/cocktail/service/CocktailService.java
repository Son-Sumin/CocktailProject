package com.bitacademy.cocktail.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bitacademy.cocktail.domain.Cocktail;
import com.bitacademy.cocktail.repository.CocktailRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CocktailService {

	/* 생성자 주입 */
	private final CocktailRepository cocktailRepository;

	/* 칵테일 추가하기 */
	public Cocktail add(Cocktail cocktail) {
		return cocktailRepository.save(cocktail);
	}
	
	/* 칵테일 목록 불러오기 */
	public List<Cocktail> listCocktail() {
		return cocktailRepository.findAll();
	}

	/* 칵테일 게시글 불러오기 */
	public Cocktail findCocktailView(Long no) {
		return cocktailRepository.findByNo(no);
	}

}
