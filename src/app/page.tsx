"use client";

import { useRive } from "@rive-app/react-canvas";
import Sidebar from "../components/Sidebar/Sidebar";
import SelectDemo from "../components/Select/Select";
import ToolbarDemo from "../components/Toolbar/Toolbar";
import styles from "./page.module.scss";
import ChatInput from "../components/Chat/Chat";
import { useChatStore } from "@/src/store/useChatStore"
import ChatMessages from "../components/Chat/ChatMessages";
import { 
  KanbanBoard, 
  GanttChart, 
  WeeklyTasks, 
  DailyStandup, 
  Backlog, 
  MyTasks 
} from "../components/Tools/ToolComponents";
import { motion } from "framer-motion";
export default function Home() {
  const { 
    isChatActive, 
    hasMicAccess, 
    messages,
    activeTool,
    setMicAccess, 
    addMessage,
    setChatActive 
  } = useChatStore();
  // const animationFrameId = useRef<number>(null);
  // const mediaStreamRef = useRef<MediaStream>(null);
  // const audioContextRef = useRef<AudioContext | null>(null);
  // const analyserRef = useRef<AnalyserNode | null>(null);
  // const dataArrayRef = useRef<Uint8Array | null>(null);
  
  const { rive, RiveComponent } = useRive({
    src: "/rive/ai_voice.riv",
    stateMachines: "bumpy",
    autoplay: true,
  });

  const renderActiveTool = () => {
    switch (activeTool) {
      case 'kanban':
        return <KanbanBoard />;
      case 'gantt':
        return <GanttChart />;
      case 'weekly':
        return <WeeklyTasks />;
      case 'daily':
        return <DailyStandup />;
      case 'backlog':
        return <Backlog />;
      case 'myTasks':
        return <MyTasks />;
      default:
        return null;
    }
  };

  // useEffect(() => {
  //   let analyser: AnalyserNode | null = null;
  //   let micStream: MediaStreamAudioSourceNode | null = null;
  //   let audioCtx: AudioContext | null = null;

  //   const initAudio = async () => {
  //     try {
  //       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  //       mediaStreamRef.current = stream;

  //       audioCtx = new AudioContext();
  //       analyser = audioCtx.createAnalyser();
  //       analyser.fftSize = 256;

  //       micStream = audioCtx.createMediaStreamSource(stream);
  //       micStream.connect(analyser);

  //       const bufferLength = analyser.frequencyBinCount;
  //       const dataArray = new Uint8Array(bufferLength);

  //       const updateVolume = () => {
  //         if (!analyser) return;
    
  //         analyser.getByteFrequencyData(dataArray);
  //         const avg = dataArray.reduce((sum, val) => sum + val, 0) / bufferLength;
  //         const normalizedVolume = avg / 255;

  //       
  //         if (Math.abs(normalizedVolume - volume) > 0.05) {
  //           setVolume(normalizedVolume);
  //         }

  //         animationFrameId.current = requestAnimationFrame(updateVolume);
  //       };

  //       updateVolume();
  //       setMicAccess(true);
  //     } catch (err) {
  //       console.error("Microphone access error:", err);
  //       setMicAccess(false);
  //     }
  //   };

  //   initAudio();

  //   return () => {
  //   
  //     if (animationFrameId.current) {
  //       cancelAnimationFrame(animationFrameId.current);
  //     }
  //     if (mediaStreamRef.current) {
  //       mediaStreamRef.current.getTracks().forEach(track => track.stop());
  //     }
  //     if (audioCtx) {
  //       audioCtx.close();
  //     }
  //   };
  // }, []);
 
  // const riveScale = 1 + volume * 0.4;
  // const riveVariants = {
  //   active: { 
  //     scale: riveScale,
  //     transition: { 
  //       type: "spring", 
  //       stiffness: 300, 
  //       damping: 15,
  //       mass: 0.5 
  //     } 
  //   },
  //   idle: { 
  //     scale: 1,
  //     transition: { 
  //       duration: 0.3 
  //     } 
  //   }
  // };
  
 
  const handleMessageSubmit = (text: string) => {
    if (text.trim()) {
      addMessage(text, false);
      
      if (!isChatActive) {
        setChatActive(true);
      }
      
      setTimeout(() => {
        addMessage("Это ответ от бота на ваше сообщение: " + text, true);
      }, 1000);
    }
  };

  

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <SelectDemo />
        <ToolbarDemo />
      </div>
      <div className={styles.chat}>
        {isChatActive ? (
          <div className={styles.chatContainer}>
            <ChatMessages messages={messages} />
            <div className={styles.botAvatar}>
              {RiveComponent && <motion.div
                // animate={{ scale: 1 + volume * 0.4 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                style={{ width: 300, height: 300, margin: "0 auto" }}
              >
                <RiveComponent />
              </motion.div>}
            </div>
          </div>
        ) : activeTool !== 'none' ? (
          renderActiveTool()
        ) : (
          <div className={styles.ai}>
            {RiveComponent && (
              <>
                <motion.div
                  key={hasMicAccess ? 'active' : 'idle'}
                  // variants={riveVariants}
                  animate={hasMicAccess ? 'active' : 'idle'}
                  style={{ 
                    width: 300, 
                    height: 300,
                    transformOrigin: 'center center'
                  }}
                >
                  <RiveComponent />
                </motion.div>
                {!hasMicAccess && (
                  <div className={styles.micAccessPrompt}>
                    <button onClick={() => navigator.mediaDevices.getUserMedia({ audio: true })
                      .then(() => setMicAccess(true))
                      .catch(err => console.error("Доступ к микрофону запрещен:", err))
                    }>
                      Разрешить доступ к микрофону
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
        <ChatInput onSubmit={handleMessageSubmit} />
      </div>
      <Sidebar />
    </div>
  );
}