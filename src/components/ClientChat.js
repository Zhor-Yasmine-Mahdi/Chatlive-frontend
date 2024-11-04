import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const ClientChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Le client rejoint sa propre salle avec son ID
    socket.emit("join", "client");

    // Écoute les messages du serveur envoyés par l'agent assigné uniquement
    const handleServerMessage = (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    socket.on("server_message", handleServerMessage);

    return () => {
      socket.off("server_message", handleServerMessage);
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const messageData = { sender: "client", content: message, id: Date.now() };
      socket.emit("client_message", messageData); // Envoie le message au serveur
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setMessage("");
    }
  };

  return (
    <div style={styles.chatContainer}>
      <h2 style={styles.header}>Client Chat</h2>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={msg.sender === "client" ? styles.clientMessage : styles.agentMessage}
          >
            {msg.sender === "client" ? "👤" : "🤖"} <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.sendButton}>Send</button>
      </div>
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
    color: "#fff",
    padding: "10px",
    margin: "8px 0",
    backgroundColor: "#4A90E2",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  agentMessage: {
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
  inputContainer: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
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

export default ClientChat;
