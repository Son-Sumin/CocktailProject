package com.bitacademy.cocktail.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bitacademy.cocktail.domain.Place;

public interface PlaceRepository extends JpaRepository<Place, Long>{

	Place findByNo(Long no);

}
