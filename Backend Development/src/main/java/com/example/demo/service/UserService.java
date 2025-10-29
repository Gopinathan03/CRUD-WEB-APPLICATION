package com.example.demo.service;




import java.util.*;

import org.springframework.stereotype.Service;

import com.example.demo.model.user;
import com.example.demo.repository.UserRepository;



@Service
public class UserService {
private final UserRepository rep;

public UserService(UserRepository rep) {
	super();
	this.rep = rep;
}
public user saveuser(user u) {
	return rep.save(u);
}

public List<user> getAllUser(){
	return rep.findAll();
}

public user getParticularUser(long id) {
	return rep.findById(id).orElse(null);
}

public void deleteUser(long id) {
	rep.deleteById(id);
}

public user updateUser(long id,user update) {
	return rep.findById(id).map(u->{
		u.setName(update.getName());
		u.setEmail_id(update.getEmail_id());
		u.setPh_no(update.getPh_no());
		return rep.save(u);
	}).orElseThrow(()->new RuntimeException("User Not Found"));
}
}
