package com.bitacademy.cocktail.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bitacademy.cocktail.domain.Place;
import com.bitacademy.cocktail.repository.PlaceRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class PlaceService {

	/* 생성자 주입 */
	private final PlaceRepository placeRepository;

	/* 장소 목록 불러오기 */
	public List<Place> listPlace() {
		return placeRepository.findAll();
	}
	
	/* 장소 게시글 불러오기 */
	public Place findPlaceView(Long no) {
		return placeRepository.findByNo(no);
	}
}
