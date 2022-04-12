const { PrismaClient } = require("@prisma/client");
const file = require("../../dist/utils/formatPage");
const fs = require("fs");
let formattedPage = file.default;

(async function () {
  let i = 3;
  let limit = 604;
  const prisma = new PrismaClient();

  const dataFunc = () => {
    return new Promise((resolve) => {
      function loop() {
        setTimeout(async () => {
          const page = await formattedPage(i);
          let { meta, lines } = page;

          const pageC = await prisma.page.create({
            data: {
              pageNumber: meta.pageNumber,
              chapterCode: meta.chapterCode,
              hizbNumber: meta.hizbNumber,
              juzNumber: meta.juzNumber,
              rubNumber: meta.rubNumber,
            },
          });

          for (let l = 0; l < lines.length; l++) {
            let curLine = lines[l];
            if (curLine === []) {
              continue;
            }
            const line = await prisma.line.create({
              data: {
                pageID: pageC.id,
              },
            });
            for (let w = 0; w < curLine.length; w++) {
              let curWord = curLine[w];
              const word = await prisma.word.create({
                data: {
                  id: curWord?.id,
                  lineID: line?.id,
                  lineNumber: curWord?.line_number,
                  audioUrl: curWord?.audio_url,
                  text: curWord?.text,
                  color: "black",
                  isNewChapter: !!curWord?.isNewChapter,
                  chapterCode: curWord?.chapterCode,
                },
              });
            }
            // console.log(curLine);
          }
          let percentage = (i / 604) * 100;
          console.log(`added ${i} out of 604, ${Math.floor(percentage)}% `);
          i = i + 1;
          if (i <= limit) {
            loop();
          } else {
            resolve("re");
          }
        }, 500);
      }
      loop();
    });
  };
  let res = await dataFunc();
  // fs.writeFileSync("quran.json", data);
  console.log("finished");
})();

// let data = JSON.stringify(json);
