-- DropIndex
DROP INDEX `User_email_username_idx` ON `user`;

-- CreateIndex
CREATE FULLTEXT INDEX `User_username_idx` ON `User`(`username`);
