import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import "./ChatPage.css";
import { Icon } from "@iconify/react";
import axios from "axios";

interface Message {
  sender: string;
  content: string;
}

const ChatPage = () => {
  const { storeId, userId } = useParams<{ storeId: string; userId: string }>();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const socket = io("http://localhost:3000", {
      query: { storeId: storeId },
    });

    socket.on("message", (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
      socket.disconnect();
    };
  }, [storeId]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/chat/${storeId}`)
      .then((res) => {
        setMessages(res.data);
      })
      .catch((error) => {
        console.error("Error fetching chat history:", error);
      });
  }, [storeId]);

  const sendMessage = () => {
    if (message.trim() === "") return;

    const socket = io("http://localhost:3000", {
      query: { storeId: storeId },
    });

    socket.emit("message", {
      sender: userId,
      store: storeId,
      content: message,
    });

    setMessage("");
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
        <div className="user-list-chat">User not found</div>
      </div>
      <div className="chat-session">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className="message">
              <p>
                <strong>{msg.sender}</strong>: {msg.content}
              </p>
            </div>
          ))}
        </div>
        <div className="message-input">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
