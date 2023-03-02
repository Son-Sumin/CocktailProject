package com.bitacademy.cocktail.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bitacademy.cocktail.domain.Banner;

public interface BannerRepository extends JpaRepository<Banner, Long> {

	void deleteByNo(Long no);
	
	Banner findByNo(Long no);

	byte[] findByFilename(String filename);

}