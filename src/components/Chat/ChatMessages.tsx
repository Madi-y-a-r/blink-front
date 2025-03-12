// components/Chat/ChatMessages.tsx
import { useEffect, useRef } from 'react';
import styles from './ChatMessages.module.scss';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: number;
}

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={styles.messagesContainer}>
      {messages.map((message) => (
        <div 
          key={message.id} 
          className={`${styles.message} ${message.isBot ? styles.botMessage : styles.userMessage}`}
        >
          <div className={styles.messageContent}>
            {message.text}
          </div>
          <div className={styles.messageTime}>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;