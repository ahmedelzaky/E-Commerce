package com.example.backend.repositorys;

import com.example.backend.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository

public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("SELECT o FROM Order o where DATE(o.orderDate)  = ?1")
    List<Order> findOrdersByDate(LocalDate orderDate);
}