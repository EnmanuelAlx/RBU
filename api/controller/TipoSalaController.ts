import { Request, Response } from 'express';
import { getManager, InsertResult } from 'typeorm';
import { EstadoSala } from '../entities/estado_sala';
import { TipoSala, TipoSalaRelations } from '../entities/tipo_sala';

export async function getAll(req: Request, res: Response) {
  const TipoSalaRepository = getManager().getRepository(TipoSala);
  const tipoSala = await TipoSalaRepository.find({
    relations: [TipoSalaRelations.salas]
  });

  res.send(tipoSala);
}
export async function getById(req: Request, res: Response) {
  const TipoSalaRepository = getManager().getRepository(TipoSala);
  const tipoSala = await TipoSalaRepository.findOne(req.params.id, {
    relations: [TipoSalaRelations.salas]
  });

  if (!tipoSala) {
    res.status(404);
    res.end();
    return;
  }
  res.send(tipoSala);
}

export async function add(req: Request, res: Response) {
  const TipoSalaRepository = getManager().getRepository(TipoSala);
  const tipoSala: TipoSala = req.body;
  TipoSalaRepository.insert(tipoSala).then((tipoSala$: InsertResult) => {
    res.send({
      id: tipoSala$.raw.insertId
    });
  });

  if (!tipoSala) {
    res.status(404);
    res.end();
    return;
  }
}

export async function update(req: Request, res: Response) {
  const { descripcion } = req.body;
  const { id } = req.params;
  const TipoSalaRepository = getManager().getRepository(TipoSala);
  const tipoSala = await TipoSalaRepository.findOne(id);
  if (!tipoSala) {
    res.status(404);
    res.end();
    return;
  }
  if (descripcion) {
    tipoSala.descripcion = descripcion;
  }
  TipoSalaRepository.update({ id }, tipoSala);
  res.send(tipoSala);
}

export async function deleteOne(req: Request, res: Response): Promise<EstadoSala> {
  const { id } = req.params;
  const TipoSalaRepository = getManager().getRepository(TipoSala);
  const estadoSala = await TipoSalaRepository.findOne(id);
  if (!estadoSala) {
    res.status(404);
    res.end();
    return;
  }
  TipoSalaRepository.delete({ id: estadoSala.id });
  res.send(estadoSala);
};

