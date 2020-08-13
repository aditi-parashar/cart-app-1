package com.xyz.cartapp1.controller;

import com.xyz.cartapp1.model.Cart;
import com.xyz.cartapp1.repository.CartRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Validated
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private CartRepository cartRepository;

    @GetMapping
    public List<Cart> getCartContent() {
        return cartRepository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Cart addToCart(@RequestBody final Cart cart ) {
        return cartRepository.saveAndFlush(cart);
    }

    @PutMapping
    public Cart updateCart(@RequestBody final Cart cart) {
        Cart existingCartItem = cartRepository.getOne(cart.getItemId());
        BeanUtils.copyProperties(cart, existingCartItem, "itemId");
        return cartRepository.saveAndFlush(existingCartItem);
    }

    @DeleteMapping("/{id}")
    public void deleteFromCart(@PathVariable int id) {
        cartRepository.deleteById(id);
    }

}
