package com.example.backend.repository;

import com.example.backend.dto.Earnings;
import com.example.backend.models.Payment;
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

    @Query("SELECT  SUM(p.amount) FROM Payment p where p.order.status='COMPLETED'")
    Double getEarnings();

    @Query("SELECT SUM(p.amount) FROM Payment p where p.order.status='COMPLETED' AND DATE(p.order.arrivalDate)  = CURRENT_DATE")
    Double getEarningsToday();

    @Query("SELECT p FROM Payment p  ORDER BY p.id DESC limit 5")
    List<Payment> findLatestPayments();

    @Query(value = "SELECT TO_CHAR(payment_date, 'Day') AS day,  SUM(amount)   AS earnings " +
            "FROM payment_t WHERE payment_date >= current_date - interval '8 days'  " +
            "and date(payment_date) != current_date GROUP BY day, date(payment_date) " +
            "order by date(payment_date)", nativeQuery = true)
    List<Earnings> getLast7DaysEarnings();

    @Query("SELECT SUM(p.amount) FROM Payment p where p.order.status='PENDING' or p.order.status='IN_PROGRESS'")
    Double getHoldEarnings();
}
