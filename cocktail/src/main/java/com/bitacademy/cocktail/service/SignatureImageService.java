package com.bitacademy.cocktail.service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
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
	
	/* 멀티파일 리스트 */
	public List<SignatureImage> listSigImage() {
		return signatureImageRepository.findAll();
	}
	
	/* 멀티파일 업로드 */
	public void addImages(
			Signature signature, SignatureImage signatureImage,
			List<MultipartFile> files) throws Exception {
		
		List<SignatureImage> signatureImages = new ArrayList<>();
		
		for(MultipartFile file : files) {
			if(!file.isEmpty()) {
		
				// 프로젝트 경로 설정, 랜덤한 문자열이 들어간 파일이름 설정
				String projectPath = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\files";
				UUID uuid = UUID.randomUUID();
				String fileName = uuid + "_" + file.getOriginalFilename();
				
				// MultipartFile file 넣어줄 껍데기 지정 (경로, "파일이름")
				File saveFile = new File(projectPath, fileName);
				file.transferTo(saveFile);
				
				// 사진 1장씩 List<SignatureImage>에 추가
				SignatureImage img = new SignatureImage();
				img.setName(file.getOriginalFilename());
				img.setPath("/files/" + fileName);
				img.setSignature(signature);
				signatureImages.add(img);
				
				signatureImageRepository.saveAll(signatureImages);
			}
		}
	}
	
	/* 멀티파일 삭제 */
	public void deleteImage(Long signatureNo) {
		signatureImageRepository.deleteBySignature_No(signatureNo);
	}
	
}
