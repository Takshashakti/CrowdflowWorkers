CREATE TABLE `Reports` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer,
	`description` text,
	`image_url` text,
	`type` text,
	`location` text,
	`address` text,
	`time` integer,
	`disaster_id` integer,
	FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`disaster_id`) REFERENCES `Disasters`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Users` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`token` text,
	`phnNo` text,
	`gender` text,
	`age` integer,
	`location` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Reports_id_unique` ON `Reports` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `Users_id_unique` ON `Users` (`id`);