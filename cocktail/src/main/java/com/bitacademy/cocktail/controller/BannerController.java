package com.bitacademy.cocktail.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.apache.commons.io.IOUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bitacademy.cocktail.domain.Banner;
import com.bitacademy.cocktail.repository.BannerRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/banner")
@RequiredArgsConstructor
@Transactional
public class BannerController {

	/* 생성자 주입 */
	private final BannerRepository bannerRepository;
	
	/* 배너 리스트 */
	@GetMapping({"", "/list"})
	public List<Banner> listBanner(Model model) {
		List<Banner> banner = bannerRepository.findAll();
		model.addAttribute("banners", banner);
		return banner;
	}
	
	/* 이미지 변환 */
	@GetMapping(value = {"/view/{no}"}, produces = {MediaType.IMAGE_GIF_VALUE, MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE,})
	public ResponseEntity<byte[]> showImages(@PathVariable("no") Long no) throws IOException {
		
		Banner banner = bannerRepository.findByNo(no);

		InputStream imageStream = new FileInputStream("src/main/resources/static" + banner.getFilepath());
		byte[] imageByteArray  = IOUtils.toByteArray(imageStream);
		imageStream.close();
	    return new ResponseEntity<>(imageByteArray, HttpStatus.OK);
	}
	
	/* 배너 추가 */
	@CrossOrigin(origins = "*")
	@PostMapping("/add")
	public void addBanner(@ModelAttribute Banner form, MultipartFile file) throws Exception {
		
		Banner banner = new Banner();
		
		 // 파일을 올리지 않을 경우
		 if(file.isEmpty()) {
			banner.setTitle(form.getTitle());
			banner.setFilename("");
			banner.setFilepath("");
			bannerRepository.save(banner);
			 
	     } else {
	    	// 프로젝트 경로 설정, 랜덤한 문자열이 들어간 파일이름 설정
	 		String projectPath = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\files";
	 		UUID uuid = UUID.randomUUID();
	 		String fileName = uuid + "_" + file.getOriginalFilename();
	 		
	 		// MultipartFile file 넣어줄 껍데기 지정 (경로, "파일이름")
	 		File saveFile = new File(projectPath, fileName);
	 		file.transferTo(saveFile);
			
			// 사진 추가
			banner.setTitle(form.getTitle());
			banner.setFilename(file.getOriginalFilename());
			banner.setFilepath("/files/" + fileName);

			bannerRepository.save(banner);
	     }
	}
	
	/* 배너 삭제 */
	@CrossOrigin(origins = "*")
	@DeleteMapping("/delete/{no}")
	public void deleteBanner(@PathVariable("no") Long no) {
		bannerRepository.deleteByNo(no);
	}
	
	/* 배너 수정 */
	@PutMapping("/modify/{no}")
	public void modifyBanner(
			@PathVariable("no") Long no,
			@ModelAttribute Banner banner,
			Banner form,
			MultipartFile file) throws Exception {
		
		banner = bannerRepository.findByNo(no);
		
		// 기존에 올린 파일 있으면 지우기
		if(file.isEmpty()) {
			banner.setFilename("");
			banner.setFilepath("");
        }
		
		if(file.isEmpty()) {
			banner.setTitle(form.getTitle());
			banner.setFilename("");
			banner.setFilepath("");
			bannerRepository.save(banner);
			
	    } else {
	    	// 프로젝트 경로 설정, 랜덤한 문자열이 들어간 파일이름 설정
			String projectPath = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\files";
			UUID uuid = UUID.randomUUID();
			String fileName = uuid + "_" + file.getOriginalFilename();
			
			// MultipartFile file 넣어줄 껍데기 지정 (경로, "파일이름")
			File saveFile = new File(projectPath, fileName);
			file.transferTo(saveFile);
			
			// 수정
			banner.setTitle(form.getTitle());
			banner.setFilename(file.getOriginalFilename());
			banner.setFilepath("/files/" + fileName);
			bannerRepository.save(banner);
	    }
	}
}