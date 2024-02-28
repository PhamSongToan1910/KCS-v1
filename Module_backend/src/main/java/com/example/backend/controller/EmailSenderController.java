package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.DTO.EmailSenderDTO;
import com.example.backend.DTO.UserDTO;
import com.example.backend.entity.EmailSender;
import com.example.backend.service.EmailSenderService;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/sendEmail")
public class EmailSenderController {

	@Autowired
	private EmailSenderService emailSenderService;
	
	@GetMapping("/{email}")
	public ResponseEntity<Boolean> getByVerification(@PathVariable("email") String verification) {
		return new ResponseEntity<>(emailSenderService.getVerificationByEmail(verification), HttpStatus.OK);
	}
	
	@PostMapping("/{email}")
	public ResponseEntity<?> sendEmail(@PathVariable("email") String email) {
		EmailSenderDTO emailSenderDTO = this.emailSenderService.create(email);
		return new ResponseEntity<>(emailSenderDTO, HttpStatus.CREATED);
	}
}
