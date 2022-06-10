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

	@Override
	public Boolean existsByMail(String mail) {
		return userRepository.existsByMail(mail);
	}
	
	@Override
	public User findByMailAndPassword(String mail, String password) {
		return userRepository.findByMailAndPassword(mail, password);
	}
	
	@Override
	public User save(User user) {
		return userRepository.save(user);
	}

	@Override
	public User editUser(String id, User user) {
		User user_new = new User();
		user_new.setId(Integer.valueOf(id));
		user_new.setName(user.getName());
		user_new.setUserName(user.getUserName());
		user_new.setMail(user.getMail());
		user_new.setPassword(user.getPassword());
		return userRepository.save(user_new);
	}

	@Override
	public Boolean deleteById(Integer id) {
		try {
			userRepository.deleteById(id);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

}
