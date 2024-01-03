package com.example.backend.repositorys;

import com.example.backend.models.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CityRepository extends JpaRepository<City, Long> {
    @Query("SELECT c FROM City c WHERE c.countryId = ?1")
    List<City> getCityByCountryId(Long id);
}
