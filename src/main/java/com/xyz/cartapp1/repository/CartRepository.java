package com.xyz.cartapp1.repository;

import com.xyz.cartapp1.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Integer> {
}
