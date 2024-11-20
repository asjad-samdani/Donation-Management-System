package com.spring.securityspring.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spring.securityspring.Dto.UserDTO;
import com.spring.securityspring.model.Auth;
import com.spring.securityspring.service.AuthService;

@RestController
public class AuthController {
  @Autowired
  private AuthService userService;

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody Auth user) {
    try {
      String token = userService.authenticateUser(user);

      if (token != null && !token.isEmpty()) {
        return ResponseEntity.ok(Map.of("token", token));
      } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .body(Map.of("message", "Invalid username or password"));
      }
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
          .body(Map.of("message", "Invalid username or password"));
    }

  }

  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestBody Auth user) {
    Auth userResp = userService.register(user);

    if (userResp != null) {
      return ResponseEntity.status(HttpStatus.CREATED)
          .body(Map.of("message", "Register successfully"));
    } else {
      return ResponseEntity.status(HttpStatus.CONFLICT)
          .body(Map.of("message", "Username already registered"));
    }
  }

  @GetMapping("/me")
  public UserDTO getMe() {
    return userService.getMe();
  }

}
