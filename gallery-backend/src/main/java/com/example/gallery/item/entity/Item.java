package com.example.gallery.item.entity;

import com.example.gallery.item.dto.ItemRead;
import jakarta.persistence.*;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Getter // ①
@Entity // ②
@Table(name = "items") // ③
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; // ④

    @Column(length = 50, nullable = false)
    private String name; // ⑤

    @Column(length = 100, nullable = false)
    private String imgPath; // ⑥

    @Column(nullable = false)
    private Integer price; // ⑦

    @Column(nullable = false)
    private Integer discountPer; // ⑧

    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime created; // ⑨

    //상품 조회 DTO로 반환
    public ItemRead toRead() {
        return ItemRead.builder()
                .id(id)
                .name(name)
                .price(price)
                .discountPer(discountPer)
                .build();
    }
}
