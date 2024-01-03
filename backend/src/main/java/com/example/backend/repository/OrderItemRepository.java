package com.example.backend.repository;

import com.example.backend.dto.CartDto;
import com.example.backend.models.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    @Query("SELECT o.productId AS id , o.quantity as quantity , p.imageUrl as image , p.title as title " +
            " FROM  OrderItem o JOIN Product p ON  o.productId = p.id  " +
            "WHERE o.orderId = ?1")
    List<CartDto> getCart(Long id);
}
