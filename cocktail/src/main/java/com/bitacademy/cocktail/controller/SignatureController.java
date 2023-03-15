package com.bitacademy.cocktail.controller;

import java.util.List;

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

import com.bitacademy.cocktail.domain.Member;
import com.bitacademy.cocktail.domain.ReviewSignature;
import com.bitacademy.cocktail.domain.Signature;
import com.bitacademy.cocktail.domain.SignatureImage;
import com.bitacademy.cocktail.domain.SignatureRecipe;
import com.bitacademy.cocktail.jwt.SecurityUtil;
import com.bitacademy.cocktail.service.LikeSignatureService;
import com.bitacademy.cocktail.service.MemberService;
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
	private final MemberService memberService;
	private final LikeSignatureService likeSignatureService;
	
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
		signature.setMember(memberService.memberInfo(SecurityUtil.getCurrentMemberId()).get());
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
	public List<SignatureRecipe> writeSignatureRecipe(
			@PathVariable("sno") Long sno,
			@ModelAttribute Signature signature,
			@ModelAttribute SignatureRecipe recipe) {
		// @RequestBody 어노테이션을 쓰면 Request Body로 넘어오는 JSON 객체를 매핑할 수 있다.
		
		signature = signatureService.findSigView(sno);
		signatureRecipeService.addRecipe(recipe, sno);
		return signatureRecipeService.findBySignature(sno, recipe);
	}

	/* 시그니처 게시글 보기 + 조회수 + 해당 게시글 댓글 리스트 */
	@GetMapping("/view/{no}")
	public Signature view(@PathVariable("no") Long no, Model model, SignatureRecipe signatureRecipe) throws Exception {
		// 시그니처 게시글 + 레시피 보기
		model.addAttribute("signature", signatureService.findSigView(no));
		List<SignatureRecipe> list =  signatureRecipeService.findBySignature(no, signatureRecipe);
		model.addAttribute("signatureRecipe", list);
	
		// 조회수
		signatureService.updateHit(no);
		
		// 해당 게시글 댓글 리스트
		List<ReviewSignature> reviewSignature = reviewSignatureService.listReviewSignature(no);
		model.addAttribute("reviewSignatures", reviewSignature);
		
		return signatureService.findSigView(no);
	}
	
//	/* 각 게시글 이미지 변환 */
//	@GetMapping(value = {"/view/{sno}/image"}, produces = {MediaType.IMAGE_GIF_VALUE, MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
//	public ResponseEntity<List<byte[]>> showImage(@PathVariable("sno") Long no, @RequestParam("files") SignatureImage signatureImage) throws Exception {
//		
//		List<SignatureImage> sigImageList = signatureImageService.findSigImg(no);
//		List<byte[]> imageDataList = new ArrayList<>();
//		
//		for (SignatureImage sigImg : sigImageList) {
//			InputStream imageStream = new FileInputStream("src/main/resources/static" + sigImg.getPath());
//			byte[] imageByteArray  = IOUtils.toByteArray(imageStream);
//			imageStream.close();
//			imageDataList.add(imageByteArray);
//			return new ResponseEntity<>(imageDataList, HttpStatus.OK);
//		}
//		return null;	
//	}

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
	public void modify(@PathVariable("no") Long no, @ModelAttribute Signature signature, Signature form) {
		// 기존 내용 불러오기 및 글 수정
		signature = signatureService.findSigView(no);
		signature.setHit(signature.getHit());

		signature.setCocktailName(form.getCocktailName());
		signature.setEngName(form.getEngName());
		signature.setCocktailContents(form.getCocktailContents());
		signature.setRecipeContents(form.getRecipeContents());
		signature.setSignatureImages(form.getSignatureImages());
		signatureService.modify(signature);
	}
		
	/* 시그니처 멀티파일 수정 */
	@CrossOrigin(origins = "*")
	@PutMapping("/modify/{no}/file")
	public void modifySignatureFile(
			@PathVariable("no") Long no, @ModelAttribute Signature signature,
			SignatureImage signatureImage, List<MultipartFile> files) throws Exception {
		
		signature = signatureService.findSigView(no);
		
		if(signature.getSignatureImages() != null){
			signatureImageService.deleteImage(no);			
        }
		
		signatureImageService.addImages(signature, signatureImage, files);		
	}
		
	/* 시그니처 레시피 수정 */
	@CrossOrigin(origins = "*")
	@PutMapping("/modify/{sno}/recipe")
	public void modifySignatureRecipe(
			@PathVariable("sno") Long signatureNo, 
			@ModelAttribute Signature signature,
			@ModelAttribute SignatureRecipe recipe) {
		
		signature = signatureService.findSigView(signatureNo);
		
		// 기존에 올린 레시피 지우기 + 레시피 수정 및 재업로드
		if(signature.getSignatureRecipes() != null){
			signatureRecipeService.deleteRecipe(signatureNo);
        }
		signatureRecipeService.addRecipe(recipe, signatureNo);
	}
	
	/* 시그니처 게시글 댓글 작성 */
	@CrossOrigin(origins = "*")
	@PostMapping("/view/{no}/review/write")
	public Signature writeReviewSig(
			@PathVariable("no") Long no,
			@ModelAttribute ReviewSignature reviewSignature) {	
		reviewSignature.setNo(null);
		reviewSignature.setMember(memberService.memberInfo(SecurityUtil.getCurrentMemberId()).get());
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
	
	/* 시그니처 게시글 좋아요 */
	@PostMapping("/like/{no}")
	public void addLike(@PathVariable("no") Long no,  Model model) {
		Member member = memberService.memberInfo(SecurityUtil.getCurrentMemberId()).get();
		likeSignatureService.addlike(member, no);
	}
}
