package com.bitacademy.cocktail.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bitacademy.cocktail.domain.SignatureImage;

public interface SignatureImageRepository extends JpaRepository<SignatureImage, Long> {

	List<SignatureImage> findBySignatureNo(Long signatureNo);
	
	void deleteByNo(Long no);
	
	void deleteBySignatureNo(Long signatureNo);

}
