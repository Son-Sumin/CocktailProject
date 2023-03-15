package com.bitacademy.cocktail.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
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

@Entity(name = "board")
@Getter
@Setter
@EqualsAndHashCode(callSuper=false)
@Table
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Board extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long no;
	private String category;
	private String title;
	private String contents;
	private Long hit;
	
	@ManyToOne
	@JoinColumn(name="member_no")
	@JsonIgnoreProperties({"boards", "reviews", "likeBoard","likeCocktail", "signatures", "reviewSignatures", "likeSignature", "likePlace"})
	private Member member;
	
	@OneToMany(mappedBy="board", cascade = CascadeType.REMOVE)
	@JsonIgnoreProperties({"board"})
	private List<ReviewBoard> reviews = new ArrayList<>();
	
	@OneToMany(mappedBy="board", cascade = CascadeType.REMOVE)
	@JsonIgnoreProperties({"board"})
	private List<LikeBoard> likeBoard = new ArrayList<>();
	
	@OneToMany(mappedBy="board", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
	@JsonIgnoreProperties({"board"})
	private List<BoardImage> imgs = new ArrayList<>();
	
}
