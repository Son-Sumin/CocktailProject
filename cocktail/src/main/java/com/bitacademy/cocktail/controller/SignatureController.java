package com.bitacademy.cocktail.controller;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bitacademy.cocktail.domain.Banner;
import com.bitacademy.cocktail.domain.Ingredient;
import com.bitacademy.cocktail.domain.ReviewSignature;
import com.bitacademy.cocktail.domain.Signature;
import com.bitacademy.cocktail.domain.SignatureImage;
import com.bitacademy.cocktail.domain.SignatureRecipe;
import com.bitacademy.cocktail.service.ReviewSignatureService;
import com.bitacademy.cocktail.service.SignatureImageService;
import com.bitacademy.cocktail.service.SignatureRecipeService;
import com.bitacademy.cocktail.service.SignatureService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/signature")
@RequiredArgsConstructor
public class SignatureController {

	/* 생성자 주입 */
	private final SignatureService signatureService;
	private final ReviewSignatureService reviewSignatureService;
	private final SignatureImageService signatureImageService;
	private final SignatureRecipeService signatureRecipeService;
	
	/* 시그니처 리스트 */
	@GetMapping({"", "/list"})
	public List<Signature> list(Model model) {
		List<Signature> signature = signatureService.listSignature();
		model.addAttribute("signatures", signature);
		return signatureService.listSignature();
	}

	/* 시그니처 글 작성 */
	@CrossOrigin(origins = "*")
	@PostMapping("/write")
	public Signature writeSignature(@ModelAttribute Signature signature, @ModelAttribute Signature form) {
		signature.setCocktailName(form.getCocktailName());
		signature.setEngName(form.getEngName());
		signature.setCocktailContents(form.getCocktailContents());
		signature.setRecipeContents(form.getRecipeContents());
		signature.setHit(0);
		signatureService.add(signature);
		return signatureService.findSigView(signature.getNo());
	}
		
	/* 멀티파일 업로드 */
	@CrossOrigin(origins = "*")
	@PostMapping("/write/{no}/file")
	public void uploadSignatureFile(
			@PathVariable("no") Long no,
			@ModelAttribute Signature signature,
			SignatureImage signatureImage,
			List<MultipartFile> files) throws Exception {
		signature = signatureService.findSigView(no);
		signatureImageService.addImages(signature, signatureImage, files);
	}
	
	/* 시그니처 레시피 작성 */
	@CrossOrigin(origins = "*")
	@PostMapping("/write/{sno}/recipe")
	public void writeSignatureRecipe(
			@PathVariable("sno") Long sno,
			@ModelAttribute SignatureRecipe recipe) {
		// @RequestBody 어노테이션을 쓰면 Request Body로 넘어오는 JSON 객체를 매핑할 수 있다.
		signatureRecipeService.addRecipe(recipe, sno);
	}

	/* 시그니처 게시글 보기 + 조회수 + 해당 게시글 댓글 리스트 */
	@GetMapping("/view/{no}")
	public Signature view(@PathVariable("no") Long no, Model model) throws Exception {
		// 시그니처 게시글 보기
		model.addAttribute("signature", signatureService.findSigView(no));
		
		List<SignatureImage> signatureImage = signatureImageService.findSigImg(no);
		
		for (SignatureImage sigImg : signatureImage) {
			InputStream imageStream = new FileInputStream("src/main/resources/static" + sigImg.getPath());
			byte[] imageByteArray  = IOUtils.toByteArray(imageStream);
			imageStream.close();
			new ResponseEntity<>(imageByteArray, HttpStatus.OK);
		}
	
		// 조회수
		signatureService.updateHit(no);
		
		// 해당 게시글 댓글 리스트
		List<ReviewSignature> reviewSignature = reviewSignatureService.listReviewSignature(no);
		model.addAttribute("reviewSignatures", reviewSignature);
		
		return signatureService.findSigView(no);
	}
	
