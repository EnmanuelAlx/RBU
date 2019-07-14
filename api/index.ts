import * as bodyParser from 'body-parser';
import cors = require('cors');
import { Request, Response } from 'express';
import * as express from 'express';
import http = require('http');
import * as logger from 'morgan';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { getRoutes } from './routes';

createConnection()
  .then(async (connection) => {
    const app = express();
    app.use(express.static('public'));
    app.use(bodyParser.json());
    app.use(cors());
    // Register application routes
    getRoutes().forEach((route) => {
      app[route.method](
        route.path,
        (req: Request, res: Response, next: any) => {
          route
            .action(req, res)
            .then(() => next)
            .catch((err) => next(err));
        }
      );
    });

    // Run app

    const server = http.createServer(app);
    server.listen(8000, () => {
      console.log('escuchando en el puerto 8000');
    });
  })
  // tslint:disable-next-line:no-console
  .catch((err) => console.log(`TypeORM connection error: ${err}`));
