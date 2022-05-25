package com.candycar.users.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.candycar.users.dao.model.User;
import com.candycar.users.service.impl.UserServiceImpl;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

	private final UserServiceImpl userService;

	// http://localhost:8080/api-candy-car/v1/user/find_all
	@GetMapping("/find_all")
	public ResponseEntity<Iterable<User>> findAll() {
		return ResponseEntity.ok().body(userService.findAll());
	}

	// http://localhost:8080/api-candy-car/v1/user/mail/candycar@mail.com
	@GetMapping("/mail/{mail}")
	public ResponseEntity<Boolean> existsByMail(@PathVariable("mail") String mail) {
		return ResponseEntity.ok().body(userService.existsByMail(mail));
	}

}
