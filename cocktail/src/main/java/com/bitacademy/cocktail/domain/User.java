package com.bitacademy.cocktail.domain;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity(name = "user")
@Data
@EqualsAndHashCode(callSuper=false)
@Table
@AllArgsConstructor
@NoArgsConstructor
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long no;
	private String name;
	@Column(nullable = false, length = 30)
	private String id;
	@Column(nullable = false, length = 100)
	private String password;
	@Column(nullable = false, length = 30)
	private String nickname;
	private String birth;
	@Column(name = "phonenumber")
	private String phoneNumber;
	private String role;
	@Column(name = "profile_image")
	private String profileImage;
	@Column(name="reg_date")
	private LocalDateTime createdAt;
	@Column(name="gender")
	private String gender;

	@OneToMany(mappedBy="user", cascade = CascadeType.REMOVE)
	@JsonIgnoreProperties({"user"})
	private List<Board> boards = new ArrayList<>();
	
//	@OneToMany(mappedBy="user")
//	@JsonIgnoreProperties({"reviewSignatures"})
//	private List<Signature> signatures = new ArrayList<>();
	
	@OneToMany(mappedBy="user", cascade = CascadeType.REMOVE)
	@JsonIgnoreProperties({"user"})
	private List<ReviewBoard> reviews = new ArrayList<>();
	
//	@OneToMany(mappedBy="user")
//	@JsonIgnoreProperties({"reviewSignatures"})
//	private List<Signature> signatures = new ArrayList<>();
	
    @PrePersist
    public void createdAt() {
        this.createdAt = LocalDateTime.now();
    }

}
