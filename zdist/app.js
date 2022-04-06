"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
// setting up dotenv
dotenv_1.default.config();
// setting up constants
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.send("Hello World this is endpoint /");
});
app.listen(port, () => {
    return console.log(`Server started on port ${port}`);
});
