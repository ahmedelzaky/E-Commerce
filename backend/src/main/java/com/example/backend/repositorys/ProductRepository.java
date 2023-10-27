package com.example.backend.repositorys;


import com.example.backend.dto.ProductDto;
import com.example.backend.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p.id AS id, p.title AS title," + " p.price AS price, p.stockQuantity As stockQuantity," + " p.imageUrl As image, p.rating AS rating," + " p.description As description, c.name AS category" + "   FROM Product p JOIN Category c ON c.id = p.categoryId ORDER BY p.id")
    List<ProductDto> findAllProducts();

    @Query("SELECT p.id AS id, p.title AS title," + " p.price AS price, p.stockQuantity As stockQuantity," + " p.imageUrl As image, p.rating AS rating," + " p.description As description, c.name AS category" + " FROM Product p JOIN Category c ON c.id = p.categoryId WHERE c.name = ?1")
    List<ProductDto> findAllByCategoryName(String name);


    @Query("SELECT p.id AS id, p.title AS title," + " p.price AS price, p.stockQuantity As stockQuantity," + " p.imageUrl As image, p.rating AS rating," + " p.description As description, c.name AS category" + "   FROM Product p JOIN Category c ON c.id = p.categoryId WHERE  p.id = ?1")
    Optional<ProductDto> findSpecific(Long productId);

    @Query("select p FROM Product p WHERE  p.title = ?1")
    Optional<Product> findByTittle(String title);
}
