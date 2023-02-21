package com.bitacademy.cocktail.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bitacademy.cocktail.domain.User;
import com.bitacademy.cocktail.repository.UserRepository;


@Service
public class UserService {

	@Autowired
	UserRepository userRepository;

	public void join(User user) {
		userRepository.save(user);
	}

	public List<User> userList() {
		return userRepository.findAll();
	}
}
