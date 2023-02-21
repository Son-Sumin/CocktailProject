package com.bitacademy.cocktail.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name="cocktailRecipe")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "no")
public class CocktailRecipe{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long no;

	@ManyToOne
	@JoinColumn(name = "cocktail_no")
	private Cocktail cocktail;
	
	@ManyToOne
	@JsonIgnoreProperties({"cocktailRecipes"})
	@JoinColumn(name = "ingredient_no")
	private Ingredient ingredient;
	
	private Long amount;
	private String unit;
	
}