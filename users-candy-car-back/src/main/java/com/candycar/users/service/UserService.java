package com.candycar.users.service;

import com.candycar.users.dao.model.User;

public interface UserService {

	public Iterable<User> findAll();

}
