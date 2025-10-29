package com.example.demo.controller;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.user;
import com.example.demo.service.UserService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {
private final UserService services;
public UserController(UserService services) {
	super();
	this.services = services;
}
@PostMapping("/addUser")
public ResponseEntity<user> createUser(@RequestBody user u){
	return ResponseEntity.ok(services.saveuser(u));
}
@GetMapping("/allusers")
public ResponseEntity<List<user>> getAllUsers(){
	return ResponseEntity.ok(services.getAllUser());
}
@GetMapping("/user/{id}")
public ResponseEntity<user> getUserById(@PathVariable long id){
	user u=services.getParticularUser(id);
	return u!=null?ResponseEntity.ok(u):ResponseEntity.notFound().build();
}
@DeleteMapping("/user/{id}")
public ResponseEntity<Void> deleteUser(@PathVariable long id) {
	services.deleteUser(id);
	return ResponseEntity.noContent().build();
}
@PutMapping("/user/{id}")
public user updateUser(@PathVariable long id,@RequestBody user u) {
	return services.updateUser(id,u);
}
}
