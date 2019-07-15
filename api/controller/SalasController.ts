import { Request, Response } from "express";
import { getManager, InsertResult } from "typeorm";
import { Sala, SalaRelations } from "../entities/sala";
import { Reservacion } from "../entities/reservacion";

export default {
  async getAll(req: Request, res: Response) {
    const SalaRepository = getManager().getRepository(Sala);
    const salas = await SalaRepository.find({
      relations: [
        SalaRelations.idEstado,
        SalaRelations.idPiso,
        SalaRelations.reservacions,
        SalaRelations.idTipo,
      ],
    });
    res.send(salas);
  },
  async getById(req: Request, res: Response) {
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
  },
  async getReport(req: Request, res: Response) {
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
  },
  async getReportByDate(req: Request, res: Response) {
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
  },
  async add(req: Request, res: Response) {
    const SalaRepository = getManager().getRepository(Sala);
    const sala = req.body;
    console.log(sala);
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
  },
  async update(req: Request, res: Response) {
    const { idEstado, idTipo, capacidad, nombre } = req.body;
    const { id } = req.params;
    console.log(req.params, req.body);
    const SalaRepository = getManager().getRepository(Sala);
    const sala = await SalaRepository.findOne(id);
    if (!sala) {
      res.status(404);
      res.end();
      return;
    }
    sala.idEstado = idEstado;
    sala.idTipo = idTipo;
    sala.capacidad = capacidad;
    sala.nombre = nombre;
    SalaRepository.update({ id }, sala);
    res.send(sala);
  },
  async delete(req: Request, res: Response) {
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
  },
    async liberar(req: Request, res: Response){
        const { id, idEstado } = req.body;
        const SalaRepository = getManager().getRepository(Sala);
        const sala = await SalaRepository.findOne(id);
        if (!sala) {
            res.status(404);
            res.end();
            return;
          }
          sala.idEstado = idEstado;

          SalaRepository.update({ id }, sala);
          res.send(sala);
    },
    async getPersonas(req: Request, res: Response){
      const { idSala } = req.body;
      const SalaRepository = getManager().getRepository(Sala);
      const currentDate = new Date();
      const personas = await SalaRepository.createQueryBuilder("sala")
      .innerJoinAndSelect('sala.reservacions', "reservacion")
      .where('reservacion.fecha = :currentDate',{currentDate: `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`})
      .andWhere("reservacion.horaInicio <= :currentHour",{currentHour: `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}.${currentDate.getMilliseconds}`})
      .andWhere("reservacion.horaFin >= :currentHour",{currentHour: `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`})
      .andWhere("sala.id = :id", {id: idSala})
      .innerJoinAndSelect('reservacion.personasReservacions', "persona_reservacion")
      .innerJoinAndSelect('persona_reservacion.idPersona', "persona")
      .select("persona.nombres, persona.apellidos, persona.id")
      .getRawMany()
      // console.log(`${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`);
    
      res.send(personas);
    },
    async getSalasReservacion(req: Request, res: Response){
      const SalaRepository = getManager().getRepository(Sala);
      const salas = await SalaRepository.find({
        relations: [
          SalaRelations.idEstado,
          SalaRelations.idPiso,
          SalaRelations.reservacions,
          SalaRelations.idTipo,
        ]
      });
      const currentDate = new Date();
      const año = currentDate.getFullYear();
      let mes = currentDate.getMonth()+1;
      let dia = currentDate.getDate();
      if(mes<10){
        mes = `0${mes}`
      }
      if(dia<10){
        dia = `0${dia}`
      }
      let horaActual = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
  
      salas.forEach((element, i) => {
          if(element.reservacions.length > 0){
            element.reservacions.filter(element=>{
              if(element.fecha == `${año}-${mes}-${dia}` && element.horaInicio <= horaActual && element.horaFin>=horaActual){
                salas[i].idReservacion = element.id
              }
            })
          }
      });
      res.send(salas)
    },
    
};
