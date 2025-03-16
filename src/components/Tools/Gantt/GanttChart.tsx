// components/GanttChart.tsx
"use client";
import { useGanttStore } from '@/src/store/useGanttStore';
import { calculateDuration, calculatePosition, getMonthWeeks, getWeekRange } from "@/src/utils/utils";
import { format, startOfMonth, endOfMonth, addMonths, subMonths, addDays, isToday } from 'date-fns';
import styles from "./GanttChart.module.scss";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { GanttTask } from "@/src/types/types";
import { Task } from "./Task/Task";
export const GanttChart = () => {
  const { tasks, currentDate, setCurrentDate, updateStatuses } = useGanttStore();
  const weeks = getMonthWeeks(currentDate);
  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const [currentDateIndicator] = useState(new Date());
  const [showDays, setShowDays] = useState(false);
  const isCurrentWeek = (weekStart: Date, weekEnd: Date) => {
    return currentDateIndicator >= weekStart && currentDateIndicator <= weekEnd;
  };


  const arrangeTasks = (tasks: GanttTask[]) => {
    const sortedTasks = [...tasks].sort((a, b) => a.start.getTime() - b.start.getTime());
    const lanes: GanttTask[][] = [];

    for (const task of sortedTasks) {
      let placed = false;
      for (const lane of lanes) {
        const lastTask = lane[lane.length - 1];
        if (!lastTask || task.start >= lastTask.end) {
          lane.push(task);
          placed = true;
          break;
        }
      }
      if (!placed) {
        lanes.push([task]);
      }
    }

    return sortedTasks.map(task => ({
      ...task,
      lane: lanes.findIndex(lane => lane.includes(task))
    }));
  };

  const arrangedTasks = arrangeTasks(
    tasks.filter(task => 
      task.end >= startOfMonth(currentDate) && 
      task.start <= endOfMonth(currentDate)
    )
  );

  useEffect(() => {
    updateStatuses();
  }, []);
  return (
    <div className={styles.ganttContainer}>
      {/* Month Pagination */}
      <div className={styles.pagination}>
        <button onClick={handlePrevMonth}>
          <ChevronLeft />
        </button>
        <h2>{format(currentDate, 'MMMM yyyy')}</h2>
        <div >
          <label>
            <input
              type="checkbox"
              checked={showDays}
              onChange={() => setShowDays((prev) => !prev)}
              style={{ marginRight: '5px' }}
            />
            Показать дни
          </label>
          <button onClick={handleNextMonth}>
            <ChevronRight />
          </button>
        </div>
      </div>
      <div className={styles.timelineGrid}>
        {weeks.map((week, index) => {
          const { weekNumber, startDay, endDay } = getWeekRange(week.start, currentDate);
          return (
            <div 
              key={index}
              className={`${styles.weekColumn} ${
                isCurrentWeek(week.start, week.end) ? styles.currentWeek : ''
              }`}
            >
              <div className={styles.weekLabel}>
                W{weekNumber}
                &nbsp;
                {startDay} - {endDay}
              </div>
              <div className={styles.daysContainer}>
                {[...Array(7)].map((_, i) => {
                  const dayDate = addDays(week.start, i);
                  return (
                    <div 
                      key={dayDate.toString()}
                      className={`${styles.dayColumn} ${showDays ? styles.show : styles.hide}`}
                      data-current-day={isToday(dayDate)}
                    >
                      <div className={styles.dayHeader}>
                        {format(dayDate, 'd')}
                      </div>
                      <div className={styles.dayContent}></div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tasks */}
      <div className={styles.tasks}>
        {arrangedTasks.map(task => {
          const start = task.start < startOfMonth(currentDate) 
            ? startOfMonth(currentDate) 
            : task.start;
          
          const end = task.end > endOfMonth(currentDate)
            ? endOfMonth(currentDate)
            : task.end;

          return (
            <div 
              key={task.id}
              className={`${styles.task} ${styles[task.status]}`}
              style={{
                left: `${calculatePosition(start, currentDate)}%`,
                width: `${calculateDuration(start, end, currentDate)}%`,
                top: `${task.lane * 120}px`
              }}
            >
              <Task {...task} />
            </div>
          );
        })}
      </div>
      <div className={styles.footer}>
        <ul className={styles.statusSummary}>
          <li className={styles.onTrack}>On track: {tasks.filter(task => task.status === 'ontrack').length}</li>
          <li className={styles.atRisk}>At risk: {tasks.filter(task => task.status === 'atrisk').length}</li>
          <li className={styles.delayed}>Delayed: {tasks.filter(task => task.status === 'delayed').length}</li>
        </ul>
      </div>
    </div>
  );
};