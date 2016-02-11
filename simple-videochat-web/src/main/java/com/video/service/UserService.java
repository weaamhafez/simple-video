package com.video.service;

import java.util.List;

import com.video.model.um.user.User;


public interface UserService {

    User findByUserName(String userName);

}
