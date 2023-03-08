package com.bitacademy.cocktail.service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bitacademy.cocktail.domain.Member;
import com.bitacademy.cocktail.jwt.JwtToken;
import com.bitacademy.cocktail.jwt.JwtTokenProvider;
import com.bitacademy.cocktail.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MemberService {

	@Autowired
	MemberRepository memberRepository;

	private final JwtTokenProvider jwtTokenProvider;
	private final AuthenticationManagerBuilder authenticationManagerBuilder;
	private final RedisTemplate redisTemplate;

	public void join(Member member) {
		memberRepository.save(member);
	}

	public List<Member> memberList() {
		return memberRepository.findAll();
	}
	
	public Optional<Member> memberInfo(String id) {
		return memberRepository.findById(id);
	}

	public JwtToken login(String id, String password) {
		// 1. Login ID/PW 를 기반으로 Authentication 객체 생성
		// 이때 authentication 는 인증 여부를 확인하는 authenticated 값이 false
		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(id, password);

		// 2. 실제 검증 (사용자 비밀번호 체크)이 이루어지는 부분
		// authenticate 매서드가 실행될 때 CustomUserDetailsService 에서 만든 loadUserByUsername
		// 메서드가 실행
		Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

		// 3. 인증 정보를 기반으로 JWT 토큰 생성
		JwtToken jwtToken = jwtTokenProvider.generateToken(authentication);

		return jwtToken;
	}

	@Transactional
	public void logout(String accessToken) {
		Long expiration = jwtTokenProvider.getExpiration(accessToken);

		redisTemplate.opsForValue().set(accessToken, "blackList", expiration, TimeUnit.MILLISECONDS);
	}

}
