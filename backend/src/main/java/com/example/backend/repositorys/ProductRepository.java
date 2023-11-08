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

    @Query("SELECT p.id AS id, p.title AS title," +
            " p.price AS price, p.stockQuantity As stockQuantity," +
            " p.imageUrl As image, p.rating AS rating," +
            " p.description As description, c.name AS category" +
            " FROM Product p JOIN Category c ON c.id = p.categoryId ORDER BY p.id")
    List<ProductDto> findAllProducts();


    @Query("SELECT p.id AS id, p.title AS title," +
            " p.price AS price, p.stockQuantity As stockQuantity," +
            " p.imageUrl As image, p.rating AS rating," +
            " p.description As description, c.name AS category" +
            " FROM Product p JOIN Category c ON c.id = p.categoryId WHERE  p.id = ?1")
    Optional<ProductDto> findSpecific(Long productId);

    @Query("select p FROM Product p WHERE  p.title = ?1")
    Optional<Product> findByTittle(String title);

    @Query("SELECT p.id AS id, p.title AS title," +
            " p.price AS price, p.stockQuantity As stockQuantity," +
            " p.imageUrl As image, p.rating AS rating," +
            " p.description As description, c.name AS category" +
            " FROM Product p JOIN Category c ON c.id = p.categoryId WHERE p.price >= :min AND p.price <= :max")
    List<ProductDto> findProductsWithRange(Integer min, Integer max);

    @Query("SELECT p.id AS id, p.title AS title," +
            " p.price AS price, p.stockQuantity As stockQuantity," +
            " p.imageUrl As image, p.rating AS rating," +
            " p.description As description, c.name AS category" +
            " FROM Product p JOIN Category c ON c.id = p.categoryId WHERE p.price >= :min AND p.price <= :max ORDER BY " +
            " CASE WHEN :sortBy = 'title' THEN p.title END, " +
            " CASE WHEN :sortBy = 'price' THEN p.price END ")
    List<ProductDto> findProductsWithRangeAndSort(Integer min, Integer max, String sortBy);

    @Query("SELECT p.id AS id, p.title AS title," +
            " p.price AS price, p.stockQuantity As stockQuantity," +
            " p.imageUrl As image, p.rating AS rating," +
            " p.description As description, c.name AS category" +
            " FROM Product p JOIN Category c ON c.id = p.categoryId ORDER BY " +
            " CASE WHEN :sortBy = 'title' THEN p.title END, " +
            " CASE WHEN :sortBy = 'price' THEN p.price END ")
    List<ProductDto> findAllProductsAndSort(String sortBy);

    @Query("SELECT p.id AS id, p.title AS title," +
            " p.price AS price, p.stockQuantity As stockQuantity," +
            " p.imageUrl As image, p.rating AS rating," +
            " p.description As description, c.name AS category" +
            " FROM Product p JOIN Category c ON c.id = p.categoryId WHERE c.name = ?1")
    List<ProductDto> findAllProductsByCategoryName(String name);

    @Query("SELECT p.id AS id, p.title AS title," +
            " p.price AS price, p.stockQuantity As stockQuantity," +
            " p.imageUrl As image, p.rating AS rating," +
            " p.description As description, c.name AS category" +
            " FROM Product p JOIN Category c ON c.id = p.categoryId WHERE c.name = :categoryName AND p.price >= :min AND p.price <= :max")
    List<ProductDto> findProductsByCategoryNameAndRange(String categoryName, Integer min, Integer max);

    @Query("SELECT p.id AS id, p.title AS title," +
            " p.price AS price, p.stockQuantity As stockQuantity," +
            " p.imageUrl As image, p.rating AS rating," +
            " p.description As description, c.name AS category" +
            " FROM Product p JOIN Category c ON c.id = p.categoryId WHERE c.name = :categoryName  ORDER BY " +
            " CASE WHEN :sortBy = 'title' THEN p.title END, " +
            " CASE WHEN :sortBy = 'price' THEN p.price END ")
    List<ProductDto> findProductsByCategoryNameAndSort(String categoryName, String sortBy);

    @Query("SELECT p.id AS id, p.title AS title," +
            " p.price AS price, p.stockQuantity As stockQuantity," +
            " p.imageUrl As image, p.rating AS rating," +
            " p.description As description, c.name AS category" +
            " FROM Product p JOIN Category c ON c.id = p.categoryId WHERE c.name = :categoryName AND p.price >= :min AND p.price <= :max ORDER BY " +
            " CASE WHEN :sortBy = 'title' THEN p.title END, " +
            " CASE WHEN :sortBy = 'price' THEN p.price END ")
    List<ProductDto> findProductsByCategoryNameAndRangeAndSort(String categoryName, Integer min, Integer max, String sortBy);

}
