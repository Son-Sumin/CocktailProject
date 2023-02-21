package com.bitacademy.cocktail.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bitacademy.cocktail.domain.ReviewBoard;
import com.bitacademy.cocktail.repository.BoardRepository;
import com.bitacademy.cocktail.repository.ReviewBoardRepository;

@Service
@Transactional
public class ReviewBoardService {

	@Autowired
	ReviewBoardRepository reviewBoardRepository;
	
	@Autowired
	BoardRepository boardRepository;
	
	public void reviewWrite(Long no, ReviewBoard review) {
		
		review.setBoard(boardRepository.findByNo(no).get());
		reviewBoardRepository.save(review);
	}

	public void reviewDelete(Long no) {
		reviewBoardRepository.deleteByNo(no);
	}
	
}
