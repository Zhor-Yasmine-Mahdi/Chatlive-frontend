import React, { useState, useEffect } from "react";
import getAIResponse from "../services/openaiService";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const AgentChat = () => {
  const [messages, setMessages] = useState([]);
  const [aiResponse, setAIResponse] = useState("");
  const [editableResponse, setEditableResponse] = useState("");
  const [clientRoom, setClientRoom] = useState(null);
  const [notification, setNotification] = useState("");
  const [isResponseDisabled, setIsResponseDisabled] = useState(false);

  useEffect(() => {
    socket.emit("join", "agent");

    const handleServerMessage = async (data) => {
      setMessages((prevMessages) => {
        if (!prevMessages.find((msg) => msg.id === data.id)) {
          return [...prevMessages, data];
        }
        return prevMessages;
      });

      if (data.sender === "client" && data.room) {
        const response = await getAIResponse(data.content);
        setAIResponse(response);
        setEditableResponse(response);
        setClientRoom(data.room);
        setNotification("");
        setIsResponseDisabled(false);
      }
    };

    const handleResponseSent = (data) => {
      if (data.room === clientRoom) {
        setNotification("Réponse déjà envoyée par un autre agent");
        setIsResponseDisabled(true);
        setEditableResponse("");
      }
    };

    const handleClearNotification = (room) => {
      if (room === clientRoom) {
        setNotification("");
        setIsResponseDisabled(false);
      }
    };

    socket.on("server_message", handleServerMessage);
    socket.on("response_sent", handleResponseSent);
    socket.on("clear_notification", handleClearNotification);

    return () => {
      socket.off("server_message", handleServerMessage);
      socket.off("response_sent", handleResponseSent);
      socket.off("clear_notification", handleClearNotification);
    };
  }, [clientRoom]);

  const sendResponse = () => {
    if (editableResponse.trim() && clientRoom && !isResponseDisabled) {
      const messageData = { content: editableResponse, room: clientRoom };
      socket.emit("agent_message", messageData);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "agent", content: editableResponse, id: Date.now() }
      ]);
      setAIResponse("");
      setEditableResponse("");
      setNotification("");
    }
  };

  return (
    <div style={styles.chatContainer}>
      <h2 style={styles.header}>Agent Chat</h2>
      {notification && <div style={styles.notification}>{notification}</div>}
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={msg.sender === "agent" ? styles.agentMessage : styles.clientMessage}
          >
            {msg.sender === "agent" ? "🤖" : "👤"} <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <h3 style={{ textAlign: "left", marginTop: "20px", color: "#4A90E2" }}>AI Suggested Response:</h3>
      <textarea
        value={editableResponse}
        onChange={(e) => setEditableResponse(e.target.value)}
        rows="4"
        style={styles.textarea}
        disabled={isResponseDisabled}
      />
      <button onClick={sendResponse} style={styles.sendButton} disabled={isResponseDisabled}>
        Send to Client
      </button>
    </div>
  );
};

const styles = {
  chatContainer: {
    width: "80%",
    maxWidth: "600px",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    color: "#4A90E2",
    marginBottom: "15px",
    fontSize: "1.5rem",
  },
  notification: {
    padding: "10px",
    marginBottom: "10px",
    backgroundColor: "#ffcccc",
    color: "#a94442",
    borderRadius: "5px",
    textAlign: "center",
  },
  chatBox: {
    maxHeight: "400px",
    overflowY: "auto",
    padding: "10px",
    marginBottom: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  clientMessage: {
    textAlign: "left",
    color: "#333",
    padding: "10px",
    margin: "8px 0",
    backgroundColor: "#e6e6e6",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  agentMessage: {
    textAlign: "left",
    color: "#fff",
    padding: "10px",
    margin: "8px 0",
    backgroundColor: "#4A90E2",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  sendButton: {
    padding: "10px 20px",
    backgroundColor: "#4A90E2",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default AgentChat;
