import axios from "axios";
const formattedChapter = async (chapterNumber: number, page: number) => {
  let res;
  try {
    res = await axios.get(
      `https://api.quran.com/api/v4/verses/by_chapter/${chapterNumber}?words=true&word_fields=code_v2,v2_page,line_v2&page=${page}&per_page=50`
    );
  } catch (error) {
    console.log("error from api", error);
  }
  let data = res?.data;
  if (data?.verses?.length < 1) {
    return 404;
  }
  const initializeLinesArray = () => {
    let lines = [];
    // initialze lines
    for (let i = 0; i < 15; i++) {
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
        lines[curLineNum][0] = {
          id: 90000 + +chapterCode,
          line_number: curLineNum + 1,
          chapterCode: chapterCode,
          isNewChapter: true,
          pageNumber: verseWords[0].v2_page,
        };
        lines[curLineNum + 1][0] = {
          id: 93000 + +chapterCode,
          line_number: curLineNum + 2,
          chapterCode: chapterCode,
          isNewChapter: true,
          isBismillah: true,
          text: "بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ",
          pageNumber: verseWords[0].v2_page,
        };
      }

      for (let j = 0; j < verseWords.length; j++) {
        curLineNum = verseWords[j]?.line_number;
        if (curLineNum > 15) {
          console.log("error at page ", verseWords[j].id);
        }
        // if last word of verse this will return undefined
        aftLineNum = verseWords[j + 1]?.line_number;
        if (aftLineNum === undefined) {
          aftLineNum = data?.verses[i + 1]?.words[0]?.line_number;
        }
        lineChange = curLineNum !== aftLineNum;
        let customWord = {
          text: verseWords[j]?.code_v2,
          id: verseWords[j]?.id,
          pageNumber: verseWords[j].v2_page,
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
    // setMeta(meta);
    // setStateLines(lines);

    let page: any = {};
    // page[pageNumber] = [{ lines: lines }, { meta: meta }];

    return { lines, meta };
  };

  return fillLines();
};

export default formattedChapter;
