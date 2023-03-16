package com.bitacademy.cocktail.service;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.bitacademy.cocktail.domain.LikeSignature;
import com.bitacademy.cocktail.domain.Member;
import com.bitacademy.cocktail.domain.Signature;
import com.bitacademy.cocktail.repository.LikeSignatureRepository;
import com.bitacademy.cocktail.repository.SignatureRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class LikeSignatureService {

	/* 생성자 주입 */
	private final LikeSignatureRepository likesignatureRepository;
	private final SignatureRepository signatureRepository;

	/* 좋아요 또는 해제 */
	public void addlike(Member member, Long no) {
		Signature signature = signatureRepository.findByNo(no);
		
		if(notLike(member, signature)) {
			LikeSignature likeSignature = LikeSignature.builder()
											.member(member)
											.signature(signature)
											.build();
			likesignatureRepository.save(likeSignature);
			System.out.println("좋아요성공");
		} else {
			likesignatureRepository.deleteByNo(
					likesignatureRepository.findByMemberAndSignature(member, signature).get().getNo());
			System.out.println("좋아요취소");
		}
	}
	
	/* 좋아요 확인 */
	public boolean notLike(Member member, Signature signature) {
		return likesignatureRepository.findByMemberAndSignature(member, signature).isEmpty();
	}

	/* 좋아요 갯수 */
	public String countLiked(Long no) {
		Signature signature = signatureRepository.findByNo(no);
		return likesignatureRepository.countBySignature(signature);
	}
}
