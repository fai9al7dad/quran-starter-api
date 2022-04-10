-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Page" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pageNumber" INTEGER NOT NULL,
    "chapterCode" TEXT NOT NULL,
    "hizbNumber" INTEGER NOT NULL,
    "juzNumber" INTEGER NOT NULL,
    "rubNumber" INTEGER NOT NULL
);
INSERT INTO "new_Page" ("chapterCode", "hizbNumber", "id", "juzNumber", "pageNumber", "rubNumber") SELECT "chapterCode", "hizbNumber", "id", "juzNumber", "pageNumber", "rubNumber" FROM "Page";
DROP TABLE "Page";
ALTER TABLE "new_Page" RENAME TO "Page";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
