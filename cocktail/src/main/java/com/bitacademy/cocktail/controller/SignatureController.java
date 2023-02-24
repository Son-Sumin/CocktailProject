package com.bitacademy.cocktail.controller;

import java.util.List;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bitacademy.cocktail.domain.ReviewSignature;
import com.bitacademy.cocktail.domain.Signature;
import com.bitacademy.cocktail.domain.SignatureImage;
import com.bitacademy.cocktail.service.ReviewSignatureService;
import com.bitacademy.cocktail.service.SignatureImageService;
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
	
	
	/* 시그니처 리스트 */
	@GetMapping({"", "/list"})
	public List<Signature> list(Model model) {
		List<Signature> signature = signatureService.listSignature();
		model.addAttribute("signatures", signature);
		return signatureService.listSignature();
	}

	/* 시그니처 글 작성 + 멀티파일 업로드 */
	@PostMapping("/form")
	public List<Signature> writeSignature(
			@ModelAttribute Signature form,
			SignatureImage signatureImage,
			List<MultipartFile> files) throws Exception {
		
		//시그니처 글 작성
		Signature signature = new Signature();
		
		signature.setCocktailName(form.getCocktailName());
		signature.setCocktailContents(form.getCocktailContents());
		signature.setRecipeContents(form.getRecipeContents());
		signature.setType(form.getType());
		signature.setHit(0);
		signatureService.add(signature);
		
		//파일 업로드
		signatureImageService.addImages(signature, signatureImage, files);
		
//		List<SignatureImage> signatureImages = signatureImageService.listSigImage();
//		model.addAttribute("signatureImages", signatureImages);
		
		return signatureService.listSignature();
	}

	/* 시그니처 게시글 보기 + 조회수 + 해당 게시글 댓글 리스트 */
	@GetMapping("/view/{no}")
	public Signature view(@PathVariable("no") Long no, Model model) {
		// 시그니처 게시글 보기
		model.addAttribute("signature", signatureService.findSigView(no));
		
		// 조회수
		signatureService.updateHit(no);
		
		// 해당 게시글 댓글 리스트
		List<ReviewSignature> reviewSignature = reviewSignatureService.listReviewSignature(no);
		model.addAttribute("reviewSignatures", reviewSignature);
		
		return signatureService.findSigView(no);
	}
	
//	/* 시그니처 게시글 좋아요 */
//	@PutMapping("/view/like/{no}")
//	public Signature likeSig(@PathVariable("no") Long no,  Model model) {
//		model.addAttribute("signature", signatureService.findSigView(no));
//		signatureService.updateLike(no);
//		return signatureService.findSigView(no);
//	}

	/* 시그니처 게시글 삭제 */
	@DeleteMapping("/delete/{no}")
	public List<Signature> delete(@PathVariable("no") Long no, SignatureImage signatureImage) {
		signatureService.delete(no);
		return signatureService.listSignature();
	}

	/* 시그니처 게시글 수정 */
	@PutMapping("/modify/{no}")
	public Signature modify(
			@PathVariable("no") Long no, 
			@ModelAttribute Signature signature, Signature form,
			SignatureImage signatureImage, List<MultipartFile> files) throws Exception {
		
		signature = signatureService.findSigView(no);
		signature.setHit(signature.getHit());	

		signature.setCocktailName(form.getCocktailName());
		signature.setCocktailContents(form.getCocktailContents());
		signature.setRecipeContents(form.getRecipeContents());
		signature.setType(form.getType());
		signature.setSignatureImages(form.getSignatureImages());
		signatureService.modify(signature);
		
		// 기존에 올린 파일 있으면 지우기
		if(signature.getSignatureImages() != null){
			signatureImageService.deleteImage(no);
        }
		
		signatureImageService.addImages(signature, signatureImage, files);
		
		return signatureService.findSigView(no);
	}
	
	/* 시그니처 게시글 댓글 작성 */
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

}
