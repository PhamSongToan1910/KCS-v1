package com.example.backend.serviceImpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.DTO.RoomPrivateDTO;
import com.example.backend.entity.RoomDetail;
import com.example.backend.entity.RoomPrivate;
import com.example.backend.entity.User;
import com.example.backend.repository.RoomDetailRepository;
import com.example.backend.repository.RoomPrivateRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.RoomPrivateService;

@Service
public class RoomPrivateServiceImpl implements RoomPrivateService{

	@Autowired
	private RoomPrivateRepository roomPrivateRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private RoomDetailRepository roomDetailRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Override
	public List<RoomPrivateDTO> getByUserID(Long id) {
		// TODO Auto-generated method stub
		Optional<User> user = this.userRepository.findById(id);
		List<RoomDetail> listRoomDetails = (List<RoomDetail>) user.get().getListRoomsDetail();
		List<RoomPrivateDTO> listRoomPrivateDTOs = new ArrayList<>();
		listRoomDetails.stream().forEach((item) -> System.out.println(item.getRoomID()));
		for(RoomDetail r: listRoomDetails) {
			Optional<RoomPrivate> roomPrivate = this.roomPrivateRepository.findById(r.getRoomID());
			listRoomPrivateDTOs.add(this.modelMapper.map(roomPrivate, RoomPrivateDTO.class));
		}
		return listRoomPrivateDTOs;
	}

	@Override
	public RoomPrivateDTO create(RoomPrivateDTO roomPrivateDTO) {
		// TODO Auto-generated method stub
		RoomPrivate roomPrivate = this.modelMapper.map(roomPrivateDTO, RoomPrivate.class);
		this.roomPrivateRepository.save(roomPrivate);
		return roomPrivateDTO;
	}

	@Override
	public RoomPrivateDTO getByUser1IDAndUser2ID(Long id1, Long id2) {
		// TODO Auto-generated method stub
		Optional<RoomDetail> roomDetail = this.roomDetailRepository.getByUsers(id1, id2);
		Optional<RoomPrivate> roomPrivate = this.roomPrivateRepository.findById(roomDetail.get().getRoomID());
		return this.modelMapper.map(roomPrivate, RoomPrivateDTO.class);
	}

	@Override
	public RoomPrivateDTO getByID(Long id) {
		// TODO Auto-generated method stub
		Optional<RoomPrivate> roomPrivate = this.roomPrivateRepository.findById(id);
		return this.modelMapper.map(roomPrivate, RoomPrivateDTO.class);
	}

	
}
