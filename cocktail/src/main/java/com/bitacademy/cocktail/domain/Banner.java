package com.bitacademy.cocktail.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name="banner")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Banner {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long no;
	
	private String title;
	
	private String filename;

    private String filepath;

}
