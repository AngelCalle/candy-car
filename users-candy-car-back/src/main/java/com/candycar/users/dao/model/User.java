package com.candycar.users.dao.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import javax.persistence.Table;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "USER")
public class User implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy= GenerationType.SEQUENCE)
	@Column(name = "ID")
	private Integer id;

	@NonNull
	@Column(name = "NAME")
	private String name;

	@NonNull
	@Column(name = "USER_NAME")
	private String userName;

	@NonNull
	@Column(name = "MAIL")
	private String mail;

	@NonNull
	@Column(name = "PASSWORD")
	private String password;

}
