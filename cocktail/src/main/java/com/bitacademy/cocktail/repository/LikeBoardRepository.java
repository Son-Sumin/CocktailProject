package com.bitacademy.cocktail.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bitacademy.cocktail.domain.Board;
import com.bitacademy.cocktail.domain.LikeBoard;
import com.bitacademy.cocktail.domain.User;

public interface LikeBoardRepository extends JpaRepository<LikeBoard, Long> {
	
	Optional<LikeBoard> findByUserAndBoard(User user, Board board);

}