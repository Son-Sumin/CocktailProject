package com.bitacademy.cocktail.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name="boardImage")
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString(exclude = "board")
@Builder
public class BoardImage {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long no;
	
	@Column(name="name")
    private String name;
	
	private String path;
	
	@ManyToOne
	@JoinColumn(name="board_no")
	private Board board;
}
