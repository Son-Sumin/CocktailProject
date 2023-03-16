package com.bitacademy.cocktail.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bitacademy.cocktail.domain.LikePlace;
import com.bitacademy.cocktail.domain.Member;
import com.bitacademy.cocktail.domain.Place;
import com.bitacademy.cocktail.repository.LikePlaceRepository;
import com.bitacademy.cocktail.repository.PlaceRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class LikePlaceService {
	
	/* 생성자 주입 */
	private final LikePlaceRepository likePlaceRepository;
	private final PlaceRepository placeRepository;

	/* 장소 좋아요 */
	public void addLike(Member member, Long no) {
		Place place = placeRepository.findByNo(no);
		
		if(notLike(member, place)) {
			LikePlace likePlace = LikePlace.builder()
											.member(member)
											.place(place)
											.build();
			likePlaceRepository.save(likePlace);
			System.out.println("좋아요성공");
		} else {
			likePlaceRepository
				.deleteByNo(likePlaceRepository.findByMemberAndPlace(member, place).get().getNo());
			System.out.println("좋아요취소");
		}	
	}
	
	/* 좋아요 확인 */
	public boolean notLike(Member member, Place place) {
		return likePlaceRepository.findByMemberAndPlace(member, place).isEmpty();
	}

	/* 좋아요 갯수 */
	public String countLiked(Long no) {
		Place place = placeRepository.findByNo(no);
		return likePlaceRepository.countByPlace(place);
	}

}
