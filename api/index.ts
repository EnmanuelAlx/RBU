import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import * as express from 'express';
import * as logger from 'morgan';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { AppRoutes } from './routes';
var http = require ('http');
var cors = require('cors');

createConnection()
  .then(async (connection) => {
    var app = express();
    app.use(express.static('public'));
    app.use(bodyParser.json());
    app.use(cors());
    // Register application routes
    AppRoutes.forEach((route) => {
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

    var server = http.createServer(app);
    server.listen(8000, function(){
        console.log('escuchando en el puerto 8000');
    })
  })
  // tslint:disable-next-line:no-console
  .catch((err) => console.log(`TypeORM connection error: ${err}`));
