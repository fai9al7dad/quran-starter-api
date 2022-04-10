"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var api_1 = __importDefault(require("./routes/api"));
require("dotenv").config();
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
var PORT = 8000;
app.listen(PORT, function () { return console.log("ready port ".concat(PORT)); });
app.use("/api", api_1["default"]);
//# sourceMappingURL=app.js.map