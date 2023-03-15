package com.bitacademy.cocktail.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bitacademy.cocktail.domain.Cocktail;
import com.bitacademy.cocktail.domain.LikeCocktail;
import com.bitacademy.cocktail.domain.Member;

public interface LikeCocktailRepository extends JpaRepository<LikeCocktail, Long>{

	void deleteByNo(Long no);

	Optional<LikeCocktail> findBymemberAndCocktail(Member member, Cocktail cocktail);
	
	String countByCocktail(Cocktail cocktail);
}
