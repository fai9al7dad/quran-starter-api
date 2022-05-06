"use strict";
exports.__esModule = true;
var router = require("express").Router();
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient({});
// router.get("/quran/pages", async (req: any, res: any) => {
//   // console.log(`req is ${req.body}`);
//   const pages = await prisma.page.findMany({});
//   res.send({ status: "200", data: pages });
// });
// router.get("/quran/pages/lines", async (req: any, res: any) => {
//   // console.log(`req is ${req.body}`);
//   const pages = await prisma.page.findMany({ include: { lines: {} } });
//   res.send({ status: "200", data: pages });
// });
// router.get("/quran/pages/lines/words", async (req: any, res: any) => {
//   // console.log(`req is ${req.body}`);
//   const pages = await prisma.page.findMany({
//     where: { pageNumber: 5 },
//     include: { lines: { include: { words: {} } } },
//   });
//   res.send({ status: "200", data: pages });
// });
// router.get("/quran/pages/:number", async (req: any, res: any) => {
//   let pn = +req.params.number;
//   const pages = await prisma.page.findMany({
//     where: { pageNumber: pn },
//     include: { lines: { include: { words: {} } } },
//   });
//   res.send({ status: "200", data: pages });
// });
exports["default"] = router;
//# sourceMappingURL=api.js.map