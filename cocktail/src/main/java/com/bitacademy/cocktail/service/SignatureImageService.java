package com.bitacademy.cocktail.service;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.bitacademy.cocktail.repository.SignatureImageRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class SignatureImageService {
	
	/* SignatureRepository 생성자 주입 */
	private final SignatureImageRepository signatureImageRepository;

}
