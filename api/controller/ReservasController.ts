import { Request, Response } from 'express';
import { getManager, InsertResult } from 'typeorm';
import { Reservacion } from '../entities/reservacion';
import { getByCedula } from './PersonaController';


export async function getReport(req: Request, res: Response) {
  const ReservaRepository = getManager().getRepository(Reservacion);
  const reservacionesReport = await ReservaRepository.createQueryBuilder(
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
export async function getReportByDate(req: Request, res: Response) {
  let { fechaInicio, fechaFin } = req.body;
  const ReservaRepository = getManager().getRepository(Reservacion);
  const reservacionesReport = await ReservaRepository.createQueryBuilder(
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
