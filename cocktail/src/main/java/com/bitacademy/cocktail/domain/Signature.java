package com.bitacademy.cocktail.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.bitacademy.cocktail.base.BaseTimeEntity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name="signature")
@Table
@Getter
@Setter
@Builder
@EqualsAndHashCode(callSuper=false)
@AllArgsConstructor
@NoArgsConstructor
public class Signature extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long no;

	@Column(name = "cocktail_name")
	private String cocktailName;
	
	@Column(name = "eng_name")
	private String engName;

	@Column(name = "cocktail_contents")
	private String cocktailContents;

	@Column(name = "recipe_contents")
	private String recipeContents;
	
	private Integer hit;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="member_no")
	@JsonIgnoreProperties({"boards", "reviews", "likeBoard", "likeCocktail", "signatures", "reviewSignatures", "likeSignature", "likePlace"})
	private Member member;
	
	@OneToMany(mappedBy = "signature", cascade = CascadeType.REMOVE)
	@JsonIgnoreProperties({"signature"})
	@Builder.Default
	private List<ReviewSignature> reviewSignatures = new ArrayList<>();

	@OneToMany(mappedBy = "signature", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
	@JsonIgnoreProperties({"signature"})
	@Builder.Default
	private List<SignatureImage> signatureImages = new ArrayList<>();
	
	
	@OneToMany(mappedBy = "signature", cascade = CascadeType.REMOVE)
	@JsonIgnoreProperties({"signature"})
	@Builder.Default
	private List<SignatureRecipe> signatureRecipes = new ArrayList<>();
	
	@OneToMany(mappedBy="signature", cascade = CascadeType.REMOVE)
	@Builder.Default
	private List<LikeSignature> likeSignature = new ArrayList<>();
	
}