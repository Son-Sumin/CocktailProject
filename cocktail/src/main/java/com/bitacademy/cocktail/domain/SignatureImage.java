package com.bitacademy.cocktail.domain;

import javax.persistence.Entity;
import javax.persistence.FetchType;
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

@Entity(name="signatureImage")
@Table
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = "signature")
public class SignatureImage {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long no;
	
    private String name;
	
	private String path;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="signature_no")
	private Signature signature;
}
