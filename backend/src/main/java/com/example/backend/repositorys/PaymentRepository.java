package com.example.backend.repositorys;

import com.example.backend.models.Order;
import com.example.backend.models.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    @Query("SELECT p FROM Payment p where p.order.customerId = ?1")
    List<Payment> findPaymentByCustomerId(Long customerId);
}
