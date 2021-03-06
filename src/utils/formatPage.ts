import axios from "axios";
const formattedPage = async (pageNumber: number) => {
  let res;
  try {
    res = await axios.get(
      `https://api.qurancdn.com/api/qdc/verses/by_page/${pageNumber}?words=true&per_page=all&word_fields=code_v2`
    );
  } catch (error) {
    console.log("error from api", error);
  }
  let data = res?.data;

  const initializeLinesArray = () => {
    let lines = [];
    // initialze lines
    let linesCount;
    if (pageNumber < 3) {
      linesCount = 8;
    } else {
      linesCount = 15;
    }
    for (let i = 0; i < linesCount; i++) {
      lines.push([]);
    }
    return lines;
  };
  let lines: any = initializeLinesArray();
  // inner counter to get word index in a line, and to re initialize it if line changed, to start from 0 at new line
  const fillLines = () => {
    let innerCounter = 0;
    let curLineNum = 0;
    let aftLineNum = 0;
    let lineChange = false;
    // meta info
    let meta: any = {
      chapterCode: null,
      pageNumber: pageNumber,
      hizbNumber: data?.verses[0].hizb_number,
      juzNumber: data?.verses[0].juz_number,
      rubNumber: data?.verses[0].rub_el_hizb_number,
    };
    for (let i = 0; i < data?.verses?.length; i++) {
      let verses = data?.verses[i];
      let verseWords = verses?.words;
      let verseKey = verses?.verse_key.split(":");
      let verseChapter = verseKey[0];
      let currentVerse = verseKey[1];
      // font surahnames required three digits zero padded
      let chapterCode = ("00" + verseChapter).slice(-3);
      meta.chapterCode = chapterCode;

      if (currentVerse === "1") {
        let lineNum = verseWords[0].line_number;

        if (lineNum !== 2 || pageNumber === 1) {
          lines[curLineNum][0] = {
            id: 90000 + +chapterCode,
            line_number: curLineNum + 1,
            chapterCode: chapterCode,
            isNewChapter: true,
          };
          lines[curLineNum + 1][0] = {
            id: 93000 + +chapterCode,
            line_number: curLineNum + 2,
            chapterCode: chapterCode,
            isNewChapter: true,
            isBismillah: true,
            text: "???",
          };
        } else {
          lines[curLineNum][0] = {
            id: 93000 + +chapterCode,
            line_number: curLineNum + 1,
            chapterCode: chapterCode,
            isNewChapter: true,
            isBismillah: true,
            text: "???",
          };
        }
      }
      // will be overwritten if last line is not empty, mainly to put surah code in last line
      if (pageNumber > 2 && curLineNum === 0) {
        lines[14][0] = {
          id: 90000 + +chapterCode + 1,
          line_number: 15,
          chapterCode: (+chapterCode + 1).toString(),
          isNewChapter: true,
        };
      }

      for (let j = 0; j < verseWords.length; j++) {
        curLineNum = verseWords[j]?.line_number;
        if (curLineNum > 15) {
          console.log("error at page ", pageNumber);
        }
        // if last word of verse this will return undefined
        aftLineNum = verseWords[j + 1]?.line_number;
        if (aftLineNum === undefined) {
          aftLineNum = data?.verses[i + 1]?.words[0]?.line_number;
        }
        lineChange = curLineNum !== aftLineNum;
        let customWord = {
          text: verseWords[j]?.code_v2.split(" ").join(""),
          id: verseWords[j]?.id,
          line_number: verseWords[j]?.line_number,
          audio_url: verseWords[j]?.audio_url,
          char_type_name: verseWords[j]?.char_type_name,
          transliteration: verseWords[j].transliteration.text,
        };

        if (!lineChange) {
          lines[curLineNum - 1][innerCounter] = customWord;

          innerCounter = innerCounter + 1;
        }
        if (lineChange) {
          lines[curLineNum - 1][innerCounter] = customWord;

          innerCounter = 0;
        }
      }
    }

    // page[pageNumber] = [{ lines: lines }, { meta: meta }];

    return { lines, meta };
  };

  return fillLines();
};

export default formattedPage;
