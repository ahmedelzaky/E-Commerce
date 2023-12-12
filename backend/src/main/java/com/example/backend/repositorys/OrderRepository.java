package com.example.backend.repositorys;

import com.example.backend.dto.OrderDetailsDTO;
import com.example.backend.enums.OrderStatus;
import com.example.backend.models.Order;
import com.example.backend.models.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository

public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("SELECT o FROM Order o where DATE(o.orderDate)  = ?1")
    List<Order> findOrdersByDate(LocalDate orderDate);


    @Query("SELECT o FROM Order o where o.customerId= ?1")
    List<Order> findOrderByCustomerId(Long customerId);


    @Query("SELECT COUNT(o) FROM Order o where o.status=?1")
    Long countOrdersByStatus(OrderStatus status);

    @Query("SELECT o FROM Order o where o.status=?1 ORDER BY o.id DESC")
    List<Order> findOrdersByStatus(OrderStatus status);

    @Query(value = "SELECT * FROM get_order_details(:id)", nativeQuery = true)
    Optional<OrderDetailsDTO> findOrderDetails(Long id);
}