package com.bitacademy.cocktail.domain;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "member")
@Getter
@Setter
@EqualsAndHashCode(callSuper=false)
@Table
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Member implements UserDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long no;
	@Column(nullable = false, length = 30)
	private String name;
	@Column(nullable = false, length = 30)
	private String id;
	@Column(nullable = false, length = 30)
	private String password;
	@Column(nullable = false, length = 30)
	private String nickname;
	private String birth;
	@Column(name = "phonenumber")
	private String phoneNumber;
	@Enumerated(EnumType.STRING)
	private Role role;
	@Column(name = "profile_image")
	private String profileImage;
	@Column(name="reg_date")
	private LocalDateTime createdAt;
	@Column(name="gender")
	private String gender;

	@OneToMany(mappedBy="member", cascade = CascadeType.REMOVE)
	@JsonIgnoreProperties({"member", "reviews", "likeBoard", "imgs"})
	private List<Board> boards = new ArrayList<>();
	
	@OneToMany(mappedBy="member", cascade = CascadeType.REMOVE)
	@JsonIgnoreProperties({"member", "board"})
	private List<ReviewBoard> reviews = new ArrayList<>();
	
	@OneToMany(mappedBy="member", cascade = CascadeType.REMOVE)
	@JsonIgnoreProperties({"board"})
	private List<LikeBoard> likeBoard = new ArrayList<>();
	
	@OneToMany(mappedBy="member", cascade = CascadeType.REMOVE)
	@JsonIgnoreProperties({"member"})
	private List<LikeCocktail> likeCocktail = new ArrayList<>();
	
	@OneToMany(mappedBy="member", cascade = CascadeType.REMOVE)
	@JsonIgnoreProperties({"member", "reviewSignatures", "signatureImages", "signatureRecipes"})
	private List<Signature> signatures = new ArrayList<>();
	
	@OneToMany(mappedBy="member", cascade = CascadeType.REMOVE)
	@JsonIgnoreProperties({"member", "signature"})
	private List<ReviewSignature> reviewSignatures = new ArrayList<>();
	
	@OneToMany(mappedBy="member", cascade = CascadeType.REMOVE)
	@JsonIgnoreProperties({"signature"})
	private List<LikeSignature> likeSignature = new ArrayList<>();
	
	@OneToMany(mappedBy="member", cascade = CascadeType.REMOVE)
	@JsonIgnoreProperties({"member"})
	private List<LikePlace> likePlace = new ArrayList<>();
	
    @PrePersist
    public void createdAt() {
        this.createdAt = LocalDateTime.now();
    }
    
    @JsonIgnore
    @Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		 List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();   
         authorities.add(new SimpleGrantedAuthority("enuser"));
         return authorities;
	}
    @JsonIgnore
	@Override
	public String getUsername() {
		return id;
	}
    @JsonIgnore
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}
    @JsonIgnore
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}
    @JsonIgnore
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}
    @JsonIgnore
	@Override
	public boolean isEnabled() {
		return true;
	}

}
