import { CategoriaController } from './controller/CategoriaController';
import * as OfertaAcademica from './controller/OfertaAcademicaController';
import * as Persona from './controller/PersonaController';
import * as PisoController from './controller/PisoController';
import * as Reserva from './controller/ReservasController';
import * as Sala from './controller/SalasController';
import * as Sancion from './controller/SancionController';
import * as TipoOfertaAcademica from './controller/TipoOfertaAcademicaController';

export enum Method {
  post = 'post',
  get = 'get',
  update = 'put',
  delete = 'delete'
}
/**
 * All application routes.
 */
export function getRoutes {

  const categoriaController = new CategoriaController();

  return [
    ///////////// Pisos //////////////////////

    // ///////////// Tipo Oferta Academica /////////////////
    // {
    //   action: TipoOfertaAcademica.getAll,
    //   method: Method.get,
    //   path: '/api/tipos'
    // },
    // {
    //   action: TipoOfertaAcademica.add,
    //   method: Method.post,
    //   path: '/api/tipo'
    // },
    // {
    //   action: TipoOfertaAcademica.getById,
    //   method: Method.get,
    //   path: '/api/tipo/:id'
    // },
    // {
    //   action: TipoOfertaAcademica.update,
    //   method: Method.update,
    //   path: '/api/tipo/:id'
    // },
    // {
    //   action: TipoOfertaAcademica.delete,
    //   method: Method.delete,
    //   path: '/api/tipo/:id'
    // },
    ///////////// Categoria /////////////////
    {
      action: categoriaController.getAll,
      method: Method.get,
      path: '/api/categorias'
    },
    {
      action: categoriaController.add,
      method: Method.post,
      path: '/api/categoria'
    },
    {
      action: categoriaController.getById,
      method: Method.get,
      path: '/api/categoria/:id'
    },
    {
      action: categoriaController.update,
      method: Method.update,
      path: '/api/categoria/:id'
    },
    {
      action: categoriaController.deleteOne,
      method: Method.delete,
      path: '/api/categoria/:id'
    },

    ///////////// Oferta Academica //////////////
    // {
    //   action: OfertaAcademica.getAll,
    //   method: Method.get,
    //   path: '/api/ofertasAcademicas'
    // },
    // {
    //   action: OfertaAcademica.add,
    //   method: Method.post,
    //   path: '/api/ofertaAcademica'
    // },
    // {
    //   action: OfertaAcademica.getById,
    //   method: Method.get,
    //   path: '/api/ofertaAcademica/:id'
    // },
    // {
    //   action: OfertaAcademica.update,
    //   method: Method.update,
    //   path: '/api/ofertaAcademica/:id'
    // },
    // {
    //   action: OfertaAcademica.delete,
    //   method: Method.delete,
    //   path: '/api/ofertaAcademica/:id'
    // },
    // //////////// Personas//////////////////
    // {
    //   action: Persona.getAll,
    //   method: Method.get,
    //   path: '/api/personas'
    // },
    // {
    //   action: Persona.add,
    //   method: Method.post,
    //   path: '/api/persona'
    // },
    // {
    //   action: Persona.getById,
    //   method: Method.get,
    //   path: '/api/persona/:id'
    // },
    // {
    //   action: Persona.update,
    //   method: Method.update,
    //   path: '/api/persona/:id'
    // },
    // {
    //   action: Persona.delete,
    //   method: Method.delete,
    //   path: '/api/persona/:id'
    // },
    // //////////// Sanciones /////////////////
    // {
    //   action: Sancion.add,
    //   method: Method.post,
    //   path: '/api/sancionar'
    // },
    // //////////// Salas //////////////////
    // {
    //   action: Sala.getAll,
    //   method: Method.get,
    //   path: '/api/salas'
    // },
    // {
    //   action: Sala.add,
    //   method: Method.post,
    //   path: '/api/salas'
    // },
    // {
    //   action: Sala.getById,
    //   method: Method.get,
    //   path: '/api/salas/:id'
    // },
    // {
    //   action: Sala.update,
    //   method: Method.update,
    //   path: '/api/salas/:id'
    // },
    // {
    //   action: Sala.delete,
    //   method: Method.delete,
    //   path: '/api/salas/:id'
    // },
    // //////////// Reportes //////////////////
    // {
    //   action: Sancion.getReport,
    //   method: Method.get,
    //   path: '/api/reportes/sanciones'
    // },
    // {
    //   action: Sancion.getReportByDate,
    //   method: Method.post,
    //   path: '/api/reportes/sanciones/fecha'
    // },

    // /////////// Cantidad de veces que se reserva una sala
    // {
    //   action: Reserva.getReport,
    //   method: Method.get,
    //   path: '/api/reportes/reservas'
    // },
    // {
    //   action: Reserva.getReportByDate,
    //   method: Method.post,
    //   path: '/api/reportes/reservas/fecha'
    // },

    // ///// Cantidad de persona que hay determinada sala
    // {
    //   action: Sala.getReport,
    //   method: Method.get,
    //   path: '/api/reportes/salas'
    // },
    // {
    //   action: Sala.getReportByDate,
    //   method: Method.post,
    //   path: '/api/reportes/salas/fecha'
    // }
  ];

} 