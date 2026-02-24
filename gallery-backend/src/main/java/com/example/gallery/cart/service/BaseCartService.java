package com.example.gallery.cart.service;

import com.example.gallery.cart.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BaseCartService implements CartService {

    private final CartRepository cartRepository;

    //장바구니 상품 데이터 목록 조회(특정 회원)
    @Override

}
