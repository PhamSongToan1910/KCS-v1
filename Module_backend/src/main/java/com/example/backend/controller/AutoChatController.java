package com.example.backend.controller;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.backend.DTO.AutoChatDTO;
import com.example.backend.service.AutoChatService;


@CrossOrigin

@RequestMapping("/api/v1/auto-chat")

@RestController
public class AutoChatController {

	@Autowired
	private AutoChatService autoChatService;
	
	@GetMapping("")
	public ResponseEntity<List<AutoChatDTO>> getAll() {
		List<AutoChatDTO> autoChatDTO = this.autoChatService.getAll();
		return new ResponseEntity<>(autoChatDTO, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<AutoChatDTO> getByID(@PathVariable("id") Long id) {
		AutoChatDTO autoChat = this.autoChatService.getByID(id);
		return new ResponseEntity<>(autoChat, HttpStatus.OK);
	}
	
	@PostMapping("/create")
	public ResponseEntity<AutoChatDTO> create(@RequestBody AutoChatDTO autoChatDTO) {
		return new ResponseEntity<>(this.autoChatService.create(autoChatDTO), HttpStatus.CREATED);
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<AutoChatDTO> update(@PathVariable("id") Long id, @RequestBody AutoChatDTO autoChatDTO) {
		return new ResponseEntity<>(this.autoChatService.update(id, autoChatDTO), HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<AutoChatDTO> delete(@PathVariable("id") Long id) {
		return new ResponseEntity<>(this.autoChatService.delete(id), HttpStatus.OK);
	}
}
