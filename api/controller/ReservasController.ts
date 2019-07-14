import { Request, Response } from 'express';
import { getManager, InsertResult, Repository } from 'typeorm';
import { Reservacion } from '../entities/reservacion';
import { Method, Route } from '../routes';
// import { getByCedula } from './PersonaController';

export class ReservasController {
  public repository: Repository<Reservacion>;
  public routes: Route[] = [];

  constructor() {
    this.repository = getManager().getRepository(Reservacion);
    this.setRoutes();
  }
  public async getReport(req: Request, res: Response) {
    this.repository = getManager().getRepository(Reservacion);
    const reservacionesReport = await this.repository.createQueryBuilder(
      'reservacion'
    )
      .select(
        `COUNT(reservacion.id_sala) as CantidadReservas,
      YEAR(reservacion.fecha) as Year,
      MONTH(reservacion.fecha) as Month,
      DAY(reservacion.fecha) as Day`
      )
      .leftJoinAndSelect('reservacion.idSala', 'Sala')
      .groupBy('Sala.id')
      .getRawMany();

    res.send(reservacionesReport);
  }
  public async getReportByDate(req: Request, res: Response) {
    const { fechaInicio, fechaFin } = req.body;
    this.repository = getManager().getRepository(Reservacion);
    const reservacionesReport = await this.repository.createQueryBuilder(
      'reservacion'
    )
      .select(
        `YEAR(reservacion.fecha) as Year,
      MONTH(reservacion.fecha) as Month,
      DAY(reservacion.fecha) as Day,
      COUNT(reservacion.id_sala) as CantidadReservas`
      )
      .where('fecha >= :fechaInicio', { fechaInicio })
      .andWhere('fecha <= :fechaFin', { fechaFin })
      .leftJoinAndSelect('reservacion.idSala', 'Sala')
      .groupBy('Sala.id')
      .addGroupBy('(fecha)')
      .orderBy('(fecha)')
      .getRawMany();

    res.send(reservacionesReport);
  }

  private setRoutes() {
    this.routes = [
      {
        action: this.getReport,
        method: Method.get,
        path: '/api/reportes/reservas'
      },
      {
        action: this.getReportByDate,
        method: Method.post,
        path: '/api/reportes/reservas/fecha'
      },];
  }
}
