package com.example.gallery.cart.dto;

import com.example.gallery.cart.entity.Cart;
import lombok.Getter;

@Getter
public class CartRequest {

    private Integer itemId;

    //엔티티 객체로 변환
    public Cart toEntity(Integer memberId){
        return new Cart(memberId, itemId);
    }
}
