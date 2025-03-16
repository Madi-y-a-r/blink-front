
import React from 'react';
import KanbanBoard from './KanbanBoard';
import styles from './Tools.module.scss';
import { GanttChart } from './Gantt/GanttChart';


export const Gantt = () => {
  return (
    <div className={styles.toolContainer}>
      <GanttChart />
    </div>
  );
};


export const WeeklyTasks = () => {
  return (
    <div className={styles.toolContainer}>
      <div className={styles.toolHeader}>
        <h2>Недельные задачи</h2>
        <p>Планирование задач на неделю</p>
      </div>
      <div>
        {/* Здесь будет содержимое недельных задач */}
        <p>Планировщик недельных задач в разработке...</p>
      </div>
    </div>
  );
};


export const DailyStandup = () => {
  return (
    <div className={styles.toolContainer}>
      <div className={styles.toolHeader}>
        <h2>Ежедневный стендап</h2>
        <p>Отслеживание ежедневного прогресса</p>
      </div>
      <div>
        {/* Здесь будет содержимое ежедневных стендапов */}
        <p>Отслеживание ежедневных стендапов в разработке...</p>
      </div>
    </div>
  );
};


export const Backlog = () => {
  return (
    <div className={styles.toolContainer}>
      <div className={styles.toolHeader}>
        <h2>Бэклог</h2>
        <p>Список задач, ожидающих выполнения</p>
      </div>
      <div>
        {/* Здесь будет содержимое бэклога */}
        <p>Бэклог проекта в разработке...</p>
      </div>
    </div>
  );
};


export const MyTasks = () => {
  return (
    <div className={styles.toolContainer}>
      <div className={styles.toolHeader}>
        <h2>Мои задачи</h2>
        <p>Персональные задачи и отслеживание</p>
      </div>
      <div>
        {/* Здесь будет содержимое моих задач */}
        <p>Список моих задач в разработке...</p>
      </div>
    </div>
  );
};

export { KanbanBoard };