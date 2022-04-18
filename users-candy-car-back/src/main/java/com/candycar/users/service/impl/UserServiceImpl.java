package com.candycar.users.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.candycar.users.dao.model.User;
import com.candycar.users.dao.repository.UserRepository;
import com.candycar.users.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@Validated
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    protected final UserRepository userRepository;

	@Override
	public Iterable<User> findAll() {
		return userRepository.findAll();
	}

}
