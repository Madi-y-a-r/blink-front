// utils/taskStatus.ts
import { differenceInDays } from 'date-fns';

interface StatusParams {
  start: Date;
  end: Date;
  progress: number;
  currentDate?: Date;
  riskThresholdDays?: number;
}

export const getTaskStatus = ({
  start,
  end,
  progress,
  currentDate = new Date(),
  riskThresholdDays = 2
}: StatusParams): 'ontrack' | 'atrisk' | 'delayed' => {
  // Если задача еще не началась
  if (currentDate < start) return 'ontrack';
  
  // Если задача уже завершена
  if (progress >= 100) return 'ontrack';

  // Если срок выполнения прошел
  if (currentDate > end) return 'delayed';

  // Проверка на приближающийся дедлайн
  const daysRemaining = differenceInDays(end, currentDate);
  if (daysRemaining <= riskThresholdDays) return 'atrisk';

  return 'ontrack';
};