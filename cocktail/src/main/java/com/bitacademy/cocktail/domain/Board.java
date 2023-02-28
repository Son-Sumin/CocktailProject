package com.bitacademy.cocktail.domain;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
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

@Entity
@Data
@EqualsAndHashCode(callSuper=false)
@Table(name = "board")
@AllArgsConstructor
@NoArgsConstructor
public class Board extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long no;
	private String category;
	private String title;
	private String contents;
	private Long hit;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="member_no")
	private Member member;
	
	@OneToMany(mappedBy="board", cascade = CascadeType.REMOVE)
	@JsonIgnoreProperties({"board"})
	private List<ReviewBoard> reviews = new ArrayList<>();
	
	@OneToMany(mappedBy="board", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
	@JsonIgnoreProperties({"board"})
	private List<BoardImage> imgs = new ArrayList<>();
	
	@OneToMany(mappedBy="board", cascade = CascadeType.ALL)
	private Set<LikeBoard> likes = new HashSet<>();
}
