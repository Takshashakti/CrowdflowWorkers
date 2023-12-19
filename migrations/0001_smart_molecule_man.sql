CREATE TABLE `Disasters` (
	`id` integer PRIMARY KEY NOT NULL,
	`avg_loc` text,
	`address` text,
	`status` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Disasters_id_unique` ON `Disasters` (`id`);