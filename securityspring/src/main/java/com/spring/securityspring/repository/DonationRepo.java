package com.spring.securityspring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.securityspring.model.Donation;

public interface DonationRepo extends JpaRepository<Donation, Long> {

  List<Donation> findByAuthId(Long userId);

}
