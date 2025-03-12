// store/useChatStore.ts
import { create } from 'zustand';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: number;
}

interface ChatState {
  messages: Message[];
  isChatActive: boolean;
  hasMicAccess: boolean;
  soundLevel: number;
  
  addMessage: (text: string, isBot: boolean) => void;
  setChatActive: (active: boolean) => void;
  setMicAccess: (hasAccess: boolean) => void;
  setSoundLevel: (level: number) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isChatActive: false,
  hasMicAccess: false,
  soundLevel: 1,
  
  addMessage: (text, isBot) => set((state) => ({
    messages: [...state.messages, {
      id: Date.now().toString(),
      text,
      isBot,
      timestamp: Date.now()
    }],
    isChatActive: true // Автоматически активируем чат при появлении сообщений
  })),
  
  setChatActive: (active) => set({ isChatActive: active }),
  
  setMicAccess: (hasAccess) => set({ hasMicAccess: hasAccess }),
  
  setSoundLevel: (level) => set({ soundLevel: level })
}));