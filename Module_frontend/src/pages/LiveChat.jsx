import React, { useEffect, useRef, useState } from "react";
import ContactList from "../components/Chat/contactList/ContactList";
import "./css/LiveChat.scss";
import { Box, Grid, Paper, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// import { fetchUsers } from "../redux/slices/UserSlice";
import WindowChat from "../components/Chat/WindowChat/WindowChat";
import InfoPanel from "../components/Chat/InfoPanel/InfoPanel";
import Stomp from "stompjs";
import SockJS from 'sockjs-client';
import { getRoomByUser } from "../services/RoomPrivateService";
import axiosInstance from "../api";
import { fetchAllFileByRoom } from "../redux/slices/ResourceSlice";
import { fetchUserById } from "../services/userService";
// import { fetchUserById } from "../../../services/userService";



const Item = styled(Paper)(({ theme, selectedInfo }) => ({
  padding: "0px",
  textAlign: "center",
  borderRadius: "none",
  border: "none",
  height: "100%",
  transition: "transform 0.5s ease",
  transform: `translateX(${selectedInfo ? '-50%' : '0'})`,
}));

const LiveChat = () => {
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [selectedChat, setSelectedChat] = useState('');

  const [selectedInfo, setSelectedInfo] = useState(false);
  const { data, loading, searchData } = useSelector((state) => state.roomPrivate.getRoomByUser);
  const [roomId, setRoomId] = useState('');
  // const stompClientRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRoomData = async () => {
      const id = localStorage.getItem('id');
      await getRoomByUser(id, dispatch);
      // Now data should be updated with the fetched room data
      console.log(data);
    };
  
    fetchRoomData();
  }, []);
  


  // console.log(data);

  const filteredList = () => {
    if (!data) {
      return [];
    }

    let filteredData = data;

    if (searchData.length > 0) {
      filteredData = data.filter(
        (ele) =>
          ele.name.toLowerCase().includes(searchData.toLowerCase()) ||
          ele.phone.includes(searchData)
      );
    }

    return filteredData;
  };

  useEffect(() => {
    const unsubscribe = () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };

    return unsubscribe;
  }, [stompClient]);

  const getChatbyRoom = async (roomId) => {
    const response = await axiosInstance.get(`http://localhost:8081/api/v1/message/${roomId}`);
    setMessages(response.data);
  };

  const subscribe = async (room) => {
    const socket = new SockJS('http://localhost:8081/ws');
    const client = Stomp.over(socket);

    client.connect({}, () => {
      client.subscribe(`/topic/room/${room}`, (message) => {
        const receivedMessage = JSON.parse(message.body);
        setMessages((prev) => [...prev, receivedMessage]);
      });
    });
    setStompClient(client);

    return () => {
      client.disconnect();
    };
  };

  const handleChatSelect = async (room) => {
    await getChatbyRoom(room.id);
    const unsubscribe = subscribe(room.id);
    setSelectedChat(room.name.split(",")[0]);
    setRoomId(room.id);
    return () => {
      unsubscribe();
    };
  };

  const handleSelectedInfo = () => {
    setSelectedInfo(!selectedInfo);
    dispatch(fetchAllFileByRoom(roomId));
  };

  return (
    <div className="live-chat">
      <div className="live-chat-container">
        <div className="contact-list">
          <ContactList data={filteredList()} loading={loading} onSelect={handleChatSelect} />
        </div>
        <div className="window-chat">
          {selectedChat ? (
            <div className="window-chat-content">
              <WindowChat
                userId={selectedChat}
                stompClient={stompClient}
                messages={messages}
                roomId={roomId}
                onClickInfo={handleSelectedInfo}
              />
            </div>
          ):
          (<div className="window-chat-logo">
            <i style={{fontSize :"100px"}} class='bx bxl-messenger bx-tada bx-flip-horizontal' ></i>
            <p style={{fontSize :"25px", color:"#000"}}>Tin nhắn của bạn</p>
            </div>)}
        </div>
        {selectedInfo && <InfoPanel userId={selectedChat} />}
      </div>
    </div>
  );
};

//fjakjfakjf;fakj

export default LiveChat;