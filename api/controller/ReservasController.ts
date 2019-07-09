import { Request, Response } from "express";
import { getManager, InsertResult } from "typeorm";
import { Reservacion } from "../entities/reservacion";

export default {
  async getReportReservas(req: Request, res: Response) {
    console.log("Hola");
    const ReservaRepository = getManager().getRepository(Reservacion);
    const reservacion = await ReservaRepository.createQueryBuilder(
      "reservacion"
    )
      .select("COUNT(reservacion.id_sala) as CantidadReservas")
      .leftJoinAndSelect("reservacion.idSala", "Sala")
      .groupBy("Sala.id")
      .getRawMany();

    console.log(reservacion);

    res.send(reservacion);
  },
  async getReportReservasByDate(req: Request, res: Response) {
    console.log("Hola");
    const ReservaRepository = getManager().getRepository(Reservacion);
    const reservacion = await ReservaRepository.createQueryBuilder(
      "reservacion"
    )
      .select("COUNT(reservacion.id_sala) as CantidadReservas")
      .where("fecha > :fechaInicio", { fechaInicio: "2019-01-13" })
      .andWhere("fecha < :fechaFin", { fechaFin: "2019-06-01" })
      .leftJoinAndSelect("reservacion.idSala", "Sala")
      .groupBy("Sala.id")
      .getRawMany();

    console.log(reservacion);

    res.send(reservacion);
  }
};
