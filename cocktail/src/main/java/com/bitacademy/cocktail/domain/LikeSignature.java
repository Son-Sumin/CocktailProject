package com.bitacademy.cocktail.domain;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity(name="likeSignature")
@Table
@Data
@Builder
@EqualsAndHashCode(callSuper=false)
@AllArgsConstructor
@NoArgsConstructor
public class LikeSignature {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long no;
	
	@ManyToOne
	@JoinColumn(name="member_no")
	@JsonIgnoreProperties({"boards", "reviews", "likeBoard", "likeCocktail", "signatures", "reviewSignatures", "likeSignature", "likePlace"})
	private Member member;
	
	@ManyToOne
	@JoinColumn(name="signature_no")
	@JsonIgnoreProperties({"member", "reviewSignatures", "signatureImages", "signatureRecipes", "likeSignature"})
	private Signature signature;

}
