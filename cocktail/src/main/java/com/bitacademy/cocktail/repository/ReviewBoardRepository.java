package com.bitacademy.cocktail.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bitacademy.cocktail.domain.ReviewBoard;

@Repository
public interface ReviewBoardRepository extends JpaRepository<ReviewBoard, Long> {

	void deleteByNo(Long no);

}
