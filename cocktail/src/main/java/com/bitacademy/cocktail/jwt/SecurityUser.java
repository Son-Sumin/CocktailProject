package com.bitacademy.cocktail.jwt;

import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;

import com.bitacademy.cocktail.domain.Member;

public class SecurityUser extends User {

	private Member member;
	
	public SecurityUser(Member member) {
		super(member.getId().toString(), member.getPassword(),
		AuthorityUtils.createAuthorityList(member.getRole().toString()));
		this.member = member;
	}
	
	public Member getMember() {
		return member;
	}
}
