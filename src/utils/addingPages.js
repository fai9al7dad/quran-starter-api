const file = require("../../dist/utils/formatPage");
const fs = require("fs");
let formattedPage = file.default;
(async function () {
  let i = 1;
  let limit = 5;
  const dataFunc = () => {
    return new Promise((resolve) => {
      let json = [];
      function loop() {
        setTimeout(async () => {
          const f = await formattedPage(i);
          // fs.writeFile("quran.json", data);
          json.push(f);
          console.log(`added page ${i} `);
          i = i + 1;
          if (i <= limit) {
            loop();
          } else {
            resolve(json);
          }
        }, 1000);
      }
      loop();
    });
  };
  let res = await dataFunc();
  let data = JSON.stringify(res);
  fs.writeFileSync(`quran_1_100.json`, data);
  console.log("finished");
})();

// let data = JSON.stringify(json);
