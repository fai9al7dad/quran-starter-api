-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `username` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `isTemp` BOOLEAN NULL DEFAULT false,
    `password` VARCHAR(191) NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Duo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reciterID` INTEGER NOT NULL,
    `correctorID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Werd` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `duoID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Highlight` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `selfUserID` INTEGER NULL,
    `werdID` INTEGER NULL,
    `type` INTEGER NOT NULL,
    `wordID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Duo` ADD CONSTRAINT `Duo_reciterID_fkey` FOREIGN KEY (`reciterID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Duo` ADD CONSTRAINT `Duo_correctorID_fkey` FOREIGN KEY (`correctorID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Werd` ADD CONSTRAINT `Werd_duoID_fkey` FOREIGN KEY (`duoID`) REFERENCES `Duo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Highlight` ADD CONSTRAINT `Highlight_selfUserID_fkey` FOREIGN KEY (`selfUserID`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Highlight` ADD CONSTRAINT `Highlight_werdID_fkey` FOREIGN KEY (`werdID`) REFERENCES `Werd`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
