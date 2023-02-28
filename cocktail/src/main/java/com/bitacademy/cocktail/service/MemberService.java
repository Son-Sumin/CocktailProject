package com.bitacademy.cocktail.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bitacademy.cocktail.domain.Member;
import com.bitacademy.cocktail.repository.MemberRepository;


@Service
public class MemberService {

	@Autowired
	MemberRepository memberRepository;

	public void join(Member member) {
		memberRepository.save(member);
	}

	public List<Member> memberList() {
		return memberRepository.findAll();
	}
}
