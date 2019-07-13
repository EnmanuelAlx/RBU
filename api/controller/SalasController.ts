import { Request, Response } from "express";
import { getManager, InsertResult } from "typeorm";
import { Sala, SalaRelations } from "../entities/sala";


async function getAll(req: Request, res: Response) {
  const SalaRepository = getManager().getRepository(Sala);
  const salas = await SalaRepository.find({
    relations: [
      SalaRelations.idEstado,
      SalaRelations.idPiso,
      SalaRelations.reservacions
    ]
  });
  res.send(salas);
}
async function getById(req: Request, res: Response) {
  const SalaRepository = getManager().getRepository(Sala);
  const sala = await SalaRepository.findOne(req.params.id, {
    relations: [
      SalaRelations.idEstado,
      SalaRelations.idPiso,
      SalaRelations.reservacions
    ]
  });

  if (!sala) {
    res.status(404);
    res.end();
    return;
  }
  res.send(sala);
}
async function getReport(req: Request, res: Response) {
  const SalaRepository = getManager().getRepository(Sala);
  const salasReport = await SalaRepository.createQueryBuilder("Sala")
    .select(
      "Sala.nombre as Sala, COUNT(Sala.id) as CantidadPersonas, YEAR(Reservacion.fecha) as Year, MONTH(Reservacion.fecha) as Month, DAY(Reservacion.fecha) as Day"
    )
    .leftJoin("Sala.reservacions", "Reservacion")
    .innerJoin("Reservacion.personasReservacions", "Personas_reservacion")
    .groupBy("Sala.id")
    .addGroupBy("Reservacion.fecha")
    .getRawMany();

  res.send(salasReport);
}
async function getReportByDate(req: Request, res: Response) {
  let { fechaInicio, fechaFin } = req.body;
  const SalaRepository = getManager().getRepository(Sala);
  const salasReport = await SalaRepository.createQueryBuilder("Sala")
    .select(
      "Sala.nombre as Sala, COUNT(Sala.id) as CantidadPersonas, MONTH(Reservacion.fecha) as Month, DAY(Reservacion.fecha) as Day"
    )
    .leftJoin("Sala.reservacions", "Reservacion")
    .where("Reservacion.fecha >= :fechaInicio", { fechaInicio: fechaInicio })
    .andWhere("Reservacion.fecha <= :fechaFin", { fechaFin: fechaFin })
    .innerJoin("Reservacion.personasReservacions", "Personas_reservacion")
    .groupBy("Sala.id")
    .addGroupBy("Reservacion.fecha")
    .getRawMany();

  res.send(salasReport);
}
async function add(req: Request, res: Response) {
  const SalaRepository = getManager().getRepository(Sala);
  const sala = req.body;
  SalaRepository.insert(sala).then((sala$: InsertResult) => {
    res.send({
      id: sala$.raw.insertId
    });
  });

  if (!Sala) {
    res.status(404);
    res.end();
    return;
  }
}
async function update(req: Request, res: Response) {
  const { idEstado, idPiso } = req.body;
  const { id } = req.params;
  const SalaRepository = getManager().getRepository(Sala);
  const sala = await SalaRepository.findOne(id);
  if (!sala) {
    res.status(404);
    res.end();
    return;
  }
  if (idEstado) {
    sala.idEstado = idEstado;
  }
  if (idPiso) {
    sala.idPiso = idPiso;
  }
  SalaRepository.update({ id }, sala);
  res.send(sala);
}
async function deleteOne(req: Request, res: Response) {
  const { id } = req.params;
  const SalaRepository = getManager().getRepository(Sala);
  const sala = await SalaRepository.findOne(id);
  if (!sala) {
    res.status(404);
    res.end();
    return;
  }
  SalaRepository.delete({ id: sala.id });
  res.send(sala);
}
