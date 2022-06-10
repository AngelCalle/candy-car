package com.candycar.users.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	// http://localhost:8080/api-candy-car/v1/user/login/candycar@mail.com/TestAAA
	@GetMapping("/login/{mail}/{password}")
	public ResponseEntity<User> findByMailAndPassword(@PathVariable("mail") String mail, @PathVariable("password") String password) {
		return ResponseEntity.ok().body(userService.findByMailAndPassword(mail, password));
	}
	
	// http://localhost:8080/api-candy-car/v1/user/register
	// {"name": "Toss", "userName": "candycop", "mail": "candycop@mail.com", "password": "daAs43_245a"}
	@PostMapping("/register")
	public ResponseEntity<User> save(@RequestBody(required = true) User user) {
		return new ResponseEntity<>(userService.save(user), HttpStatus.CREATED);
	}
	
	// http://localhost:8080/api-candy-car/v1/user/register
	// {"name": "Toss", "userName": "candycop", "mail": "candycop@mail.com", "password": "daAs43_245a"}
	@PutMapping("/edit-user/{id}")
	public ResponseEntity<User> editUser(@PathVariable("id") String id, @RequestBody(required = true) User user) {
		return new ResponseEntity<>(userService.editUser(id, user), HttpStatus.CREATED);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Boolean> deleteById(@PathVariable("id") Integer id) {
		return new ResponseEntity<>(userService.deleteById(id), HttpStatus.CREATED);
	}

}
