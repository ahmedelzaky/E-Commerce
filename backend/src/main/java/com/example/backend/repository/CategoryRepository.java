package com.example.backend.repository;


import com.example.backend.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Query("SELECT  c from Category c  WHERE lower(c.name)  = lower(:name) ")
    Optional<Category> findByName(String name);
}
