import { Request, Response } from 'express';
import { getManager, InsertResult, Repository } from 'typeorm';
import { Sala, SalaRelations } from '../entities/sala';
import { Method, Route } from '../routes';

export class SalasController {
  public repository: Repository<Sala>;
  public routes: Route[] = [];

  constructor() {
    this.repository = getManager().getRepository(Sala);

    this.setRoutes();
  }
  public async getAll(req: Request, res: Response) {
    this.repository = getManager().getRepository(Sala);

    const salas = await this.repository.find({
      relations: [
        SalaRelations.idEstado,
        SalaRelations.idPiso,
        SalaRelations.reservacions
      ]
    });
    res.send(salas);
  }
  public async getById(req: Request, res: Response) {
    this.repository = getManager().getRepository(Sala);

    const sala = await this.repository.findOne(req.params.id, {
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
  public async getReport(req: Request, res: Response) {
    this.repository = getManager().getRepository(Sala);

    const salasReport = await this.repository.createQueryBuilder('Sala')
      .select(
        `Sala.nombre as Sala,
        COUNT(Sala.id) as CantidadPersonas,
        YEAR(Reservacion.fecha) as Year,
        MONTH(Reservacion.fecha) as Month,
        DAY(Reservacion.fecha) as Day`
      )
      .leftJoin('Sala.reservacions', 'Reservacion')
      .innerJoin('Reservacion.personasReservacions', 'Personas_reservacion')
      .groupBy('Sala.id')
      .addGroupBy('Reservacion.fecha')
      .getRawMany();

    res.send(salasReport);
  }
  public async getReportByDate(req: Request, res: Response) {
    this.repository = getManager().getRepository(Sala);

    const { fechaInicio, fechaFin } = req.body;
    const salasReport = await this.repository.createQueryBuilder('Sala')
      .select(
        `Sala.nombre as Sala,
        COUNT(Sala.id) as CantidadPersonas,
        MONTH(Reservacion.fecha) as Month,
        DAY(Reservacion.fecha) as Day`
      )
      .leftJoin('Sala.reservacions', 'Reservacion')
      .where('Reservacion.fecha >= :fechaInicio', { fechaInicio })
      .andWhere('Reservacion.fecha <= :fechaFin', { fechaFin })
      .innerJoin('Reservacion.personasReservacions', 'Personas_reservacion')
      .groupBy('Sala.id')
      .addGroupBy('Reservacion.fecha')
      .getRawMany();

    res.send(salasReport);
  }
  public async add(req: Request, res: Response) {
    this.repository = getManager().getRepository(Sala);

    const sala = req.body;
    this.repository.insert(sala).then((sala$: InsertResult) => {
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
  public async update(req: Request, res: Response) {
    this.repository = getManager().getRepository(Sala);

    const { idEstado, idPiso } = req.body;
    const { id } = req.params;
    const sala = await this.repository.findOne(id);
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
    this.repository.update({ id }, sala);
    res.send(sala);
  }
  public async deleteOne(req: Request, res: Response) {
    this.repository = getManager().getRepository(Sala);

    const { id } = req.params;
    const sala = await this.repository.findOne(id);
    if (!sala) {
      res.status(404);
      res.end();
      return;
    }
    this.repository.delete({ id: sala.id });
    res.send(sala);
  }

  private setRoutes() {
    this.routes = [{
      action: this.getAll,
      method: Method.get,
      path: '/api/salas'
    },
    {
      action: this.add,
      method: Method.post,
      path: '/api/salas'
    },
    {
      action: this.getById,
      method: Method.get,
      path: '/api/salas/:id'
    },
    {
      action: this.update,
      method: Method.update,
      path: '/api/salas/:id'
    },
    {
      action: this.deleteOne,
      method: Method.delete,
      path: '/api/salas/:id'
    },
    {
      action: this.getReport,
      method: Method.get,
      path: '/api/reportes/salas'
    },
    {
      action: this.getReportByDate,
      method: Method.post,
      path: '/api/reportes/salas/fecha'
    }];
  }
}
