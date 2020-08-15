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

    /**
     * This method is the end point for cart items GET request.
     * @return List<Cart> This returns list of Cart items.
     */
    @GetMapping
    public List<Cart> getCartContent() {
        return cartRepository.findAll();
    }

    /**
     * This method is the end point for cart items POST request.
     * @param cart The item that needs to be added into cart.
     * @exception ResponseStatusException On invalid input error.
     * @return Cart This returns the newly added item into the cart.
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Cart addToCart(@RequestBody final Cart cart ) {
        try {
            /* If the Item Id in the request body is not null and has a value */
            if ( cart.getItemId() > 0 ) {
                List<Cart> cartItems = cartRepository.findAll();
                if (cartItems.size() != 0) {
                    for (Cart item : cartItems) {
                        /* Check if the Item Id already exists */
                        if ( item.getItemId() == cart.getItemId() ) {
                            /* If the Item Id exists in the cart, then POST is not allowed. */
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

    /**
     * This method is the end point for cart items PUT request.
     * @param cart The item that needs to be updated in the cart.
     * @exception ResponseStatusException On invalid input error.
     * @return Cart This returns the updated item in the cart.
     */
    @PutMapping
    @Validated
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Cart updateCart(@Validated @RequestBody final Cart cart) {
        try {
            /* Get the item from the cart table using the received id, update its quantity and persist */
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

    /**
     * This method is the end point for cart items DELETE request.
     * @param id The item id that needs to be deleted from the cart.
     * @exception ResponseStatusException On invalid input error.
     * @return void This doesn't return anything.
     */
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
