package com.bitacademy.cocktail.service;

import java.io.File;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.bitacademy.cocktail.domain.Signature;
import com.bitacademy.cocktail.domain.SignatureImage;
import com.bitacademy.cocktail.repository.SignatureImageRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class SignatureImageService {
	
	/* SignatureRepository 생성자 주입 */
	private final SignatureImageRepository signatureImageRepository;
	
	public void add(Signature signature, SignatureImage signatureImage, MultipartFile file) throws Exception {
		
		// 프로젝트 경로 설정, 랜덤한 문자열이 들어간 파일이름 설정
		String projectPath = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\files";
		UUID uuid = UUID.randomUUID();
		String fileName = uuid + "_" + file.getOriginalFilename();
		
		// MultipartFile file 넣어줄 껍데기 지정 (경로, "파일이름")
		File saveFile = new File(projectPath, fileName);
		file.transferTo(saveFile);
		
		signatureImage.setName(fileName);
		signatureImage.setPath("/files/" + fileName);
		signatureImage.setSignature(signature);
		
		signatureImageRepository.save(signatureImage);
	}

}
