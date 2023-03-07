package com.bitacademy.cocktail.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bitacademy.cocktail.domain.BoardImage;

@Repository
public interface BoardImageRepository extends JpaRepository<BoardImage, Long> {

	void deleteByBoardNo(Long no);
}
