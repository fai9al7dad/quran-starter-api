"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var axios_1 = __importDefault(require("axios"));
var formattedPage = function (pageNumber) { return __awaiter(void 0, void 0, void 0, function () {
    var res, error_1, data, initializeLinesArray, lines, fillLines;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1["default"].get("https://api.qurancdn.com/api/qdc/verses/by_page/".concat(pageNumber, "?words=true&per_page=all&word_fields=code_v2"))];
            case 1:
                res = _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log("error from api", error_1);
                return [3 /*break*/, 3];
            case 3:
                data = res === null || res === void 0 ? void 0 : res.data;
                initializeLinesArray = function () {
                    var lines = [];
                    // initialze lines
                    var linesCount;
                    if (pageNumber < 3) {
                        linesCount = 8;
                    }
                    else {
                        linesCount = 15;
                    }
                    for (var i = 0; i < linesCount; i++) {
                        lines.push([]);
                    }
                    return lines;
                };
                lines = initializeLinesArray();
                fillLines = function () {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                    var innerCounter = 0;
                    var curLineNum = 0;
                    var aftLineNum = 0;
                    var lineChange = false;
                    // meta info
                    var meta = {
                        chapterCode: null,
                        pageNumber: pageNumber,
                        hizbNumber: data === null || data === void 0 ? void 0 : data.verses[0].hizb_number,
                        juzNumber: data === null || data === void 0 ? void 0 : data.verses[0].juz_number,
                        rubNumber: data === null || data === void 0 ? void 0 : data.verses[0].rub_el_hizb_number
                    };
                    for (var i = 0; i < ((_a = data === null || data === void 0 ? void 0 : data.verses) === null || _a === void 0 ? void 0 : _a.length); i++) {
                        var verses = data === null || data === void 0 ? void 0 : data.verses[i];
                        var verseWords = verses === null || verses === void 0 ? void 0 : verses.words;
                        var verseKey = verses === null || verses === void 0 ? void 0 : verses.verse_key.split(":");
                        var verseChapter = verseKey[0];
                        var currentVerse = verseKey[1];
                        // font surahnames required three digits zero padded
                        var chapterCode = ("00" + verseChapter).slice(-3);
                        meta.chapterCode = chapterCode;
                        if (currentVerse === "1") {
                            lines[curLineNum][0] = {
                                id: 90000 + +chapterCode,
                                line_number: curLineNum + 1,
                                chapterCode: chapterCode,
                                isNewChapter: true,
                                pageNumber: verseWords[0].v2_page
                            };
                            lines[curLineNum + 1][0] = {
                                id: 93000 + +chapterCode,
                                line_number: curLineNum + 2,
                                chapterCode: chapterCode,
                                isNewChapter: true,
                                isBismillah: true,
                                text: "بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ",
                                pageNumber: verseWords[0].v2_page
                            };
                        }
                        for (var j = 0; j < verseWords.length; j++) {
                            curLineNum = (_b = verseWords[j]) === null || _b === void 0 ? void 0 : _b.line_number;
                            if (curLineNum > 15) {
                                console.log("error at page ", pageNumber);
                            }
                            // if last word of verse this will return undefined
                            aftLineNum = (_c = verseWords[j + 1]) === null || _c === void 0 ? void 0 : _c.line_number;
                            if (aftLineNum === undefined) {
                                aftLineNum = (_e = (_d = data === null || data === void 0 ? void 0 : data.verses[i + 1]) === null || _d === void 0 ? void 0 : _d.words[0]) === null || _e === void 0 ? void 0 : _e.line_number;
                            }
                            lineChange = curLineNum !== aftLineNum;
                            var customWord = {
                                text: (_f = verseWords[j]) === null || _f === void 0 ? void 0 : _f.code_v2,
                                id: (_g = verseWords[j]) === null || _g === void 0 ? void 0 : _g.id,
                                line_number: (_h = verseWords[j]) === null || _h === void 0 ? void 0 : _h.line_number,
                                audio_url: (_j = verseWords[j]) === null || _j === void 0 ? void 0 : _j.audio_url,
                                char_type_name: (_k = verseWords[j]) === null || _k === void 0 ? void 0 : _k.char_type_name,
                                transliteration: verseWords[j].transliteration.text
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
                    var page = {};
                    // page[pageNumber] = [{ lines: lines }, { meta: meta }];
                    return { lines: lines, meta: meta };
                };
                return [2 /*return*/, fillLines()];
        }
    });
}); };
exports["default"] = formattedPage;
//# sourceMappingURL=formatPage.js.map