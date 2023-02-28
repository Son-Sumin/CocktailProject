package com.bitacademy.cocktail.controller;

import java.io.File;
import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
	
	/* 배너 추가 */
	@CrossOrigin(origins = "*")
	@PostMapping("/add")
	public void addBanner(@ModelAttribute Banner form, MultipartFile file) throws Exception {

		// 프로젝트 경로 설정, 랜덤한 문자열이 들어간 파일이름 설정
		String projectPath = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\files";
		UUID uuid = UUID.randomUUID();
		String fileName = uuid + "_" + file.getOriginalFilename();
		
		// MultipartFile file 넣어줄 껍데기 지정 (경로, "파일이름")
		File saveFile = new File(projectPath, fileName);
		file.transferTo(saveFile);
		
		// 사진 추가		
		Banner banner = new Banner();
		banner.setTitle(form.getTitle());
		banner.setFilename(file.getOriginalFilename());
		banner.setFilepath("/files/" + fileName);

		bannerRepository.save(banner);
	}
	
	/* 배너 삭제 */
	@CrossOrigin(origins = "*")
	@DeleteMapping("/delete/{no}")
	public void deleteBanner(@PathVariable("no") Long no) {
		bannerRepository.deleteByNo(no);
	}
}
