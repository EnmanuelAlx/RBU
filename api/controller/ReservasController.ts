import { Request, Response } from "express";
import { getManager, InsertResult } from "typeorm";
import { Reservacion } from "../entities/reservacion";

export default {
  async getReport(req: Request, res: Response) {
    const ReservaRepository = getManager().getRepository(Reservacion);
    const reservacionesReport = await ReservaRepository.createQueryBuilder(
      "Reservacion"
    )
      .select(
        "Piso.descripcion as Piso, Sala.nombre as Sala, COUNT(Reservacion.id_sala) as CantidadReservas, YEAR(Reservacion.fecha) as Year, MONTH(Reservacion.fecha) as Month, DAY(Reservacion.fecha) as Day"
      )
      .leftJoin("Reservacion.idSala", "Sala")
      .leftJoin("Sala.idPiso", "Piso")
      .groupBy("Sala.id")
      .addGroupBy("(fecha)")
      .orderBy("(fecha)")
      .getRawMany();

    res.send(reservacionesReport);
  },
  async getReportByDate(req: Request, res: Response) {
    let { fechaInicio, fechaFin } = req.body;
    const ReservaRepository = getManager().getRepository(Reservacion);
    const reservacionesReport = await ReservaRepository.createQueryBuilder(
      "Reservacion"
    )
      .select(
        "Piso.descripcion as Piso, Sala.nombre as Sala, YEAR(Reservacion.fecha) as Year, MONTH(Reservacion.fecha) as Month, DAY(Reservacion.fecha) as Day, COUNT(Reservacion.id_sala) as CantidadReservas"
      )
      .where("fecha >= :fechaInicio", { fechaInicio: fechaInicio })
      .andWhere("fecha <= :fechaFin", { fechaFin: fechaFin })
      .leftJoin("Reservacion.idSala", "Sala")
      .leftJoin("Sala.idPiso", "Piso")
      .groupBy("Sala.id")
      .addGroupBy("(fecha)")
      .orderBy("(fecha)")
      .getRawMany();

    res.send(reservacionesReport);
  }
};
