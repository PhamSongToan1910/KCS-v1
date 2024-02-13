package com.example.backend.serviceImpl;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.DTO.ResourcesDTO;
import com.example.backend.DTO.RoomPrivateDTO;
import com.example.backend.DTO.UserDTO;
import com.example.backend.entity.Resources;
import com.example.backend.entity.RoomDetail;
import com.example.backend.entity.RoomPrivate;
import com.example.backend.entity.User;
import com.example.backend.exception.UserException;
import com.example.backend.repository.ResourcesRepository;
import com.example.backend.repository.RoomDetailRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.ResourcesService;
import com.example.backend.service.RoomPrivateService;
import com.example.backend.repository.RoomPrivateRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private ResourcesRepository resourcesRepository;

	@Autowired
	private RoomPrivateRepository roomPrivateRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private RoomDetailRepository roomDetailRepository;

	@Override
	public List<UserDTO> getAll() {
		// TODO Auto-generated method stub
		List<User> listUser = this.userRepository.findAll();
		List<UserDTO> listUserDTO = listUser.stream().map(user -> modelMapper.map(user, UserDTO.class)).toList();
		return listUserDTO;
	}

	@Override
	public UserDTO getByID(Long id) {
		// TODO Auto-generated method stub
		Optional<User> user = this.userRepository.findById(id);
		if (user.get() != null) {
			UserDTO userDTO = this.modelMapper.map(user, UserDTO.class);
			return userDTO;
		} else {
			throw new UserException("Khong the tim thay nguoi dung");
		}
	}

	@Override
	public UserDTO create(UserDTO userDTO) {
		// TODO Auto-generated method stub
		List<User> listUsers = this.userRepository.findByEmailOrPhone(userDTO.getEmail(), userDTO.getPhone());
		if (listUsers.isEmpty()) {

			Optional<Resources> resourcesDTO = this.resourcesRepository.findById((long) 1);
			Date date = new Date();
			User user = modelMapper.map(userDTO, User.class);
			user.setPassword(this.passwordEncoder.encode(user.getPassword()));
			user.setAvt(resourcesDTO.get().getData());
			user.setCreateDate(date);
			user.setPassword(new BCryptPasswordEncoder().encode(userDTO.getPassword()));
			user.setUpdateDate(date);
			user.setIsDelete(false);
			user.setMaTK("GV" + date.getTime());
			this.userRepository.save(user);
			generateRoom(user);
			return userDTO;
		} else {
			throw new UserException("Email hoặc SĐT đã tồn tại");
		}
	}

	@Override
	public UserDTO update(Long id, UserDTO userDTO) {
		// TODO Auto-generated method stub
		Optional<User> user = this.userRepository.findById(id);
		if (user.get() != null) {
			Optional<User> userCheckEmail = this.userRepository.findByEmail(userDTO.getEmail());
			Optional<User> userCheckPhone = this.userRepository.findByPhone(userDTO.getPhone());
			if (userCheckEmail.isEmpty() && userCheckPhone.isEmpty()) {
				Date date = new Date();
				User userSaved = this.modelMapper.map(userDTO, User.class);
				userSaved.setId(id);
				userSaved.setPassword(passwordEncoder.encode(userSaved.getPassword()));
				;
				userSaved.setUpdateDate(date);
				this.userRepository.save(userSaved);
				return userDTO;
			} else if (userCheckEmail.isEmpty() && userCheckPhone.isPresent()) {
				if (userCheckPhone.get().getId() == id) {
					Date date = new Date();
					User userSaved = this.modelMapper.map(userDTO, User.class);
					userSaved.setPassword(passwordEncoder.encode(userSaved.getPassword()));
					userSaved.setId(id);
					userSaved.setUpdateDate(date);
					this.userRepository.save(userSaved);
					return userDTO;
				} else {
					throw new UserException("Số điện thoại đã tồn tại");
				}
			} else if (userCheckEmail.isPresent() && userCheckPhone.isEmpty()) {
				if (userCheckEmail.get().getId() == id) {
					Date date = new Date();
					User userSaved = this.modelMapper.map(userDTO, User.class);
					userSaved.setPassword(passwordEncoder.encode(userSaved.getPassword()));
					userSaved.setId(id);
					userSaved.setUpdateDate(date);
					this.userRepository.save(userSaved);
					return userDTO;
				} else {
					throw new UserException("Email đã tồn tại");
				}
			} else {
				if (userCheckEmail.get().getId() == id && userCheckPhone.get().getId() == id) {
					Date date = new Date();
					User userSaved = this.modelMapper.map(userDTO, User.class);
					userSaved.setPassword(passwordEncoder.encode(userSaved.getPassword()));
					userSaved.setId(id);
					userSaved.setUpdateDate(date);
					this.userRepository.save(userSaved);
					return userDTO;
				} else {
					throw new UserException("Email hoặc số điện thoại đã tồn tại");
				}
			}
		} else {
			throw new UserException("Người dùng không tồn tại");
		}
	}

	@Override
	public UserDTO delete(Long id) {
		// TODO Auto-generated method stub
		Optional<User> user = this.userRepository.findById(id);
		if (user.get() != null) {
			Date date = new Date();
			user.get().setIsDelete(true);
			user.get().setUpdateDate(date);
			userRepository.save(user.get());
			UserDTO userDTO = this.modelMapper.map(user, UserDTO.class);
			return userDTO;
		} else {
			throw new UserException("Người dùng không tồn tại");
		}
	}

	@Override
	public UserDTO getByEmail(String email) {
		// TODO Auto-generated method stub
		Optional<User> user = this.userRepository.findByEmail(email);
		if (user.get() != null) {
			UserDTO userDTO = this.modelMapper.map(user, UserDTO.class);
			return userDTO;
		} else {
			throw new UserException("Khong the tim thay nguoi dung");
		}
	}

	public void generateRoom(User user) {
		List<User> list = userRepository.findAll();
		for (User u : list) {
			if(u.getId() == user.getId()) {
				RoomPrivate room = new RoomPrivate();
				room.setIdCreator(user.getId());
				room.setCreateDate(new Date());
				room.setName(user.getId() + "," + user.getName() + "-"+ u.getId() + "," + u.getName());
//				room.setAvt(u.getAvt());
				RoomPrivate roomSaved = this.roomPrivateRepository.save(room);
				RoomDetail roomDetail = new RoomDetail();
				roomDetail.setRoomID(roomSaved.getId());
				roomDetail.setUserID(user);
				RoomDetail roomDetail_1 = new RoomDetail();
				roomDetail_1.setRoomID(roomSaved.getId());
				this.roomDetailRepository.save(roomDetail);
			}else {
				RoomPrivate room = new RoomPrivate();
				room.setIdCreator(user.getId());
				room.setCreateDate(new Date());
				room.setName(user.getId() + "," + user.getName() + "-"+ u.getId() + "," + u.getName());
//				room.setAvt(u.getAvt());
				RoomPrivate roomSaved = this.roomPrivateRepository.save(room);
				RoomDetail roomDetail = new RoomDetail();
				roomDetail.setRoomID(roomSaved.getId());
				roomDetail.setUserID(user);
				RoomDetail roomDetail_1 = new RoomDetail();
				roomDetail_1.setRoomID(roomSaved.getId());
				roomDetail_1.setUserID(u);
				this.roomDetailRepository.save(roomDetail);
				this.roomDetailRepository.save(roomDetail_1);
			}
		}
	}

	public UserDTO updateAvt(Long id) {
		Optional<Resources> resourcesDTO = this.resourcesRepository.findById((long) 1);
		Optional<User> user = this.userRepository.findById(id);
		user.get().setAvt(resourcesDTO.get().getData());
		this.userRepository.save(user.get());
		UserDTO userDTO = this.modelMapper.map(user, UserDTO.class);
		return userDTO;
	}
}
