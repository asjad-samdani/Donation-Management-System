package com.spring.securityspring.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.securityspring.model.Auth;

public interface UserRepo extends JpaRepository<Auth, Long> {
  Auth findByUsername(String username);

}
