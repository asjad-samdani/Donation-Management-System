package com.spring.securityspring.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spring.securityspring.Dto.DonationDto;
import com.spring.securityspring.model.Donation;
import com.spring.securityspring.service.DonationService;

@RestController
public class DonationController {
  @Autowired
  private DonationService donationService;

  @GetMapping("/getdonation")
  public ResponseEntity<?> getDonationByUserId() {
    List<DonationDto> donation = donationService.getAllDonationByUSerId();
    if (!donation.isEmpty()) {
      return new ResponseEntity<>(donation, HttpStatus.OK);
    }
    return new ResponseEntity<>("Not found", HttpStatus.NOT_FOUND);

  }

  @PostMapping("/adddonation")
  public ResponseEntity<?> addDonate(@RequestBody Donation donation) {
    Donation donationresponse = donationService.addDonate(donation);
    if (donationresponse != null) {
      return new ResponseEntity<>(donationresponse, HttpStatus.OK);
    } else {
      return new ResponseEntity<>(Map.of("Message", "Bad Request"), HttpStatus.BAD_REQUEST);
    }

  }

}
