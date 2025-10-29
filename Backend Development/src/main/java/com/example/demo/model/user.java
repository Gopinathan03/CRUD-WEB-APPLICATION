package com.example.demo.model;


import jakarta.persistence.*;
@Entity
@Table(name="user")
public class user {
@Id	
@GeneratedValue(strategy=GenerationType.IDENTITY)
int user_id;
String name;
@Column(unique=true)
String email_id;
@Column(unique=true)
String ph_no;
public int getUser_id() {
	return user_id;
}
public void setUser_id(int user_id) {
	this.user_id = user_id;
}
public String getName() {
	return name;
}
public void setName(String name) {
	this.name = name;
}
public String getEmail_id() {
	return email_id;
}
public void setEmail_id(String email_id) {
	this.email_id = email_id;
}
public String getPh_no() {
	return ph_no;
}
public void setPh_no(String ph_no) {
	this.ph_no = ph_no;
}
}
