package com.bitacademy.cocktail.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bitacademy.cocktail.domain.Signature;

public interface SignatureRepository extends JpaRepository<Signature, Long> {

	Signature findByNo(Long no);

	void deleteByNo(Long no);
	
	@Modifying(clearAutomatically = true)
	@Query("update signature as s set s.hit = s.hit + 1 where s.no = :no")
	void updateHit(@Param("no") Long no);
	
//	@Modifying(clearAutomatically = true)
//	@Query("update signature as s set s.like = s.like + 1 where s.no = :no")
//	void updateLike(@Param("no") Long no);
	
}