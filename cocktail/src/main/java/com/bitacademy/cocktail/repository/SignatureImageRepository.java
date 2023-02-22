package com.bitacademy.cocktail.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bitacademy.cocktail.domain.SignatureImage;

public interface SignatureImageRepository extends JpaRepository<SignatureImage, Long> {

}
