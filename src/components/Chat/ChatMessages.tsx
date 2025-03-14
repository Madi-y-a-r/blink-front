
import { useEffect, useRef } from 'react';
import styles from './ChatMessages.module.scss';
import { useChatStore } from '@/src/store/useChatStore';

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
  const { setChatActive } = useChatStore();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleCloseChat = () => {
    setChatActive(false);
  };

  return (
    <div className={styles.messagesContainer}>
      <button className={styles.closeButton} onClick={handleCloseChat}>
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M18 6L6 18" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M6 6L18 18" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>
      
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