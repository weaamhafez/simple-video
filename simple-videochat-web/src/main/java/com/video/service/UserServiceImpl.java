package com.video.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.video.model.um.user.User;
import com.video.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Resource
	private UserRepository userRepository;
	
	@Override
	public User findByUserName(String userName) {
		return userRepository.findByUsername(userName);
	}

}
