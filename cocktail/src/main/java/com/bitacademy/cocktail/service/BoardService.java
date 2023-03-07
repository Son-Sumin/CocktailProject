package com.bitacademy.cocktail.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bitacademy.cocktail.domain.Board;
import com.bitacademy.cocktail.repository.BoardRepository;
import com.bitacademy.cocktail.repository.ReviewBoardRepository;

@Service
@Transactional
public class BoardService {

	@Autowired
	BoardRepository boardRepository;
	
	@Autowired
	ReviewBoardRepository reviewBoardRepository;

	// 게시글리스트
	public List<Board> boardList() {
		return boardRepository.findAll();
	}
	
	// 게시글 작성
	public void boardWrite(Board board) {
		boardRepository.save(board);
	}
	
	// 게시글보기
	public Board boardView(Long no) {
		return boardRepository.findByNo(no).get();
	}
	
	// 게시글삭제
	public void boardDelete(Long no) {
		boardRepository.deleteByNo(no);
	}

	public void updateHit(Long no) {
		boardRepository.updateHit(no);
		
	}
	
}
