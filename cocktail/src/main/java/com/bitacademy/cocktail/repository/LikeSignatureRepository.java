package com.bitacademy.cocktail.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bitacademy.cocktail.domain.LikeSignature;
import com.bitacademy.cocktail.domain.Member;
import com.bitacademy.cocktail.domain.Signature;

public interface LikeSignatureRepository extends JpaRepository<LikeSignature, Long> {
	
	void deleteByNo(Long no);

	Optional<LikeSignature> findByMemberAndSignature(Member member, Signature signature);

	String countBySignature(Signature signature);

}
