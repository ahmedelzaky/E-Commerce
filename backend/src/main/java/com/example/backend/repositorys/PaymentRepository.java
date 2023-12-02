package com.example.backend.repositorys;

import com.example.backend.models.Order;
import com.example.backend.models.Payment;
import org.springframework.cglib.core.Local;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    @Query("SELECT p FROM Payment p where p.order.customerId = ?1")
    List<Payment> findPaymentByCustomerId(Long customerId);
    @Query("SELECT p FROM Payment p where DATE(p.paymentDate)  = ?1")
    List<Payment> findPaymentByDate(LocalDate date);

    @Query("SELECT p FROM Payment p where MONTH(p.paymentDate)  = ?1")
    List<Payment> findPaymentsByMonth(Integer month);
}
