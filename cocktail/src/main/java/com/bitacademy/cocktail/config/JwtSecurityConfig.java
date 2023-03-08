package com.bitacademy.cocktail.config;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.bitacademy.cocktail.jwt.JwtAuthenticationFilter;
import com.bitacademy.cocktail.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
public class JwtSecurityConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {

	private final JwtTokenProvider jwtTokenProvider;
    private final RedisTemplate redisTemplate;
    
    @Override
    public void configure(HttpSecurity http) {
    	JwtAuthenticationFilter customFilter = new JwtAuthenticationFilter(jwtTokenProvider, redisTemplate);
        http.addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
