package com.example.backend.repositorys;


import com.example.backend.dto.PriceHistoryDto;
import com.example.backend.dto.ProductDto;
import com.example.backend.dto.SoldProductDto;
import com.example.backend.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query(value = "SELECT * FROM  get_all_products() ", nativeQuery = true)
    List<ProductDto> findAllProducts();


    @Query(value = "SELECT * FROM  get_all_products() " + " WHERE  id = ?1", nativeQuery = true)
    Optional<ProductDto> findProductDtoById(Long productId);

    @Query("select p FROM Product p WHERE lower( p.title) = lower(:title) ")
    Optional<Product> findByTittle(String title);

    @Query(value = "SELECT * FROM  get_all_products() " + " WHERE price >= :min AND price <= :max", nativeQuery = true)
    List<ProductDto> findProductsWithRange(Integer min, Integer max);

    @Query(value = "SELECT * FROM  get_all_products() " + " WHERE price >= :min AND price <= :max ORDER BY " + " CASE WHEN :sortBy = 'title' THEN title END,    " + " CASE WHEN :sortBy = 'price' THEN price END,    " + " CASE WHEN :sortBy = 'id'    THEN id    END     ", nativeQuery = true)
    List<ProductDto> findProductsWithRangeAndSort(Integer min, Integer max, String sortBy);

    @Query(value = "SELECT * FROM  get_all_products() ORDER BY " + " CASE WHEN :sortBy = 'title' THEN title END,      " + " CASE WHEN :sortBy = 'price' THEN price END,      " + " CASE WHEN :sortBy = 'id'    THEN id    END       ", nativeQuery = true)
    List<ProductDto> findAllProductsAndSort(String sortBy);

    @Query(value = "SELECT * FROM  get_all_products() " + " WHERE category = ?1", nativeQuery = true)
    List<ProductDto> findAllProductsByCategoryName(String name);

    @Query(value = "SELECT * FROM  get_all_product_by_category(:categoryName) " + " WHERE price >= :min " + " AND price <= :max", nativeQuery = true)
    List<ProductDto> findProductsByCategoryNameAndRange(String categoryName, Integer min, Integer max);

    @Query(value = "SELECT * FROM  get_all_product_by_category(:categoryName) " + " ORDER BY CASE WHEN :sortBy = 'title' THEN title END, " + " CASE WHEN :sortBy = 'price' THEN price END, " + " CASE WHEN :sortBy = 'id'    THEN id    END  ", nativeQuery = true)
    List<ProductDto> findProductsByCategoryNameAndSort(String categoryName, String sortBy);

    @Query(value = "SELECT * FROM  get_all_product_by_category(:categoryName)" + " WHERE price >= :min " + " AND price <= :max ORDER BY " + " CASE WHEN :sortBy = 'title' THEN title END,  " + " CASE WHEN :sortBy = 'price' THEN price END,  " + " CASE WHEN :sortBy = 'id'    THEN id    END   ", nativeQuery = true)
    List<ProductDto> findProductsByCategoryNameAndRangeAndSort(String categoryName, Integer min, Integer max, String sortBy);

    @Query(value = "SELECT * FROM  get_all_products()  " + " WHERE price >= :min AND price <= :max ORDER BY " + " CASE WHEN :sortBy = 'title' THEN title END,    " + " CASE WHEN :sortBy = 'price' THEN price END,    " + " CASE WHEN :sortBy = 'id'    THEN id    END     ", nativeQuery = true)
    List<ProductDto> findProductsWithRangeAndSortAsc(Integer min, Integer max, String sortBy);

    @Query(value = "SELECT * FROM  get_all_products()  " + " WHERE price >= :min AND price <= :max ORDER BY   " + " CASE WHEN :sortBy = 'title' THEN title END DESC, " + " CASE WHEN :sortBy = 'price' THEN price END DESC, " + " CASE WHEN :sortBy = 'id'    THEN id    END DESC  ", nativeQuery = true)
    List<ProductDto> findProductsWithRangeAndSortDesc(Integer min, Integer max, String sortBy);

    @Query(value = "SELECT * FROM  get_all_products() ORDER BY " + " CASE WHEN :sortBy = 'title' THEN title END,      " + " CASE WHEN :sortBy = 'price' THEN price END,      " + " CASE WHEN :sortBy = 'id'    THEN id    END       ", nativeQuery = true)
    List<ProductDto> findAllProductsAndSortAsc(String sortBy);

    @Query(value = "SELECT * FROM  get_all_products() ORDER BY " + " CASE WHEN :sortBy = 'title' THEN title END DESC, " + " CASE WHEN :sortBy = 'price' THEN price END DESC, " + " CASE WHEN :sortBy = 'id'    THEN id    END DESC  ", nativeQuery = true)
    List<ProductDto> findAllProductsAndSortDesc(String sortBy);

    @Query(value = "SELECT * FROM  get_all_product_by_category(:categoryName) " + " WHERE price >= :min AND price <= :max  ORDER BY " + " CASE WHEN :sortBy = 'title' THEN title END,   " + " CASE WHEN :sortBy = 'price' THEN price END,   " + " CASE WHEN :sortBy = 'id'    THEN id    END    ", nativeQuery = true)
    List<ProductDto> findProductsByCategoryNameAndRangeAndSortAsc(String categoryName, Integer min, Integer max, String sortBy);

    @Query(value = "SELECT * FROM get_all_product_by_category(:categoryName)" + " WHERE price >= :min AND price <= :max ORDER BY     " + " CASE WHEN :sortBy = 'title' THEN title END DESC, " + " CASE WHEN :sortBy = 'price' THEN price END DESC, " + " CASE WHEN :sortBy = 'id'    THEN id    END DESC  ", nativeQuery = true)
    List<ProductDto> findProductsByCategoryNameAndRangeAndSortDesc(String categoryName, Integer min, Integer max, String sortBy);

    @Query(value = "SELECT * FROM  get_all_product_by_category(:categoryName)" + " ORDER BY  CASE WHEN :sortBy = 'title' THEN title END, " + " CASE WHEN :sortBy = 'price' THEN price END, " + " CASE WHEN :sortBy = 'id'    THEN id    END  ", nativeQuery = true)
    List<ProductDto> findProductsByCategoryNameAndSortAsc(String categoryName, String sortBy);

    @Query(value = " SELECT * FROM  get_all_product_by_category(:categoryName)" + "  ORDER BY CASE WHEN :sortBy = 'title' THEN title END DESC," + " CASE WHEN :sortBy = 'price' THEN price END DESC," + " CASE WHEN :sortBy = 'id'    THEN id    END DESC ", nativeQuery = true)
    List<ProductDto> findProductsByCategoryNameAndSortDesc(String categoryName, String sortBy);

    @Query(value = " SELECT * FROM  get_all_products()  " + " WHERE lower(title)    LIKE    :searchText ", nativeQuery = true)
    List<ProductDto> searchProducts(String searchText);

    @Query(value = " SELECT * FROM  get_all_product_by_category(:categoryName)  " + " WHERE lower(title)    LIKE    :searchText ", nativeQuery = true)
    List<ProductDto> searchProductsByCategoryName(String searchText, String categoryName);

    @Query(value = "SELECT * FROM get_top_selling() LIMIT 4", nativeQuery = true)
    List<ProductDto> findTopSellingProducts();

    @Query(value = "SELECT * FROM get_all_products() WHERE stockquantity <= 10", nativeQuery = true)
    List<ProductDto> findLowStockProducts();

    @Query(value = "SELECT COUNT(p) FROM Product p WHERE p.stockQuantity <= 10")
    int findLowStockCount();

    @Query(value = "SELECT * FROM sold_products_v", nativeQuery = true)
    List<SoldProductDto> findProductsBySails();

    @Query(value = "SELECT ph.price as price , ph.date as date  " +
            "     FROM price_history_t ph WHERE product_id = :productId", nativeQuery = true)
    List<PriceHistoryDto> findPriceHistory(Long productId);
}
