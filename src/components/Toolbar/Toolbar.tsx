"use client"
import * as React from "react";
import * as Toolbar from "@radix-ui/react-toolbar";
import styles from "./Toolbar.module.scss";
import Image from "next/image";
import Blink from "@/public/blink-icon2 1.png";
import { Calendar, FilePenLine, Folder, LayoutGrid, Menu, Square } from "lucide-react";
import { useChatStore, ToolType } from "@/src/store/useChatStore";
import { Icon } from "@iconify/react";
const ToolbarDemo = () => {
  const { setActiveTool, activeTool } = useChatStore();

  const handleToolSelect = (tool: ToolType) => {
    setActiveTool(activeTool === tool ? 'none' : tool);
  };

  return (
    <Toolbar.Root className={styles.Root} aria-label="Formatting options">
      <Image src={Blink} alt="Blink logo" width={30} />
      <Toolbar.Separator className={styles.Separator} />
      <Toolbar.ToggleGroup type="single" defaultValue="center" aria-label="Text alignment">
        <Toolbar.ToggleItem
          className={styles.ToggleItem}
          value="kanban"
          aria-label="Kanban board"
          data-tooltip="Kanban board"
          data-state={activeTool === 'kanban' ? 'on' : 'off'}
          onClick={() => handleToolSelect('kanban')}
        >
          <Icon icon="ph:kanban-light" fontSize={30}/>
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className={styles.ToggleItem}
          value="gantt"
          aria-label="Gantt Chart"
          data-tooltip="Gantt chart"
          data-state={activeTool === 'gantt' ? 'on' : 'off'}
          onClick={() => handleToolSelect('gantt')}
        >
          <Icon icon="lucide:chart-no-axes-gantt" fontSize={30}/>
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className={styles.ToggleItem}
          value="weekly"
          aria-label="Weekly Task"
          data-tooltip="Weekly task"
          data-state={activeTool === 'weekly' ? 'on' : 'off'}
          onClick={() => handleToolSelect('weekly')}
        >
          <Icon icon="material-symbols:view-week-outline" fontSize={30}/>
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className={styles.ToggleItem}
          value="daily"
          aria-label="Daily StandUp"
          data-tooltip="Daily standup"
          data-state={activeTool === 'daily' ? 'on' : 'off'}
          onClick={() => handleToolSelect('daily')}
        >
          <Icon icon="system-uicons:calendar-day" fontSize={30}/>
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className={styles.ToggleItem}
          value="backlog"
          aria-label="Backlog"
          data-tooltip="Backlog"
          data-state={activeTool === 'backlog' ? 'on' : 'off'}
          onClick={() => handleToolSelect('backlog')}
        >
          <Icon icon="icon-park-twotone:wallet-two" fontSize={30}/>
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className={styles.ToggleItem}
          value="myTasks"
          aria-label="My Tasks"
          data-tooltip="My tasks"
          data-state={activeTool === 'myTasks' ? 'on' : 'off'}
          onClick={() => handleToolSelect('myTasks')}
        >
          <Icon icon="mdi:clipboard-edit-outline" fontSize={30}/>
        </Toolbar.ToggleItem>
      </Toolbar.ToggleGroup>
    </Toolbar.Root>
  );
};

export default ToolbarDemo;