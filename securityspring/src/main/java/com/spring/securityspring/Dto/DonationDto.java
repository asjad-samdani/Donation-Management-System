package com.spring.securityspring.Dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DonationDto {
  String month;
  Long amount;
  String transactionID;
  LocalDateTime createdAt;

}