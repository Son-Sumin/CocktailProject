package com.bitacademy.cocktail.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity(name="ingredient")
@ToString(exclude = {"cocktailRecipes"})
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class Ingredient {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long no;

	private String name;

	@Column(name = "eng_name")
	private String engName;
	
	private String type;
	
	private float degree;
	
	private String contents;
	
	private String image;

	@JsonIgnoreProperties({"ingredient"})
	@OneToMany(mappedBy = "ingredient", cascade = CascadeType.ALL)
	@Builder.Default
	private List<CocktailRecipe> cocktailRecipes = new ArrayList<>();
	
//	public void addCocktailRecipe(CocktailRecipe cocktailRecipe){
//		cocktailRecipes.add(cocktailRecipe);
//		cocktailRecipe.setIngredient(this);
//    }
	
//	@ToString.Exclude
//	@JsonIgnoreProperties({"signatureRecipes"})
//	@OneToMany(mappedBy = "ingredient", cascade = CascadeType.ALL)
//	private List<SignatureRecipe> signatureRecipes = new ArrayList<>();
}