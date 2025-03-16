import { create } from 'zustand';
import { addWeeks, startOfMonth, eachWeekOfInterval } from 'date-fns';
import { GanttState, GanttTask } from '../types/types';
import { getTaskStatus } from '../utils/taskStatus';

const initialTasks: GanttTask[] = [
  {
    id: '1',
    title: 'Finalize campaign brief',
    start: new Date(2025, 1, 4),
    end: new Date(2025, 1, 28),
    progress: 60,
    status: 'ontrack'
  },
  {
    id: '2',
    title: 'Finalize campaign brief',
    start: new Date(2025, 2, 4),
    end: new Date(2025, 2, 8),
    progress: 60,
    status: 'ontrack'
  },
  {
    id: '3',
    title: 'Madiyar',
    start: new Date(2025, 2, 1),
    end: new Date(2025, 2, 2),
    progress: 10,
    status: 'ontrack'
  },
  {
    id: '4',
    title: 'Madiyar',
    start: new Date(2025, 2, 4),
    end: new Date(2025, 2, 20),
    progress: 20,
    status: 'ontrack',
    
  },
  {
    id: '5',
    title: 'Madiyar',
    start: new Date(2025, 2, 25),
    end: new Date(2025, 3, 10),
    progress: 5,
    status: 'ontrack',
    
  },
];


export const useGanttStore = create<GanttState>((set, get) => ({
  tasks: initialTasks.map(task => ({
    ...task,
    status: getTaskStatus({
      start: task.start,
      end: task.end,
      progress: task.progress,
      currentDate: new Date(),
      riskThresholdDays: 2
    })
  })),
  weeks: eachWeekOfInterval({
    start: startOfMonth(new Date(2025, 1)),
    end: addWeeks(startOfMonth(new Date(2025, 1)), 4)
  }),
  currentDate: new Date(),
  setCurrentDate: (date: Date) => set(() => ({ currentDate: date })),
  addTask: (task) => set(state => ({ 
    tasks: [...state.tasks, {
      ...task,
      status: getTaskStatus({
        start: task.start,
        end: task.end,
        progress: task.progress,
        currentDate: get().currentDate,
        riskThresholdDays: get().riskThresholdDays
      })
    }]
  })),
  
  riskThresholdDays: 2,
  updateTask: (id, newStart, newEnd) => 
    set(state => ({
      tasks: state.tasks.map(task => 
        task.id === id 
          ? { 
              ...task, 
              start: newStart, 
              end: newEnd,
              status: getTaskStatus({
                start: newStart,
                end: newEnd,
                progress: task.progress,
                currentDate: state.currentDate,
                riskThresholdDays: state.riskThresholdDays
              })
            } 
          : task
      )
    })),
    updateStatuses: () => {
      const { tasks, currentDate, riskThresholdDays } = get();
      
      const updatedTasks = tasks.map(task => ({
        ...task,
        status: getTaskStatus({
          start: task.start,
          end: task.end,
          progress: task.progress,
          currentDate,
          riskThresholdDays
        })
      }));
  
      set({ tasks: updatedTasks });
    },
    resizeTask: (id, newEnd) => 
      set(state => ({
        tasks: state.tasks.map(task => 
          task.id === id 
            ? { ...task, end: newEnd } 
            : task
        )
      })),
}));