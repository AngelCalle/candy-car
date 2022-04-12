package com.candycar.users.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.candycar.users.dao.model.User;
import com.candycar.users.service.impl.UserServiceImpl;

@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private UserServiceImpl userService;

	// http://localhost:8080/api-candy-car/v1/user/find_all
	@GetMapping("/find_all")
	public ResponseEntity<Iterable<User>> findAll() {		
		return ResponseEntity.ok().body(userService.findAll());
	}

}
