/*
  Warnings:

  - You are about to drop the column `lineNumber` on the `Line` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Line" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pageID" INTEGER NOT NULL,
    CONSTRAINT "Line_pageID_fkey" FOREIGN KEY ("pageID") REFERENCES "Page" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Line" ("id", "pageID") SELECT "id", "pageID" FROM "Line";
DROP TABLE "Line";
ALTER TABLE "new_Line" RENAME TO "Line";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
