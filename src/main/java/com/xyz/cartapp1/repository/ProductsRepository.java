package com.xyz.cartapp1.repository;

import com.xyz.cartapp1.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductsRepository extends JpaRepository<Product, Integer> {
}
