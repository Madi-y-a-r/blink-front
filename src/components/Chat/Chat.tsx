import { useState, useEffect, useRef } from 'react';
import styles from './Chat.module.scss';
import { useChatStore } from '@/src/store/useChatStore';
import { Mic, Paperclip } from 'lucide-react';

interface ChatInputProps {
  onSubmit: (message: string) => void;
}

const ChatInput = ({ onSubmit }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const { isChatInputActive, setChatInputActive } = useChatStore();
  const chatFormRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSubmit(message);
      setMessage('');
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!chatFormRef.current) return;
      const chatFormRect = chatFormRef.current.getBoundingClientRect();

      const isCursorInsideInput =
        e.clientX >= chatFormRect.left &&
        e.clientX <= chatFormRect.right &&
        e.clientY >= chatFormRect.top &&
        e.clientY <= chatFormRect.bottom;

      if (isCursorInsideInput) {
        setChatInputActive(true);
        return;
      }
  
      
      const bottomThreshold = window.innerHeight * 0.8;
      const horizontalThreshold = window.innerWidth * 0.3; 

      const isCursorInCentralBottomArea =
        e.clientY > bottomThreshold && 
        e.clientX > horizontalThreshold && 
        e.clientX < window.innerWidth - horizontalThreshold; 
  
      if (isCursorInCentralBottomArea) {
        setChatInputActive(true);
      } else {
        setChatInputActive(false);
      }
    };
  
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [setChatInputActive]);

  return (
    <form
      ref={chatFormRef} 
      className={`${styles.chatForm} ${isChatInputActive ? styles.active : styles.hidden}`}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="How can Blink help you today?"
        className={styles.chatInput}
      />

      <div className={styles.actions}>
        <button type="button" className={styles.attachButton}>
          <Paperclip />
        </button>
        <button type="submit" className={styles.micButton}>
          <Mic />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;