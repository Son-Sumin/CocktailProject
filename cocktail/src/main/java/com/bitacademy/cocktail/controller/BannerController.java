package com.bitacademy.cocktail.controller;

import java.io.File;
import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

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
	@CrossOrigin(origins = "*")
	@GetMapping({"", "/list"})
	public List<Banner> listBanner() {
		return bannerRepository.findAll();
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
	 		String projectPath = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\banner";
	 		UUID uuid = UUID.randomUUID();
	 		String fileName = uuid + "_" + file.getOriginalFilename();
	 		
	 		File saveFile = new File(projectPath, fileName);
	 		file.transferTo(saveFile);

			banner.setTitle(form.getTitle());
			banner.setFilename(file.getOriginalFilename());
			banner.setFilepath("/banner/" + fileName);
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
	@CrossOrigin(origins = "*")
	@PutMapping("/modify/{no}")
	public void modifyBanner(@PathVariable("no") Long no, @ModelAttribute Banner form, MultipartFile file) throws Exception {
		Banner banner = bannerRepository.findByNo(no);
		
		// 기존에 올린 파일 있으면 지우기
		if(file != null) {
			banner.setFilename(null);
			banner.setFilepath(null);
        }
		
		if(file.isEmpty()) {
			banner.setTitle(form.getTitle());
			banner.setFilename("");
			banner.setFilepath("");
			bannerRepository.save(banner);	
	    } else {
			String projectPath = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\banner";
			UUID uuid = UUID.randomUUID();
			String fileName = uuid + "_" + file.getOriginalFilename();
			
			File saveFile = new File(projectPath, fileName);
			file.transferTo(saveFile);
			
			banner.setTitle(form.getTitle());
			banner.setFilename(file.getOriginalFilename());
			banner.setFilepath("/banner/" + fileName);
			bannerRepository.save(banner);
	    }
	}
}