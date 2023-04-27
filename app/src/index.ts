import express, { Express, Request, Response } from 'express';
import { serveApiDocs } from '@sazzad/api-docs';
import path from 'path';
import cors from 'cors';

const app: Express = express();
const port = 5000;

let dir = path.join(__dirname, '../jsonDri.json');

app.use(cors());
app.get('/', (req: Request, res: Response) => {
    res.json({
        message: `Server is running on ${req.protocol}://${req.hostname}:${port}`,
    });
});

serveApiDocs(app, dir, 'production');

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
