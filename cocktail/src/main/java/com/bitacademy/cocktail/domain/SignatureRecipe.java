package com.bitacademy.cocktail.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name="signatureRecipe")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignatureRecipe {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long no;
	
	@ManyToOne
	@JsonIgnoreProperties({"reviewSignatures", "signatureImages", "signatureRecipes", "likes"})
	@JoinColumn(name = "signature_no")
	private Signature signature;
	
	@ManyToOne
	@JsonIgnoreProperties({"signatureRecipes"})
	@JoinColumn(name = "ingredient_no")
	private Ingredient ingredient;
	
	private Long amount;
	private String unit;

}