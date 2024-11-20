package com.spring.securityspring.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.spring.securityspring.model.Auth;
import com.spring.securityspring.repository.UserRepo;

@Service
public class MyUserDetailsService implements UserDetailsService {
  @Autowired
  private UserRepo userrepo;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Auth user = userrepo.findByUsername(username);
    if (user == null) {
      throw new UsernameNotFoundException("User name not found");
    }
    return user;

  }

}