	/* 각 배너별 이미지 변환 */
	@GetMapping(value = {"/view/{sno}/image"}, produces = {MediaType.IMAGE_GIF_VALUE, MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
	public ResponseEntity<byte[]> showImage(@PathVariable("sno") Long no) throws Exception {
		
		List<SignatureImage> signatureImage = signatureImageService.findSigImg(no);
		
		for (SignatureImage sigImg : signatureImage) {
			InputStream imageStream = new FileInputStream("src/main/resources/static" + sigImg.getPath());
			byte[] imageByteArray  = IOUtils.toByteArray(imageStream);
			imageStream.close();
			return new ResponseEntity<>(imageByteArray, HttpStatus.OK);
		}
		return null;		
	}

	/* 시그니처 게시글 + 파일 + 레시피 삭제 */
	@DeleteMapping("/delete/{no}")
	public void delete(@PathVariable("no") Long no, SignatureImage signatureImage) {
		signatureImageService.deleteImage(no);
		signatureRecipeService.deleteRecipe(no);
		signatureService.delete(no);
	}

	/* 시그니처 게시글 수정 */
	@CrossOrigin(origins = "*")
	@PutMapping("/modify/{no}")
	public Signature modify(@PathVariable("no") Long no, @ModelAttribute Signature signature, Signature form) {
		
		// 기존 내용 불러오기 및 글 수정
		signature = signatureService.findSigView(no);
		signature.setHit(signature.getHit());	

		signature.setCocktailName(form.getCocktailName());
		signature.setEngName(form.getEngName());
		signature.setCocktailContents(form.getCocktailContents());
		signature.setRecipeContents(form.getRecipeContents());
		signature.setSignatureImages(form.getSignatureImages());
		signatureService.modify(signature);
		
		return signatureService.findSigView(no);
	}
		
	/* 시그니처 멀티파일 수정 */
	@CrossOrigin(origins = "*")
	@PutMapping("/modify/{no}/file")
	public void modifySignatureFile(
			@PathVariable("no") Long no, 
			@ModelAttribute Signature signature, Signature form,
			SignatureImage signatureImage, List<MultipartFile> files) throws Exception {
		
		// 기존에 올린 파일 있으면 지우기 + 파일 수정 및 재업로드
		if(signature.getSignatureImages() != null){
			signatureImageService.deleteImage(no);
        }
		signatureImageService.addImages(signature, signatureImage, files);
	}
		
	/* 시그니처 레시피 수정 */
	@CrossOrigin(origins = "*")
	@PutMapping("/modify/{no}/recipe")
	public void modifySignatureRecipe(
			@PathVariable("no") Long no, 
			@ModelAttribute Signature signature, Signature form,
			List<SignatureRecipe> recipes) {
		
		// 기존에 올린 레시피 지우기 + 레시피 수정 및 재업로드
		if(signature.getSignatureRecipes() != null){
			signatureRecipeService.deleteRecipe(no);
        }
		//signatureRecipeService.addRecipes(recipes, signature.getNo());
	}
	
	/* 시그니처 게시글 댓글 작성 */
	@CrossOrigin(origins = "*")
	@PostMapping("/view/{no}/review/write")
	public Signature writeReviewSig(
			@PathVariable("no") Long no,
			@ModelAttribute ReviewSignature reviewSignature) {	
		reviewSignature.setNo(null);
		reviewSignatureService.add(no, reviewSignature);
		return signatureService.findSigView(no);
	}
	
	/* 시그니처 게시글 댓글 삭제 */
	@DeleteMapping("/view/{no}/review/delete/{reviewNo}")
	public Signature deleteReviewSig(
			@PathVariable("no") Long no,
			@PathVariable("reviewNo") Long reviewNo,
			@ModelAttribute ReviewSignature reviewSignature) {
		reviewSignature.setSignature(signatureService.findSigView(no));
		reviewSignatureService.delete(no, reviewNo, reviewSignature);
		return signatureService.findSigView(no);
	}
	
//	/* 시그니처 게시글 좋아요 */
//	@PutMapping("/view/like/{no}")
//	public Signature likeSig(@PathVariable("no") Long no,  Model model) {
//		model.addAttribute("signature", signatureService.findSigView(no));
//		signatureService.updateLike(no);
//		return signatureService.findSigView(no);
//	}

}
