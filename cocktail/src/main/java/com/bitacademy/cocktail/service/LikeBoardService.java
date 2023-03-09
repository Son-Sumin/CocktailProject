package com.bitacademy.cocktail.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bitacademy.cocktail.domain.Board;
import com.bitacademy.cocktail.domain.LikeBoard;
import com.bitacademy.cocktail.domain.Member;
import com.bitacademy.cocktail.repository.BoardRepository;
import com.bitacademy.cocktail.repository.LikeBoardRepository;

@Transactional
@Service
public class LikeBoardService {

	@Autowired
	LikeBoardRepository likeBoardRepository;
	@Autowired
	BoardRepository boardRepository;
	
	public void addLike(Member member, Long no) {
		Board board = boardRepository.findByNo(no).get();
		
		if(notLike(member, board)) {
			LikeBoard likeBoard = LikeBoard.builder()
									.member(member)
									.board(board)
									.build();
			likeBoardRepository.save(likeBoard);
			System.out.println("좋아요성공");
		} else {
			likeBoardRepository.deleteByNo(
					likeBoardRepository.findBymemberAndBoard(member, board).get().getNo());
			System.out.println("좋아요취소");
		}
		
	}
	
	public boolean notLike(Member member, Board board) {
		return likeBoardRepository.findBymemberAndBoard(member, board).isEmpty();
	}
}
