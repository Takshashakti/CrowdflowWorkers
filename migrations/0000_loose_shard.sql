CREATE TABLE `Incidents` (
	`id` integer PRIMARY KEY NOT NULL,
	`city` text,
	`state` text,
	`district` text,
	`assignedTo` integer,
	`status` text,
	FOREIGN KEY (`assignedTo`) REFERENCES `Users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Reports` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer,
	`title` text,
	`description` text,
	`image_url` text,
	`type` text,
	`latitude` real,
	`longitude` real,
	`city` text,
	`state` text,
	`district` text,
	`time` integer,
	`incidents_id` integer,
	FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`incidents_id`) REFERENCES `Incidents`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Users` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`token` text,
	`phnNo` text,
	`gender` text,
	`age` integer,
	`authority` integer,
	`organisation` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Incidents_id_unique` ON `Incidents` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `Reports_id_unique` ON `Reports` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `Users_id_unique` ON `Users` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `Users_phnNo_unique` ON `Users` (`phnNo`);