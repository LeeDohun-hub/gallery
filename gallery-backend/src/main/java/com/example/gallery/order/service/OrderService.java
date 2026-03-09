package com.example.gallery.order.service;

import com.example.gallery.order.dto.OrderRead;
import com.example.gallery.order.dto.OrderRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface OrderService {

    // 주문 목록 조회
    Page<OrderRead> findAll(Integer memberId, Pageable pageable); // ①

    // 주문 상세 조회
    OrderRead find(Integer id, Integer memberId); // ②

    // 주문 내역 저장
    void order(OrderRequest params, Integer memberId); // ③
}
