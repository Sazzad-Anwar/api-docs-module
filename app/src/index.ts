import express, { Application } from 'express';
import { Server } from 'http';
import path from 'path';
import { serveApiDocs } from '@sazzad/api-docs';

const app: Application = express();
const port: number = 5000;

let apiDocJSONDir = path.join(__dirname, '../apiDoc.json');

serveApiDocs(app, apiDocJSONDir);

let server: Server = app.listen(port, () => console.log(`The app is running on port ${port}`));
