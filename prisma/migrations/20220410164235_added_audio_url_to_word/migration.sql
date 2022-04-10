/*
  Warnings:

  - Added the required column `audioUrl` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Word" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "color" TEXT NOT NULL DEFAULT 'black',
    "text" TEXT NOT NULL,
    "lineNumber" INTEGER NOT NULL,
    "audioUrl" TEXT NOT NULL,
    CONSTRAINT "Word_lineNumber_fkey" FOREIGN KEY ("lineNumber") REFERENCES "Line" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Word" ("color", "id", "lineNumber", "text") SELECT "color", "id", "lineNumber", "text" FROM "Word";
DROP TABLE "Word";
ALTER TABLE "new_Word" RENAME TO "Word";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
