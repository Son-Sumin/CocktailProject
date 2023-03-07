package com.bitacademy.cocktail.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bitacademy.cocktail.domain.Board;

public interface BoardRepository extends JpaRepository<Board, Long> {
	
	Optional<Board> findByNo(Long no);

	void deleteByNo(Long no);

	@Modifying(clearAutomatically = true)
	@Query("update board as b set b.hit = b.hit + 1 where b.no =:no")
	void updateHit(@Param("no") Long no);
	
}
