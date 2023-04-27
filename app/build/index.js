"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_docs_1 = require("@sazzad/api-docs");
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 5000;
let dir = path_1.default.join(__dirname, '../jsonDri.json');
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.json({
        message: `Server is running on ${req.protocol}://${req.hostname}:${port}`,
    });
});
(0, api_docs_1.serveApiDocs)(app, dir, 'production');
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
