package com.bitacademy.cocktail.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bitacademy.cocktail.domain.Board;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
	
	Optional<Board> findByNo(Long no);

	void deleteByNo(Long no);
	
}
