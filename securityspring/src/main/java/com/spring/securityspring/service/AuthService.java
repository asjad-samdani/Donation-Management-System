package com.spring.securityspring.service;

import javax.naming.AuthenticationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spring.securityspring.Dto.UserDTO;
import com.spring.securityspring.model.Auth;
import com.spring.securityspring.repository.UserRepo;

@Service
public class AuthService {
  @Autowired
  private UserRepo userRepo;
  @Autowired
  private AuthenticationManager authenticationManager;
  @Autowired
  private JwtService jwtService;

  @Autowired
  ObjectMapper mapper;

  private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

  public String authenticateUser(Auth user) {

    try {
      Authentication authentication = authenticationManager
          .authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

      if (authentication.isAuthenticated()) {
        return jwtService.generateToken(user.getUsername());

      } else {
        throw new AuthenticationException("Authentication failed");

      }

    } catch (AuthenticationException e) {
      e.printStackTrace();
      throw new RuntimeException("Invalid username or password", e);

    }
  }

  public Auth register(Auth user) {
    if (userRepo.findByUsername(user.getUsername()) != null) {
      return null;
    }
    // user.setName(user.getUsername());
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    user.setRole("ROLE_USER");
    return userRepo.save(user);

  }

  public UserDTO getMe() {
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    UserDTO user = mapper.convertValue(principal, UserDTO.class);
    return user;

  }

}