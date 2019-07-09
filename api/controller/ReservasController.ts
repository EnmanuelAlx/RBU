import { Request, Response } from "express";
import { getManager, InsertResult } from "typeorm";
import { Reservacion } from "../entities/reservacion";

export default {
  async getReport(req: Request, res: Response) {
    const ReservaRepository = getManager().getRepository(Reservacion);
    const reservacionesReport = await ReservaRepository.createQueryBuilder(
      "reservacion"
    )
      .select("COUNT(reservacion.id_sala) as CantidadReservas")
      .leftJoinAndSelect("reservacion.idSala", "Sala")
      .groupBy("Sala.id")
      .getRawMany();

    res.send(reservacionesReport);
  },
  async getReportByDate(req: Request, res: Response) {
    const ReservaRepository = getManager().getRepository(Reservacion);
    const reservacionesReport = await ReservaRepository.createQueryBuilder(
      "reservacion"
    )
      .select(
        "MONTH(fecha) as Mes, COUNT(reservacion.id_sala) as CantidadReservas"
      )
      .where("fecha > :fechaInicio", { fechaInicio: "2019-01-13" })
      .andWhere("fecha < :fechaFin", { fechaFin: "2019-06-01" })
      .leftJoinAndSelect("reservacion.idSala", "Sala")
      .groupBy("Sala.id")
      .addGroupBy("MONTH(fecha)")
      .orderBy("MONTH(fecha)")
      .getRawMany();

    res.send(reservacionesReport);
  }
};
