"use client";

import * as Collapsible from "@radix-ui/react-collapsible";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useState } from "react";
import { Menu, LayoutGrid, Square, Calendar, Folder, FilePenLine, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Sidebar.module.scss";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen} className={styles.sidebar}>
      <Collapsible.Trigger className={styles.toggleButton}>
        {open ? <ChevronRight /> : <ChevronLeft />}
      </Collapsible.Trigger>

      <nav className={styles.nav}>
        {menuItems.map(({ icon: Icon, label }) => (
          <Tooltip.Provider key={label}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button className={styles.navItem}>
                  <Icon />
                  {open && <span>{label}</span>}
                </button>
              </Tooltip.Trigger>
              <Tooltip.Content className={styles.tooltip} side="right">
                {label}
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
        ))}
      </nav>
    </Collapsible.Root>
  );
}

const menuItems = [
  { icon: LayoutGrid, label: "Dashboard" },
  { icon: Square, label: "Projects" },
  { icon: Calendar, label: "Calendar" },
  { icon: Folder, label: "Files" },
  { icon: FilePenLine, label: "Notes" },
];
