package com.example.gallery.order.entity;

import com.example.gallery.order.dto.OrderRead;
import jakarta.persistence.*;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private Integer memberId;

    @Column(length = 50, nullable = false)
    private String name;

    @Column(length = 500, nullable = false)
    private String address;

    @Column(length = 10, nullable = false)
    private String payment;

    @Column(length = 50)
    private String cardNumber;

    @Column(nullable = false)
    private Long amount;

    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime created;

    public Order() {
    }

    public Order(Integer memberId, String name, String address, String payment, String cardNumber, Long amount) {
        this.memberId = memberId;
        this.name = name;
        this.address = address;
        this.payment = payment;
        this.cardNumber = cardNumber;
        this.amount = amount;
    }

    // 주문 조회 DTO로 변환
    public OrderRead toRead() { // ②
        return OrderRead.builder()
                .id(id)
                .name(name)
                .address(address)
                .payment(payment)
                .amount(amount)
                .created(created)
                .build();
    }
}
