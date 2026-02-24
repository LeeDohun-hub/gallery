package com.example.gallery.item.controller;

import com.example.gallery.item.dto.ItemRead;
import com.example.gallery.item.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController // ①
@RequestMapping("/v1") // ②
@RequiredArgsConstructor // ③
public class ItemController {

    private final ItemService itemService; // ④

    @GetMapping("/api/items")
    public ResponseEntity<?> readAll() { // ⑤
        List<ItemRead> items = itemService.findAll();
        return new ResponseEntity<>(items, HttpStatus.OK);
    }
}
