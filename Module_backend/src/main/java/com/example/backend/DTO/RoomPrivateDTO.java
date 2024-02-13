package com.example.backend.DTO;

import java.util.Date;

import com.example.backend.entity.Student;
import com.example.backend.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomPrivateDTO {

	private Long id;
	
	private Long idCreator;
	
	private String name;
	
//	@Column(name = "avt", columnDefinition = "LONGBLOB")
	private byte[] avt;
	
	private Date createDate;

}
