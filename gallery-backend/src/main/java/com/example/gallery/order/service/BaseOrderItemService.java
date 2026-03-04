package com.example.gallery.order.service;

import com.example.gallery.order.entity.OrderItem;
import com.example.gallery.order.repository.OrderItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service // ①
@RequiredArgsConstructor // ②
public class BaseOrderItemService implements OrderItemService {

    private final OrderItemRepository orderItemRepository; // ③

    // 주문 목록 조회
    @Override
    public List<OrderItem> findAll(Integer orderId) { // ④
        return orderItemRepository.findAllByOrderId(orderId);
    }

    // 주문 상품 데이터 저장
    @Override
    public void saveAll(List<OrderItem> orderItems) { // ④
        orderItemRepository.saveAll(orderItems);
    }
}
