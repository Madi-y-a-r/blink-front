
"use client";
import { format } from 'date-fns';
import styles from './Task.module.scss';
import { useState } from 'react';
import Modal from '../Modal/Modal';

interface TaskProps {
  title: string;
  progress: number;
  start: Date;
  end: Date;
  status?: 'ontrack' | 'atrisk' | 'delayed';
}

export const Task = ({
  title,
  progress,
  start,
  end,
  status = 'ontrack'
}: TaskProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
    <div className={styles.task} onClick={() => setIsOpen(true)}>
      <span className={styles.progressText}>{progress}% completed</span>
      <div className={styles.progressContainer}>
        <div 
          className={`${styles.progressBar} ${styles[status]}`}
          style={{ width: `${progress}%` }}
        >
        </div>
      </div>
      
      <div className={styles.taskInfo}>
          <span className={`${styles.taskStatus} ${styles[status]}`}>&nbsp;</span>
          <div className={styles.taskDetails}>
            <h4 className={styles.taskTitle}>{title}</h4>
            {format(start, 'MMM d')} - {format(end, 'MMM d')}
          </div>
      </div>
    </div>
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <h2 className="text-xl font-bold">{title}</h2>
      <p> {format(start, 'MMM d')} - {format(end, 'MMM d')}</p>
    </Modal>
    </div>
  );
};