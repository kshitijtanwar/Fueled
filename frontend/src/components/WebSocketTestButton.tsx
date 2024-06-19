import React, { useEffect, useRef, useState } from 'react';

const WebSocketTestButton: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  const connectWebSocket = () => {
    socketRef.current = new WebSocket('ws://localhost:8000/ws/chat/Party/');

    socketRef.current.onopen = function () {
      alert("[open] Connection established");
    };

    socketRef.current.onmessage = function (event) {
      setMessages(prevMessages => [...prevMessages, event.data]);
    };

    socketRef.current.onclose = function (event) {
      if (event.wasClean) {
        alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
      } else {
        alert('[close] Connection died');
      }
    };

    socketRef.current.onerror = function (error) {
      alert(`[error] ${error}`);
    };
  };

  const sendMessage = () => {
    if (socketRef.current) {
      socketRef.current.send(message);
    }
  };

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  return (
    <div>
      <button onClick={connectWebSocket}>Connect</button>
      <input value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default WebSocketTestButton;