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

@Entity(name="cocktail")
@ToString(exclude = {"cocktailImages", "cocktailRecipes"})
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper=false)
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "no")
public class Cocktail {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long no;

	private String type;

	private String name;

	@Column(name = "eng_name")
	private String engName;

	@Column(name = "cocktail_contents")
	private String cocktailContents;

	@Column(name = "recipe_contents")
	private String recipeContents;
	
	@JsonIgnoreProperties({"no", "cocktail"})
	@OneToMany(mappedBy = "cocktail", cascade = CascadeType.ALL)
	@Builder.Default
	private List<CocktailImage> cocktailImages = new ArrayList<>();
	
	@JsonIgnoreProperties({"cocktail"})
	@OneToMany(mappedBy = "cocktail", cascade = CascadeType.ALL)
	@Builder.Default
	private List<CocktailRecipe> cocktailRecipes = new ArrayList<>();

	public void addCocktailImage(CocktailImage cocktailImage){
		cocktailImages.add(cocktailImage);
		cocktailImage.setCocktail(this);
    }
	
	public void addCocktailRecipe(CocktailRecipe cocktailRecipe){
		cocktailRecipes.add(cocktailRecipe);
		cocktailRecipe.setCocktail(this);
    }
}
