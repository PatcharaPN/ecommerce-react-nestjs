import React, { useEffect, useState } from "react";
import "./ChatPage.css";
import { Icon } from "@iconify/react";
import { useParams } from "react-router-dom";
import { Message, User } from "../../types/types";
import { io, Socket } from "socket.io-client";
import axios from "axios";

const ChatPage = () => {
  const { userId, storeId } = useParams<{ storeId: string; userId: string }>();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [storeName, setStoreName] = useState<string>("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [chatUsers, setChatUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchStoreDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/stores/${storeId}`
        );
        setStoreName(response.data.name);
        console.log("Store Name:", response.data.name);
      } catch (error) {
        console.error("Failed to fetch store details", error);
      }
    };

    const fetchChatHistory = async () => {
      try {
        const response = await axios.get<Message[]>(
          `http://localhost:3000/chat/${storeId}/${userId}/messages`
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Failed to fetch chat history", error);
      }
    };
    const fetchChatUsers = async () => {
      try {
        const response = await axios.get<User[]>(
          `http://localhost:3000/chat/users/${userId}`
        );
        console.log("Chat Users:", response.data);
        setChatUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch chat users", error);
      }
    };

    fetchStoreDetails();
    fetchChatHistory();
    fetchChatUsers();
  }, [storeId, userId]);

  useEffect(() => {
    if (!storeName) return;

    const newSocket = io("http://localhost:3000", {
      query: { storeId, userId, storeName },
    });

    newSocket.on("message", (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.off("message");
      newSocket.disconnect();
    };
  }, [storeId, userId, storeName]);

  const sendMessage = () => {
    if (socket && message.trim()) {
      socket.emit("message", {
        sender: userId,
        store: storeId,
        recipient: storeId,
        content: message,
      });
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="user-list">
        <div className="search-chat">
          <input
            className="chat-search"
            type="text"
            placeholder="Search user or store..."
          />
          <div className="search-button">
            <Icon icon="mingcute:search-line" />
          </div>
        </div>
        <div className="user-list-chat">
          {chatUsers.length === 0 ? (
            <p>No chat users found</p>
          ) : (
            chatUsers.map((user) => (
              <div key={user._id} className="chat-user">
                <img src={user.userImage} alt={user.username} />
                <p>{user.username}</p>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="chat-session">
        <div className="chat-wrapper">
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className="sender">
                <p>You</p>
                <p className="message">{msg.content}</p>
                <p id="date-msg">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="chat-header">
          <div className="chat-profile-pic"></div>
          <div className="chat-name">
            <p id="chat-name">{storeName}</p>
            <p id="online">2hr ago</p>
          </div>
        </div>
        <input
          className="chat-input"
          type="text"
          placeholder="Type a message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="sent-btn-wrapper" onClick={sendMessage}>
          <Icon className="sent-btn" icon="mynaui:send" />
        </div>
        <div className="attach-btn-wrapper">
          <Icon className="attach-btn" icon="fluent:attach-12-regular" />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
