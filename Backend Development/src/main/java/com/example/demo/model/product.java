package com.example.demo.model;


import jakarta.persistence.*;
@Entity
@Table(name="product")
public class product {
	@Id	
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int product_id;
	String product_name;
	int product_price;
	
}
