package com.xyz.cartapp1.controller;

import com.xyz.cartapp1.model.Product;
import com.xyz.cartapp1.repository.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/products")
public class ProductsController {
    @Autowired
    ProductsRepository productsRepository;

    @GetMapping
    public List<Product> getProducts() {
        return productsRepository.findAll();
    }
}
