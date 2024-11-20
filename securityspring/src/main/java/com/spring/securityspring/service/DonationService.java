package com.spring.securityspring.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spring.securityspring.Dto.DonationDto;
import com.spring.securityspring.Dto.UserDTO;
import com.spring.securityspring.model.Auth;
import com.spring.securityspring.model.Donation;
import com.spring.securityspring.repository.DonationRepo;

@Service
public class DonationService {

  @Autowired
  private DonationRepo donationRepo;
  @Autowired
  ObjectMapper objectMapper;

  public Donation addDonate(Donation donation) {
    Auth auth = new Auth();
    auth.setId(getUserIdFromContext());
    donation.setAuth(auth);
    return donationRepo.save(donation);

  }

  public List<DonationDto> getAllDonationByUSerId() {
    Long userId = getUserIdFromContext();
    List<Donation> donations = donationRepo.findByAuthId(userId);

    // Using Stream--------------->
    // List<DonationDto> donationDtos = donations.stream()
    // .map(donation -> objectMapper.convertValue(donation, DonationDto.class))
    // .collect((Collectors.toList()));
    // return donationDtos;

    // Manually---------------------->
    List<DonationDto> donationDtos = new ArrayList<>();
    for (Donation donation : donations) {
      DonationDto dto = new DonationDto();
      dto.setMonth(donation.getMonth());
      dto.setAmount(donation.getAmount());
      dto.setTransactionID(donation.getTransactionID());
      dto.setCreatedAt(donation.getCreatedAt());
      donationDtos.add(dto);

    }
    return donationDtos;

    // 3rd------------------------>
    // List<DonationDto> donationDtos = new ArrayList<>();
    // for (Donation donation : donations) {
    // DonationDto dto = objectMapper.convertValue(donation, DonationDto.class);
    // donationDtos.add(dto);
    // }
    // return donationDtos;
    // 4th------------------------------->
    // List<DonationDto> donationDtos = donations.stream()
    // .collect(Collectors.mapping(
    // donation -> new DonationDto(donation.getMonth(), donation.getAmount(),
    // donation.getTransactionID(),
    // donation.getCreatedAt()),
    // Collectors.toList()));

    // return donationDtos;

  }

  Long getUserIdFromContext() {
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    UserDTO user = objectMapper.convertValue(principal, UserDTO.class);
    return user.getId();
  }

}
