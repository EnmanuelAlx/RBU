import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import * as express from 'express';
import * as logger from 'morgan';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { AppRoutes } from './routes';

createConnection()
  .then(async (connection) => {
    const app = express();

    app.use(bodyParser.json());
    app.use(logger('dev'));

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
    app.listen(8000, () => {
      // tslint:disable-next-line:no-console
      console.log('Express application is up ansd running on port 8000');
    });
  })
  // tslint:disable-next-line:no-console
  .catch((err) => console.log(`TypeORM connection error:: ${err}`));
