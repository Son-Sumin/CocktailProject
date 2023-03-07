package com.bitacademy.cocktail.jwt;

import java.util.Base64;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import com.bitacademy.cocktail.domain.Role;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class JwtTokenProvider {

	private String secretKey = "cocktailproject123";

	private long tokenValidTime = 60 * 60 * 1000L;

	private final UserDetailsService userDetailsService;

	protected void init() {
		secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
	}

	public String createToken(String userPk, Role roles, String nickname) {
		Claims claims = Jwts.claims().setSubject(userPk);
		claims.put("roles", roles);
		claims.put("nickname", nickname);
		Date now = new Date();
		return Jwts.builder().setHeaderParam(Header.TYPE, Header.JWT_TYPE).setClaims(claims).setIssuedAt(now)
				.setExpiration(new Date(now.getTime() + tokenValidTime)).signWith(SignatureAlgorithm.HS256, secretKey)
				.compact();

	}

	public Authentication getAuthentication(String token) {
		UserDetails userDetails = userDetailsService.loadUserByUsername(this.getUserPk(token));
		return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
	}

	public String getUserPk(String token) {
		return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
	}

	public String resolveToken(HttpServletRequest request) {
		return request.getHeader("X-AUTH-TOKEN");
	}

	public boolean validateToken(String jwtToken) {
		try {
			Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
			return !claims.getBody().getExpiration().before(new Date());
		} catch (Exception e) {
			return false;
		}
	}

	public Long getExpiration(String accessToken) {
		// accessToken 남은 유효시간
		Date expiration = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(accessToken).getBody().getExpiration();
		// 현재 시간
		Long now = new Date().getTime();
		return (expiration.getTime() - now);
	}
}
