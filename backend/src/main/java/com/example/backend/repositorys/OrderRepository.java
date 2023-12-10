package com.example.backend.repositorys;

import com.example.backend.models.Order;
import com.example.backend.models.Payment;
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

    @Query("SELECT o FROM Order o where MONTH(o.orderDate)  = ?1")
    List<Payment> findOrdersByMonth(Integer month);

    @Query("SELECT o FROM Order o where o.customerId= ?1")
    List<Order> findOrderByCustomerId(Long customerId);

    @Query("SELECT o FROM Order o where o.status='PENDING'")
    List<Order> findPendingOrders();

    @Query("SELECT o FROM Order o where o.status='IN_PROGRESS'")
    List<Order> findInProgressOrders();

    @Query("SELECT o FROM Order o where o.status='COMPLETED'")
    List<Order> findDeliveredOrders();
}