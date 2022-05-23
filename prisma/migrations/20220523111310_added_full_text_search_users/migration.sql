-- CreateIndex
CREATE FULLTEXT INDEX `User_email_username_idx` ON `User`(`email`, `username`);
