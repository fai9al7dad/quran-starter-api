/*
  Warnings:

  - Added the required column `lineNumber` to the `Line` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Line" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pageID" INTEGER NOT NULL,
    "lineNumber" INTEGER NOT NULL,
    CONSTRAINT "Line_pageID_fkey" FOREIGN KEY ("pageID") REFERENCES "Page" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Line" ("id", "pageID") SELECT "id", "pageID" FROM "Line";
DROP TABLE "Line";
ALTER TABLE "new_Line" RENAME TO "Line";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
