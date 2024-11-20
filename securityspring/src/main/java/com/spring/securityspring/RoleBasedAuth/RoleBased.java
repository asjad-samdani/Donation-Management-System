package com.spring.securityspring.RoleBasedAuth;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RoleBased {

  // @PreAuthorize("hasRole('USER')")
  @GetMapping("/user")
  public String userEndpoint() {
    return "Hello , User!";
  }

  @GetMapping("/admin")
  public String adminEndpoint() {
    return "Hello , Admin!";
  }

}
