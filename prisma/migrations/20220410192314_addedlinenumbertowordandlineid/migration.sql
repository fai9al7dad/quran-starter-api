/*
  Warnings:

  - Added the required column `lineID` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Word" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "color" TEXT NOT NULL DEFAULT 'black',
    "text" TEXT NOT NULL,
    "lineID" INTEGER NOT NULL,
    "lineNumber" INTEGER NOT NULL,
    "audioUrl" TEXT NOT NULL,
    CONSTRAINT "Word_lineID_fkey" FOREIGN KEY ("lineID") REFERENCES "Line" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Word" ("audioUrl", "color", "id", "lineNumber", "text") SELECT "audioUrl", "color", "id", "lineNumber", "text" FROM "Word";
DROP TABLE "Word";
ALTER TABLE "new_Word" RENAME TO "Word";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
