package com.example.gallery.order.controller;

import com.example.gallery.account.helper.AccountHelper;
import com.example.gallery.order.dto.OrderRead;
import com.example.gallery.order.dto.OrderRequest;
import com.example.gallery.order.service.OrderService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1")
@RequiredArgsConstructor
public class OrderController {

    private final AccountHelper accountHelper;
    private final OrderService orderService;

    @GetMapping("/api/orders")
    public ResponseEntity<?> readAll(HttpServletRequest req, Pageable pageable) { // ③
        // 로그인 회원 아이디
        Integer memberId = accountHelper.getMemberId(req);

        // 주문 목록
        Page<OrderRead> orders = orderService.findAll(memberId, pageable);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/api/orders/{id}")
    public ResponseEntity<?> read(HttpServletRequest req, @PathVariable Integer id) {
        // 로그인 회원 아이디
        Integer memberId = accountHelper.getMemberId(req);

        // 주문 조회
        OrderRead order = orderService.find(id, memberId);

        if (order == null) { // 주문 데이터가 없는 경우
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @PostMapping("/api/orders")
    public ResponseEntity<?> add(HttpServletRequest req, @RequestBody OrderRequest orderReq) {
        // 로그인 회원 아이디
        Integer memberId = accountHelper.getMemberId(req);

        // 주문 입력
        orderService.order(orderReq, memberId);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}