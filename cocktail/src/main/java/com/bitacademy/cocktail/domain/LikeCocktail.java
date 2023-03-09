//package com.bitacademy.cocktail.domain;
//
//import javax.persistence.Entity;
//import javax.persistence.FetchType;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Id;
//import javax.persistence.JoinColumn;
//import javax.persistence.ManyToOne;
//import javax.persistence.Table;
//
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//@Entity
//@Getter
//@Setter
//@Table(name="likeCocktail")
//@AllArgsConstructor
//@NoArgsConstructor
//@Builder
//public class LikeCocktail {
//
//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	private Long no;
//	
//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name="member_no")
//	private Member member;
//	
//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name="cocktail_no")
//	private Cocktail cocktail;
//}
