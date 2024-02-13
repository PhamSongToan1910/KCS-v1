package com.example.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.backend.entity.AutoChat;
import com.example.backend.entity.RoomPrivate;

@Repository
public interface RoomPrivateRepository extends JpaRepository<RoomPrivate, Long> {

	List<RoomPrivate> getByIdCreator(Long id);

	
}
