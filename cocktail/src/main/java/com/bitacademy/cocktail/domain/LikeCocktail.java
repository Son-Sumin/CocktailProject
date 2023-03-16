package com.bitacademy.cocktail.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@EqualsAndHashCode(callSuper=false)
@Table(name="likeCocktail")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LikeCocktail {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long no;
	
	@ManyToOne
	@JoinColumn(name="member_no")
	@JsonIgnoreProperties({"boards", "reviews", "likeBoard", "likeCocktail", "signatures", "reviewSignatures", "likeSignature", "likePlace"})
	private Member member;
	
	@ManyToOne
	@JoinColumn(name="cocktail_no")
	@JsonIgnoreProperties({"cocktailRecipes", "likeCocktail"})
	private Cocktail cocktail;
}
