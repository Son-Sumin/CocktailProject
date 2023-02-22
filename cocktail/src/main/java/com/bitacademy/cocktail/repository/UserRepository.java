package com.bitacademy.cocktail.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bitacademy.cocktail.domain.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

	User save(User user);
	List<User> findAll();
}
