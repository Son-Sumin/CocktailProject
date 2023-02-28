package com.bitacademy.cocktail.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bitacademy.cocktail.domain.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long>{

	List<Member> findAll();
	
	Optional<Member> findById(String id);
}
