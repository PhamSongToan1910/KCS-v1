package com.example.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.DTO.RoomPrivateDTO;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.RoomPrivateService;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/room-private")
public class RoomPrivateController {

	@Autowired
	private RoomPrivateService roomPrivateService;
	
	@Autowired
	private UserRepository userRepository;
	
	@GetMapping("/{id1}")
	public ResponseEntity<List<RoomPrivateDTO>> getRoomByUser(@PathVariable("id1") Long id1) {
		List<RoomPrivateDTO> roomPrivateDTO = this.roomPrivateService.getByUserID(id1);
		for(RoomPrivateDTO r: roomPrivateDTO) {
			String[] obj = r.getName().split("-");
			if(obj[0].contains(id1+"")) {
				r.setName(obj[1]);
				if(r.getAvt() == null) {
					String idString = obj[1].substring(0,1);
					System.out.println(idString + " id");
					Long idLong = Long.parseLong(idString);
					Optional<User> user = this.userRepository.findById(idLong);
					r.setAvt(user.get().getAvt());
				}
			} else {
				r.setName(obj[0]);
				if(r.getAvt() == null) {
					String idString = obj[0].substring(0,1);
					Long idLong = Long.parseLong(idString);
					Optional<User> user = this.userRepository.findById(idLong);
					r.setAvt(user.get().getAvt());
				}
			}
		}
		return new ResponseEntity<>(roomPrivateDTO, HttpStatus.OK);
	}
	
}
