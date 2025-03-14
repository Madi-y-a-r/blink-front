
import { create } from 'zustand';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: number;
}

export type ToolType = 'none' | 'kanban' | 'gantt' | 'weekly' | 'daily' | 'backlog' | 'myTasks';


interface ChatState {
  messages: Message[];
  isChatActive: boolean;
  hasMicAccess: boolean;
  soundLevel: number;
  activeTool: ToolType;
  isChatInputActive: boolean;
  addMessage: (text: string, isBot: boolean) => void;
  setChatActive: (active: boolean) => void;
  setChatInputActive: (active: boolean) => void;
  setMicAccess: (hasAccess: boolean) => void;
  setSoundLevel: (level: number) => void;
  setActiveTool: (tool: ToolType) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isChatActive: false,
  hasMicAccess: false,
  soundLevel: 1,
  activeTool: 'none',
  isChatInputActive: false,
  
  addMessage: (text, isBot) => set((state) => ({
    messages: [...state.messages, {
      id: Date.now().toString(),
      text,
      isBot,
      timestamp: Date.now()
    }],
    isChatActive: true 
  })),
  
  setChatActive: (active) => set({ isChatActive: active }),
  
  setChatInputActive: (active) => set({ isChatInputActive: active }),
  
  setMicAccess: (hasAccess) => set({ hasMicAccess: hasAccess }),
  
  setSoundLevel: (level) => set({ soundLevel: level }),

  setActiveTool: (tool) => set((state) => ({
    activeTool: tool,
    isChatActive: false 
  }))
  
}));