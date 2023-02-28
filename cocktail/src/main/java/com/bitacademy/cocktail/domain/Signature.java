package com.bitacademy.cocktail.domain;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity(name="signature")
@Table
@Data
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
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="member_no")
	private Member member;
	
	@ToString.Exclude
	@OneToMany(mappedBy = "signature", cascade = CascadeType.ALL)
	@JsonIgnoreProperties({"signature"})
	private List<ReviewSignature> reviewSignatures = new ArrayList<>();

	@ToString.Exclude
	@OneToMany(mappedBy = "signature", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
	@JsonIgnoreProperties({"signature"})
	private List<SignatureImage> signatureImages = new ArrayList<>();
	
	@JsonIgnoreProperties({"signature"})
	@OneToMany(mappedBy = "signature", cascade = CascadeType.ALL)
	private List<SignatureRecipe> signatureRecipes = new ArrayList<>();
	
	@OneToMany(mappedBy="signature", cascade = CascadeType.ALL)
	private Set<LikeSignature> likes = new HashSet<>();
	
}