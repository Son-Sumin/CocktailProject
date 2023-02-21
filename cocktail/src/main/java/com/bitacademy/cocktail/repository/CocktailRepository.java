package com.bitacademy.cocktail.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bitacademy.cocktail.domain.Cocktail;;

public interface CocktailRepository extends JpaRepository<Cocktail, Long> {

	Cocktail findByNo(Long no);

}
