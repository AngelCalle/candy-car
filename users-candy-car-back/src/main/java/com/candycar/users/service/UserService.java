package com.candycar.users.service;

import com.candycar.users.dao.model.User;

public interface UserService {

	Iterable<User> findAll();
	
	Boolean existsByMail(String mail);	

	User findByMailAndPassword(String mail, String password);
	
	User save(User user);
	
	User editUser(String id, User user);

}
