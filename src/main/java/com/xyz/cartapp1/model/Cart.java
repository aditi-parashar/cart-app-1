package com.xyz.cartapp1.model;

import javax.persistence.*;
import java.util.List;

@Entity(name="cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="item_id")
    private int itemId;

    @OneToOne(optional = false)
    @JoinColumn(name = "product_id", referencedColumnName = "id", unique = true, nullable = false)
    private Product product;

    @Column(nullable = false)
    private long quantity;

    public int getItemId() {
        return itemId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public long getQuantity() {
        return quantity;
    }

    public void setQuantity(long quantity) {
        this.quantity = quantity;
    }

    public Cart(int itemId, Product product, long quantity) {
        this.itemId = itemId;
        this.product = product;
        this.quantity = quantity;
    }

    protected Cart() {
    }
}
