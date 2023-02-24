package com.bitacademy.cocktail.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bitacademy.cocktail.domain.SignatureImage;

public interface SignatureImageRepository extends JpaRepository<SignatureImage, Long> {

	List<SignatureImage> findBySignature_No(Long signatureNo);
	
	void deleteByNo(Long no);
	
	void deleteBySignature_No(Long signatureNo);
	
//	@Query("DELETE FROM SignatureImage si "
//			+ "WHERE si.no IN (:deleteImages)")
//	public void deleteByNo(@Param("deleteImages") List<Long> deleteImages);

}
