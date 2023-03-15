package com.bitacademy.cocktail.domain;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.bitacademy.cocktail.base.BaseTimeEntity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name="reviewSignature")
@Table
@Getter
@Setter
@Builder
@EqualsAndHashCode(callSuper=false)
@AllArgsConstructor
@NoArgsConstructor
public class ReviewSignature extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long no;

	private String contents;
	
	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "member_no")
	//@JsonIgnoreProperties({"boards", "reviews", "likeBoard", "likeCocktail", "signatures", "reviewSignatures", "likeSignature", "likePlace"})
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler","signatures",  "likeSignature"})
	private Member member;
	
    @ManyToOne
    @JoinColumn(name = "signature_no")
    //@JsonIgnoreProperties({"member", "reviewSignatures", "signatureImages", "signatureRecipes", "likeSignature"})
    @JsonIgnoreProperties({"member", "reviewSignatures"})
    private Signature signature;
    
}