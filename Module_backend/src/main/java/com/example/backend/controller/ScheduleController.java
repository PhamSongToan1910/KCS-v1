package com.example.backend.controller;

import java.util.List;

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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.DTO.ScheduleDTO;
import com.example.backend.service.ScheduleService;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/schedule")
public class ScheduleController {

	@Autowired
	private ScheduleService timeLineService;
	
	@GetMapping("")
	public ResponseEntity<List<ScheduleDTO>> getAll(){
		List<ScheduleDTO> listTimeLine= this.timeLineService.getAll();
		return new ResponseEntity<>(listTimeLine, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ScheduleDTO> getByID(@PathVariable("id") Long id){
		ScheduleDTO scheduleDTO = this.timeLineService.getByID(id);
		return new ResponseEntity<>(scheduleDTO, HttpStatus.OK);
	}
	
	@PostMapping("")
	public ResponseEntity<ScheduleDTO> create(@RequestBody ScheduleDTO timeLineDTO) {
		this.timeLineService.create(timeLineDTO);
		return new ResponseEntity<>(timeLineDTO, HttpStatus.CREATED);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<ScheduleDTO> delete(@PathVariable("id") long id) {
		ScheduleDTO delTimeline = this.timeLineService.delete(id);
		return new ResponseEntity<>(delTimeline, HttpStatus.OK);
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<ScheduleDTO> update(@PathVariable("id") long id, @RequestBody ScheduleDTO timeLineDTO) {
//		System.out.println(id);
		ScheduleDTO updateTimeline = this.timeLineService.update(id, timeLineDTO);
		return new ResponseEntity<>(updateTimeline, HttpStatus.OK);
	}
}

