package com.example.backend.service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;

import com.example.backend.DTO.RoomPrivateDTO;
import com.example.backend.entity.RoomPrivate;

public interface RoomPrivateService {

	List<RoomPrivateDTO> getByUserID(Long id);
	
	RoomPrivateDTO create(RoomPrivateDTO roomPrivateDTO);
	
	RoomPrivateDTO getByUser1IDAndUser2ID(Long id1, Long id2);
	
	RoomPrivateDTO getByID(Long id);
	
//	HashMap<Long, String> getContactList(Long id);
}
