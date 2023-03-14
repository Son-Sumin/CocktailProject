package com.bitacademy.cocktail.controller;

import java.util.List;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bitacademy.cocktail.domain.Member;
import com.bitacademy.cocktail.domain.Place;
import com.bitacademy.cocktail.jwt.SecurityUtil;
import com.bitacademy.cocktail.service.LikePlaceService;
import com.bitacademy.cocktail.service.MemberService;
import com.bitacademy.cocktail.service.PlaceService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/place")
@RequiredArgsConstructor
public class PlaceController {

	/* 생성자 주입 */
	private final PlaceService placeService;
	private final MemberService memberService;
	private final LikePlaceService likePlaceService;
	
	/* 장소 목록 */
	@GetMapping({"", "/list"})
	public List<Place> list(Model model) {
		List<Place> place = placeService.listPlace();
		model.addAttribute("places", place);
		return placeService.listPlace();
	}
	
	/* 장소 게시글 보기 */
	@GetMapping("/view/{no}")
	public Place view(@PathVariable("no") Long no, Model model) {
		model.addAttribute("cocktail", placeService.findPlaceView(no));
		return placeService.findPlaceView(no);
	}
	
	/* 장소 좋아요 */
	@PostMapping("/like/{no}")
	public void addLike(@PathVariable("no") Long no) {
		Member member = memberService.memberInfo(SecurityUtil.getCurrentMemberId()).get();
		likePlaceService.addLike(member, no);
	}
}
