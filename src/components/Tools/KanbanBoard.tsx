
import React from 'react';
import styles from './Tools.module.scss';

const KanbanBoard = () => {
  return (
    <div className={styles.toolContainer}>
      <div className={styles.toolHeader}>
        <h2>Канбан-доска</h2>
        <p>Организуйте ваши задачи по статусам</p>
      </div>
      
      <div className={styles.kanbanBoard}>
        <div className={styles.kanbanColumn}>
          <div className={styles.columnHeader}>К выполнению</div>
          <div className={styles.kanbanCard}>
            <h3>Создать дизайн главной страницы</h3>
            <p>Приоритет: Высокий</p>
          </div>
          <div className={styles.kanbanCard}>
            <h3>Исследовать API интеграции</h3>
            <p>Приоритет: Средний</p>
          </div>
        </div>
        
        <div className={styles.kanbanColumn}>
          <div className={styles.columnHeader}>В процессе</div>
          <div className={styles.kanbanCard}>
            <h3>Разработка чат-интерфейса</h3>
            <p>Приоритет: Высокий</p>
          </div>
        </div>
        
        <div className={styles.kanbanColumn}>
          <div className={styles.columnHeader}>Готово</div>
          <div className={styles.kanbanCard}>
            <h3>Настройка проекта</h3>
            <p>Приоритет: Высокий</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;