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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveApiDocs = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const serveApiDocs = (app, jsonDirectory) => {
    let jsonDataDir = jsonDirectory;
    app.use(express_1.default.json());
    app.use(express_1.default.static(path_1.default.join(__dirname, '../dist')));
    app.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        let dir = path_1.default.join(__dirname, '../dist/config.json');
        let setUrl = {
            baseUrl: `${req.protocol}://${req.get('host')}`,
        };
        try {
            let data = yield promises_1.default.readFile(dir, { encoding: 'utf-8' });
            if (JSON.parse(data).baseUrl === '') {
                yield promises_1.default.writeFile(dir, JSON.stringify(setUrl));
            }
            next();
        }
        catch (error) {
            console.log(error);
        }
    }));
    const serveBuildFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.sendFile(path_1.default.join(__dirname, '../dist', 'index.html'));
    });
    const getApiCollections = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let data = yield promises_1.default.readFile(jsonDataDir, { encoding: 'utf-8' });
        res.json({ data: JSON.parse(data) });
    });
    const addApiCollections = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        let collections = JSON.parse((_a = req.body) === null || _a === void 0 ? void 0 : _a.collection);
        yield promises_1.default.writeFile(jsonDataDir, JSON.stringify(collections));
        res.json({ data: collections });
    });
    const updateApiCollection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let collections = JSON.parse(req.body.collection);
        yield promises_1.default.writeFile(jsonDataDir, JSON.stringify(collections));
        res.json({ data: collections });
    });
    app.get('/api-docs/api/collections', getApiCollections);
    app.post('/api-docs/api/collections', addApiCollections);
    app.put('/api-docs/api/collections', updateApiCollection);
    app.use('/docs', serveBuildFolder);
    app.use((req, res, next) => {
        res.json({
            message: 'route not found',
        });
        next();
    });
};
exports.serveApiDocs = serveApiDocs;
