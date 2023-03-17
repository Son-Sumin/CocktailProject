package com.bitacademy.cocktail.repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.bitacademy.cocktail.domain.ReviewSignature;

public interface ReviewSignatureRepository extends JpaRepository<ReviewSignature, Long> {
	
	@EntityGraph(attributePaths = {"signature"})
	List<ReviewSignature> findBySignatureNo(@Param("no") Long signatureNo);

	void deleteByNo(Long no);
}
