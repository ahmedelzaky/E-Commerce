package com.example.backend.repositorys;

import com.example.backend.dto.CustomerDto;
import com.example.backend.dto.UserDto;
import com.example.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    public Optional<User> findByEmail(String email);


    @Query("SELECT u.id as id , u.email as email , u.firstName as firstName , u.lastName as lastName " +
            ", u.role as role , u.phone as phone , u.joinDate as  joinDate  from User u WHERE u.role = 'USER'")
    List<CustomerDto> getCustomers();

    @Query("SELECT count(u) from User u WHERE u.role = 'USER'")
    Long findCustomerCount();


    @Query("SELECT u.id as id , u.email as email , u.firstName as firstName , u.lastName as lastName "
            + ", u.role as role , u.phone as phone  , u.joinDate as  joinDate  from User u WHERE u.id = ?1 AND u.role = 'USER'")
    Optional<CustomerDto> findCustomerById(Long id);

    @Query("SELECT u.id as id , u.role as role   from User u WHERE u.id = ?1")
    UserDto getUserById(long id);

    @Query("SELECT  u from User u WHERE u.phone = ?1 ")
    Optional<User> findByPhone(String phone);
}

