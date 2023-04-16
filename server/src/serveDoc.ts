import express, { Application, NextFunction, Request, Response } from 'express';
import path from 'path';
import fs from 'fs/promises';

let jsonDataDir = path.join(__dirname, '../dist/apiCollections.json');

const serveBuildFolder = async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
};

const getApiCollections = async (req: Request, res: Response) => {
    let data = await fs.readFile(jsonDataDir, { encoding: 'utf-8' });
    res.json({ data: JSON.parse(data) });
};

const addApiCollections = async (req: Request, res: Response) => {
    const { collection } = req.body;
    let collections = JSON.parse(collection);
    await fs.writeFile(jsonDataDir, JSON.stringify(collections));
    res.json({ data: collections });
};

const updateApiCollection = async (req: Request, res: Response) => {
    const { collection } = req.body;
    let collections = JSON.parse(collection);
    await fs.writeFile(jsonDataDir, JSON.stringify(collections));
    res.json({ data: collections });
};

export const serveApiDocs = (app: Application) => {
    app.use(express.static(path.join(__dirname, '../dist')));
    app.use(async (req: Request, res: Response, next: NextFunction) => {
        let dir = path.join(__dirname, '../dist/config.json');
        let setUrl = {
            baseUrl: `${req.protocol}://${req.get('host')}`,
        };
        try {
            let data = await fs.readFile(dir, { encoding: 'utf-8' });

            if (JSON.parse(data).baseUrl === '') {
                await fs.writeFile(dir, JSON.stringify(setUrl));
            }
            next();
        } catch (error) {
            console.log(error);
        }
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
