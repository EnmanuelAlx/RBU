import { Request, Response } from 'express';
import { getManager, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Between } from 'typeorm';
import { Sancion } from '../entities/sancion';
import { Method, Route } from '../routes';

export class SancionesController {
  public repository: Repository<Sancion>;
  public routes: Route[] = [];

  constructor() {
    this.repository = getManager().getRepository(Sancion);
    this.setRoutes();
  }
  public async getReport(req: Request, res: Response) {
    this.repository = getManager().getRepository(Sancion);
    const sancionReport = await this.repository.find({
      relations: ['idPersonaReservacion']
    });
    res.send(sancionReport);
  }
  // Get Todas las Sanciones segun un rango especifico Begin = Dia de Inicio / End Dia Fin de la Busqueda
  public async getReportByDate(req: Request, res: Response) {
    this.repository = getManager().getRepository(Sancion);
    const { fechaInicio, fechaFin } = req.body;
    const sancionReport = await this.repository.find({
      relations: ['idPersonaReservacion'],
      where: [
        { fechaInicio: MoreThanOrEqual(fechaInicio), fechaFin: LessThanOrEqual(fechaFin) }
      ],
    });

    res.send(sancionReport);
  }
  public async add(req: Request, res: Response) {
    this.repository = getManager().getRepository(Sancion);
    const sancion = req.body.sancion;
    this.repository.insert(sancion).then((sancion$) => {
      res.send({
        sancion$
      });
    });

    if (!sancion) {
      res.status(404);
      res.end();
      return;
    }
  }

  private setRoutes() {
    this.routes = [
      {
        action: this.add,
        method: Method.post,
        path: '/api/sancionar'
      },
      {
        action: this.getReport,
        method: Method.get,
        path: '/api/reportes/sanciones'
      },
      {
        action: this.getReportByDate,
        method: Method.post,
        path: '/api/reportes/sanciones/fecha'
      }];
  }
}
