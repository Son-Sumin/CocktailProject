package com.bitacademy.cocktail.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bitacademy.cocktail.domain.LikePlace;
import com.bitacademy.cocktail.domain.Member;
import com.bitacademy.cocktail.domain.Place;

public interface LikePlaceRepository extends JpaRepository<LikePlace, Long>{
	
	void deleteByNo(Long no);

	Optional<LikePlace> findByMemberAndPlace(Member member, Place place);

	String countByPlace(Place place);

}
