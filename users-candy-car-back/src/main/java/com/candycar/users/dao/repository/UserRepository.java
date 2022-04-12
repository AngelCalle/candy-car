package com.candycar.users.dao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.candycar.users.dao.model.User;

@Repository
@Transactional
public interface UserRepository extends JpaRepository<User, Integer> {
	
}
