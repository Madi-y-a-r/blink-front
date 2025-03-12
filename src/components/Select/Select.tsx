import * as React from "react";
import * as Select  from "@radix-ui/react-select";
import classnames from "classnames";
import {
	CheckIcon,
	TriangleDownIcon,
	TriangleUpIcon,
} from "@radix-ui/react-icons";
import styles from "./Select.module.scss";

const SelectDemo = () => (
	<Select.Root>
		<Select.Trigger className={styles.Trigger} aria-label="Food">
			<Select.Value placeholder="Project" />
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
		
                    <SelectItem value="Project 1">Project 1</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>

				</Select.Viewport>
				<Select.ScrollDownButton className={styles.ScrollButton}>
					<TriangleDownIcon />
				</Select.ScrollDownButton>
			</Select.Content>
		</Select.Portal>
	</Select.Root>
);

const SelectItem = React.forwardRef<
	HTMLDivElement, // Тип элемента
	React.ComponentPropsWithoutRef<typeof Select.Item> // Типизация пропсов
>(({ children, className, ...props }, forwardedRef) => {
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
});

export default SelectDemo;
