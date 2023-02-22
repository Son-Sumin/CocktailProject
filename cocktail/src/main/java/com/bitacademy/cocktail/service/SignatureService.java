package com.bitacademy.cocktail.service;

import java.io.File;
import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.bitacademy.cocktail.domain.Signature;
import com.bitacademy.cocktail.repository.SignatureRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class SignatureService {

	/* SignatureRepository 생성자 주입 */
	private final SignatureRepository signatureRepository;

	/* 시그니처 리스트 */
	public List<Signature> listSignature() {
		return signatureRepository.findAll();
	}

	/* 시그니처 1개 게시글 보기 */
	public Signature findSigView(Long no) {
		return signatureRepository.findByNo(no).get();
	}

	/* 시그니처 작성 */
	public void add(Signature signature, MultipartFile file) throws Exception {
		
		// 프로젝트 경로 설정
		String projectPath = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\files";
		
		// 식별자 (파일 이름에 붙일 임의의 문자 생성)
		UUID uuid = UUID.randomUUID();
		
		// 저장될 파일이름 : 임의의 문자_원래 파일이름
		String fileName = uuid + "_" + file.getOriginalFilename();
		
		// MultipartFile file 넣어줄 껍데기 지정 (경로, "파일이름")
		File saveFile = new File(projectPath, "name");
		
		file.transferTo(saveFile);
		
		signatureRepository.save(signature);
	}

	/* 글 삭제 */
	public void delete(Long no) {
		signatureRepository.deleteByNo(no);
	}

	/* 글 수정 */
	public void modify(Signature signature) {
		signatureRepository.save(signature);
	}
	
	/* 조회수 올리기 */
	public void updateHit(Long no) {
		signatureRepository.updateHit(no);
	}
	
//	/* 좋아요 올리기 */
//	public void updateLike(Long no) {
//		signatureRepository.updateLike(no);
//	}
	
}