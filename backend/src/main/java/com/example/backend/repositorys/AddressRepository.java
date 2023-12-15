package com.example.backend.repositorys;

import com.example.backend.dto.AddressDto;
import com.example.backend.models.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findAddressByCustomerId(Long customerId);

    @Query("SELECT a.id as id," +
            " a.customerId as customerId," +
            " a.street as street," +
            " a.postalCode as postalCode," +
            " c.name as cityName, co.name as countryName " +
            "FROM Address a JOIN City c ON a.cityId = c.id JOIN Country co ON c.countryId = co.id WHERE a.customerId = ?1")
    List<AddressDto> CustomFindAddressByCustomerId(Long customerId);
}
