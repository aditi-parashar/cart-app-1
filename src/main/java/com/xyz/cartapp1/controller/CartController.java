package com.xyz.cartapp1.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CartController {

    @GetMapping("/api/cart")
    public String getProducts() {
        return "New Cart Content";
    }
}
