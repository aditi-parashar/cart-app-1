package com.xyz.cartapp1.controller;

import com.xyz.cartapp1.model.Cart;
import com.xyz.cartapp1.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private CartRepository cartRepository;

    @GetMapping
    public List<Cart> getCartContent() {
        return cartRepository.findAll();
    }

    @PostMapping("/{id}")
    public String addToCart(@PathVariable int id) {
        return "Added to cart";
    }

    @PutMapping
    public String updateCart(@RequestBody final int id) {
        return "Cart updated";
    }

    @DeleteMapping("/{id}")
    public String deleteFromCart(@PathVariable int id) {
        return "Deleted from cart";
    }

}
