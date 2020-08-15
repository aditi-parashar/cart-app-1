package com.xyz.cartapp1.controller;

import com.xyz.cartapp1.model.Cart;
import com.xyz.cartapp1.repository.CartRepository;
import org.springframework.beans.FatalBeanException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.orm.jpa.JpaObjectRetrievalFailureException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityNotFoundException;
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
        try {
            if ( cart.getItemId() > 0 ) {
                List<Cart> cartItems = cartRepository.findAll();
                if (cartItems.size() != 0) {
                    for (Cart item : cartItems) {
                        if ( item.getItemId() == cart.getItemId() ) {
                            throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED, "Item already exists in Cart.");
                        }
                    }
                }
            }

            Cart returnCartItem =  cartRepository.saveAndFlush(cart);
            return returnCartItem;
        } catch(DataIntegrityViolationException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The data in request structure is not valid.", e);
        } catch (InvalidDataAccessApiUsageException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The data in request structure is not valid.", e);
        } catch (JpaObjectRetrievalFailureException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The data in request structure is not valid.", e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error adding item in the cart.", e);
        }
    }

    @PutMapping
    @Validated
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Cart updateCart(@Validated @RequestBody final Cart cart) {
        try {
            Cart existingCartItem = cartRepository.getOne(cart.getItemId());
            existingCartItem.setQuantity(cart.getQuantity());
            return cartRepository.saveAndFlush(existingCartItem);
        } catch(EntityNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item doesn't exist in the cart.", e);
        } catch(DataIntegrityViolationException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The data in request structure is not valid.", e);
        } catch(FatalBeanException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error while copying the data.", e);
        } catch (InvalidDataAccessApiUsageException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The data in request structure is not valid.", e);
        } catch(HttpMessageNotReadableException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The data in request structure is not valid.", e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error updating item in the cart.", e);
        }
    }

    @DeleteMapping("/{id}")
    public void deleteFromCart(@PathVariable int id) {
        try {
            cartRepository.deleteById(id);
        } catch(EmptyResultDataAccessException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item doesn't exist in the cart.", e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error updating item in the cart.", e);
        }
    }

}
