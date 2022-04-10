-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Word" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "color" TEXT DEFAULT 'black',
    "text" TEXT,
    "lineID" INTEGER NOT NULL,
    "lineNumber" INTEGER,
    "audioUrl" TEXT,
    "chapterCode" TEXT,
    "isNewChapter" BOOLEAN,
    CONSTRAINT "Word_lineID_fkey" FOREIGN KEY ("lineID") REFERENCES "Line" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Word" ("audioUrl", "chapterCode", "color", "id", "isNewChapter", "lineID", "lineNumber", "text") SELECT "audioUrl", "chapterCode", "color", "id", "isNewChapter", "lineID", "lineNumber", "text" FROM "Word";
DROP TABLE "Word";
ALTER TABLE "new_Word" RENAME TO "Word";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
