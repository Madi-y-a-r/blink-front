// components/Chat/Chat.tsx
import { useState } from 'react';
import styles from './Chat.module.scss';

interface ChatInputProps {
  onSubmit: (message: string) => void;
}

const ChatInput = ({ onSubmit }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSubmit(message);
      setMessage('');
    }
  };

  return (
    <form className={styles.chatForm} onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Как Blink может помочь вам сегодня?"
        className={styles.chatInput}
      />
      <button type="submit" className={styles.sendButton}>
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M22 2L11 13" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M22 2L15 22L11 13L2 9L22 2Z" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </form>
  );
};

export default ChatInput;