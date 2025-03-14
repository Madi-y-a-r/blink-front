import * as React from "react";
import * as Select from "@radix-ui/react-select";
import classnames from "classnames";
import { CheckIcon, TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";

import styles from "./Select.module.scss";

const SelectDemo = () => (
  <Select.Root>
    <Select.Trigger className={styles.Trigger} aria-label="Projects">
      <Select.Value placeholder="Project Name" />
      <Select.Icon className={styles.Icon}>
        <TriangleDownIcon />
      </Select.Icon>
    </Select.Trigger>

    <Select.Portal>
      <Select.Content className={styles.Content}>
        <Select.ScrollUpButton className={styles.ScrollButton}>
          <TriangleUpIcon />
        </Select.ScrollUpButton>

        <Select.Viewport className={styles.Viewport}>
          <SelectItem value="project1">Project 1</SelectItem>
          <SelectItem value="project2">Project 2</SelectItem>
          <SelectItem value="project3">Project 3</SelectItem>
        </Select.Viewport>

        <Select.ScrollDownButton className={styles.ScrollButton}>
          <TriangleDownIcon />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);

type SelectItemProps = React.ComponentPropsWithoutRef<typeof Select.Item>;

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={classnames(styles.Item, className)}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className={styles.ItemIndicator}>
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

SelectItem.displayName = "SelectItem";

export default SelectDemo;
