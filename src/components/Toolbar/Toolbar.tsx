import * as React from "react";
import * as Toolbar  from "@radix-ui/react-toolbar";
import {

	TextAlignLeftIcon,
	TextAlignCenterIcon,
	TextAlignRightIcon,
} from "@radix-ui/react-icons";
import styles from "./Toolbar.module.scss";
import Image from "next/image";
import Blink from "@/public/blink-icon2 1.png"
import { Calendar, FilePenLine, Folder, LayoutGrid, Menu, Square } from "lucide-react";
const ToolbarDemo = () => (
	<Toolbar.Root className={styles.Root} aria-label="Formatting options">
		<Image 
			src={Blink}
			alt="Blink logo"
            width={30}
		/>
		<Toolbar.Separator className={styles.Separator} />
		<Toolbar.ToggleGroup
			type="single"
			defaultValue="center"
			aria-label="Text alignment"
		>
			<Toolbar.ToggleItem
				className={styles.ToggleItem}
				value="kanban"
				aria-label="Kanban board"
			>
				<LayoutGrid />
			</Toolbar.ToggleItem>
			<Toolbar.ToggleItem
				className={styles.ToggleItem}
				value="gantt"
				aria-label="Gantt Chart"
			>
				<Menu />
			</Toolbar.ToggleItem>
			<Toolbar.ToggleItem
				className={styles.ToggleItem}
				value="weekly"
				aria-label="Weekly Task"
			>
				<Square />
			</Toolbar.ToggleItem>
			<Toolbar.ToggleItem
				className={styles.ToggleItem}
				value="dayly"
				aria-label="Dayly StandUp"
			>
				<Calendar />
			</Toolbar.ToggleItem>
			<Toolbar.ToggleItem
				className={styles.ToggleItem}
				value="backlog"
				aria-label="Backlog"
			>
				<Folder />
			</Toolbar.ToggleItem>
			<Toolbar.ToggleItem
				className={styles.ToggleItem}
				value="myTasks"
				aria-label="My Tasks"
			>
				<FilePenLine />
			</Toolbar.ToggleItem>
		</Toolbar.ToggleGroup>
	</Toolbar.Root>
);

export default ToolbarDemo;
