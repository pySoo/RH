package com.forweber.backend.repository;

import com.forweber.backend.domain.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository{
    User save(User user);
    Optional<User> findById(Long id);
    Long findUserId(String email, String social);
    // DB에 정보를 저장이 된 이메일인지 판단하기 위한 메서드
    Optional<User> findByEmail(String email, String social);
    Optional<User> findByPw(String email, String password);
    List<User> findAll();

}
