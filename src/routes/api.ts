const router = require("express").Router();
import fs from "fs";
import formattedPage from "../utils/formatPage";
router.get("/hello", async (req: any, res: any) => {
  // console.log(`req is ${req.body}`);
  for (let i = 1; i < 10; i++) {
    const f = await formattedPage(i);
    let data = JSON.stringify(f);
    fs.writeFileSync("quran.json", data);
    console.log(`added page ${i} `);
  }
  res.send({ status: "200" });
});

export default router;
