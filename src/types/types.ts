export interface GanttTask {
    id: string;
    title: string;
    start: Date;
    end: Date;
    progress: number;
    status: 'ontrack' | 'atrisk' | 'delayed';
    lane?: number;
    dependencies?: string[]; 
  }
    
  export interface GanttState {
    tasks: GanttTask[];
    weeks: Date[];
    currentDate: Date;
    setCurrentDate: (date: Date) => void;
    addTask: (task: GanttTask) => void;
    updateTask: (id: string, newStart: Date, newEnd: Date) => void;
    riskThresholdDays: number;
    updateStatuses: () => void;
    resizeTask: (id: string, newEnd: Date) => void;
  }