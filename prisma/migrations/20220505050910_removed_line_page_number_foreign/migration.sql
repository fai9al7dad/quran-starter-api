/*
  Warnings:

  - You are about to drop the column `pageID` on the `Line` table. All the data in the column will be lost.
  - You are about to drop the column `pageNumber` on the `Page` table. All the data in the column will be lost.
  - Added the required column `pageNumber` to the `Line` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Line" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pageNumber" INTEGER NOT NULL
);
INSERT INTO "new_Line" ("id") SELECT "id" FROM "Line";
DROP TABLE "Line";
ALTER TABLE "new_Line" RENAME TO "Line";
CREATE TABLE "new_Page" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chapterCode" TEXT NOT NULL,
    "hizbNumber" INTEGER NOT NULL,
    "juzNumber" INTEGER NOT NULL,
    "rubNumber" INTEGER NOT NULL
);
INSERT INTO "new_Page" ("chapterCode", "hizbNumber", "id", "juzNumber", "rubNumber") SELECT "chapterCode", "hizbNumber", "id", "juzNumber", "rubNumber" FROM "Page";
DROP TABLE "Page";
ALTER TABLE "new_Page" RENAME TO "Page";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
