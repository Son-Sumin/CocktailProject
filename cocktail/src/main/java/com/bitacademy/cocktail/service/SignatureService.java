package com.bitacademy.cocktail.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.bitacademy.cocktail.domain.Signature;
import com.bitacademy.cocktail.repository.SignatureRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class SignatureService {

	/* 생성자 주입 */
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
	public void add(Signature signature) {		
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