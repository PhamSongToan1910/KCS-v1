package com.example.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.backend.entity.RoomDetail;
import com.example.backend.entity.RoomPrivate;

@Repository
public interface RoomDetailRepository extends JpaRepository<RoomDetail, Long>{

	@Query("SELECT a FROM RoomDetail a JOIN RoomDetail b ON a.roomID = b.roomID WHERE a.userID.id = :id1 AND b.userID.id = :id2")
	Optional<RoomDetail> getByUsers(Long id1, Long id2);
	
	@Query(value = "select a from RoomDetail a where a.roomID = :roomID and a.userID.id != :userID")
	List<RoomDetail> getByIDRoom(Long roomID, Long userID);
}
