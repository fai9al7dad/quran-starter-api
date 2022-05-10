const { PrismaClient } = require("@prisma/client");
const file = require("../../dist/utils/formatPage");
let formattedPage = file.default;

(async function () {
  // let limit = 604;

  return new Promise((resolve) => {
    const prisma = new PrismaClient();
    let i = 1;
    let limit = 604;
    async function loop() {
      const page = await formattedPage(i);
      let { meta, lines } = page;
      // console.log(lines);
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

        const line = await prisma.line.create({
          data: {
            // pageNumber: curLine[0].pageNumber,
            pageID: pageC.id,
          },
        });
        for (let w = 0; w < curLine.length; w++) {
          let curWord = curLine[w];
          // console.log(curWord.id);
          // console.log(i);
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
              charType: curWord?.char_type_name,
              isBismillah: curWord?.isBismillah,
              transliteration: curWord?.transliteration,
            },
          });
        }
        // console.log(curLine);
      }
      let percentage = (i / limit) * 100;
      console.log(`added ${i} out of ${limit}, ${Math.floor(percentage)}% `);
      i = i + 1;
      if (i <= limit) {
        loop();
      } else {
        resolve("re");
      }
    }
    loop();
  });
})();

// let data = JSON.stringify(json);
