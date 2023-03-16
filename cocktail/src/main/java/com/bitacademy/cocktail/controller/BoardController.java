package com.bitacademy.cocktail.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bitacademy.cocktail.domain.Board;
import com.bitacademy.cocktail.domain.BoardImage;
import com.bitacademy.cocktail.domain.Member;
import com.bitacademy.cocktail.domain.ReviewBoard;
import com.bitacademy.cocktail.jwt.SecurityUtil;
import com.bitacademy.cocktail.service.BoardImageService;
import com.bitacademy.cocktail.service.BoardService;
import com.bitacademy.cocktail.service.LikeBoardService;
import com.bitacademy.cocktail.service.MemberService;
import com.bitacademy.cocktail.service.ReviewBoardService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class BoardController {

	@Autowired
	BoardService boardService;
	@Autowired
	ReviewBoardService reviewBoardService;
	@Autowired
	BoardImageService boardImageService;
	@Autowired
	MemberService memberService;
	@Autowired
	LikeBoardService likeBoardService;
	
//	게시글 리스트
	@GetMapping("/board/list")
	public List<Board> boardList(Model model) {
		List<Board> boardList = boardService.boardList();
		model.addAttribute("boardList", boardList);
		return boardList;
	}

//	게시글 작성
	@CrossOrigin(origins = "*")
	@PostMapping("/board/write")
	public void boardWrite(@ModelAttribute Board board, BoardImage boardImage, List<MultipartFile> files) throws Exception {
		board.setHit(0L);
		board.setMember(memberService.memberInfo(SecurityUtil.getCurrentMemberId()).get());
		boardService.boardWrite(board);

//		boardImageService.saveFile(board, boardImage, files);
	}

//	게시글 보기
	@GetMapping("/board/view/{no}")
	public Board boardView(Model model, @PathVariable("no") Long no) {
		model.addAttribute("boardList", boardService.boardView(no));
		boardService.updateHit(no);
		return boardService.boardView(no);
	}

//	댓글쓰기
	@PostMapping("/board/view/{no}/review/write")
	public void reviewWrite(@PathVariable("no") Long no, @RequestBody ReviewBoard reviewBoard) {
		reviewBoard.setNo(null);
		reviewBoard.setMember(memberService.memberInfo(SecurityUtil.getCurrentMemberId()).get());
		reviewBoardService.reviewWrite(no, reviewBoard);
	}

//	댓글삭제
	@GetMapping("/board/view/{no}/review/delete/{bno}")
	public void reivewDelete(@PathVariable("no") Long no, @PathVariable("bno") Long bno, ReviewBoard reviewBoard) {
		reviewBoardService.reviewDelete(bno);
	}

//	게시글 수정
	@PutMapping("/board/update/{no}")
	public void boardUpdate(@PathVariable("no") Long no, @RequestBody Board board, BoardImage boardImage, List<MultipartFile> files)
			throws Exception {
		Board boardTemp = boardService.boardView(no);
		boardTemp.setCategory(board.getCategory());
		boardTemp.setTitle(board.getTitle());
		boardTemp.setContents(board.getContents());
		boardTemp.setImgs(board.getImgs());
		boardService.boardWrite(boardTemp);

//		System.out.println("img:  "+boardTemp.getImgs());
//		if(boardTemp.getImgs() != null) {
//			System.out.println("*****");
//			boardImageService.imgDelete(no);
//		}
//		boardImageService.saveFile(board, boardImage, files);
	}

//	게시글삭제
	@DeleteMapping("/board/delete/{no}")
	public void boardDelete(@PathVariable("no") Long no) {
		boardService.boardDelete(no);
	}
	
//	좋아요
	@PostMapping("/board/like/{no}")
	public void addLike(@PathVariable("no") Long no){
		Member member = memberService.memberInfo(SecurityUtil.getCurrentMemberId()).get();
		likeBoardService.addLike(member, no);
		
	}

//	이미지 삭제
//	@GetMapping("/board/{no}/img/delete/{bno}")
//	public void imgDelete(@PathVariable("no") Long no, @PathVariable("bno") Long bno) {
//		boardImageService.imgDelete(bno);
//	}
}
