import React from "react";
import "./ChatPage.css";
import { Icon } from "@iconify/react/dist/iconify.js";

const ChatPage = () => {
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
      <div className="chat-session"></div>
    </div>
  );
};

export default ChatPage;
