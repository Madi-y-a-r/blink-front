import { addDays, addWeeks, eachWeekOfInterval, endOfMonth, format, getWeek, isSameMonth, startOfMonth } from "date-fns";
import { getTaskStatus } from "./taskStatus";
// utils/utils.ts
export const calculatePosition = (date: Date, currentMonth: Date): number => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const clampDate = date < monthStart ? monthStart : date > monthEnd ? monthEnd : date;
    
    const total = monthEnd.getTime() - monthStart.getTime();
    const position = clampDate.getTime() - monthStart.getTime();
    
    return (position / total) * 100;
  };
  
  export const calculateDuration = (start: Date, end: Date, currentMonth: Date): number => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    
    const clampStart = start < monthStart ? monthStart : start;
    const clampEnd = end > monthEnd ? monthEnd : end;
    
    const duration = clampEnd.getTime() - clampStart.getTime();
    const total = monthEnd.getTime() - monthStart.getTime();
    
    return (duration / total) * 100;
  };
  export const daysInCurrentMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  export const getMonthWeeks = (date: Date, weekCount: number = 4) => {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);
    
    // Находим первый понедельник месяца
    let firstMonday = monthStart;
    while (firstMonday.getDay() !== 1) {
      firstMonday = addDays(firstMonday, 1);
    }
  
    // Генерируем заданное количество недель
    const weeks: { start: Date; end: Date }[] = [];
    for (let i = 0; i < weekCount; i++) {
      const weekStart = addWeeks(firstMonday, i);
      const weekEnd = addDays(weekStart, 6);
      
      weeks.push({
        start: weekStart,
        end: weekEnd > monthEnd ? monthEnd : weekEnd
      });
    }
  
    return weeks;
  };
  
  export const getWeekRange = (start: Date, currentMonth: Date) => {
    const monthStart = startOfMonth(currentMonth);
    const weekStart = start < monthStart ? monthStart : start;
    
    return {
      weekNumber: getWeek(weekStart, { weekStartsOn: 1 }),
      startDay: format(weekStart, 'd'),
      endDay: format(
        addDays(weekStart, 6) > endOfMonth(currentMonth) 
          ? endOfMonth(currentMonth) 
          : addDays(weekStart, 6), 
        'd'
      )
    };
  };
