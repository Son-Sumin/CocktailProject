package com.bitacademy.cocktail.service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.bitacademy.cocktail.domain.Board;
import com.bitacademy.cocktail.domain.BoardImage;
import com.bitacademy.cocktail.repository.BoardImageRepository;
import com.bitacademy.cocktail.repository.BoardRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardImageService {
	
	@Value("${file.upload-dir}")
	private String uploadpath;

	@Autowired
	BoardImageRepository boardImageRepository;

	@Autowired
	BoardRepository boardRepository;

	public void saveFile(Board board, List<MultipartFile> files) throws Exception {

		List<BoardImage> imgs = new ArrayList<>();
		if (!files.isEmpty()) {
			for (MultipartFile file : files) {
				if (!file.isEmpty()) {

					String path = uploadpath + "/board";
					UUID uuid = UUID.randomUUID();
					String savedName = uuid + "_" + file.getOriginalFilename();

					File saveFile = new File(path, savedName);
					file.transferTo(saveFile);

					BoardImage img = new BoardImage();
					img.setName(file.getOriginalFilename());
					img.setPath("/bit/board/" + savedName);
					img.setBoard(board);
					imgs.add(img);

					boardImageRepository.saveAll(imgs);
				}
			}
		}
	}

	public void imgDelete(Long no) {
		boardImageRepository.deleteByBoardNo(no);
	}
}
