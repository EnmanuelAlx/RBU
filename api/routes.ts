import { CategoriaController } from './controller/CategoriaController';
import { EstadoSalaController } from './controller/EstadoSalaController';
import { OfertaAcademicaController } from './controller/OfertaAcademicaController';
import { PersonaController } from './controller/PersonaController';
import { PersonasReservacionController } from './controller/PersonasReservaciones';
import { PisoController } from './controller/PisoController';
import { ReservasController } from './controller/ReservasController';
import { SalasController } from './controller/SalasController';
import { SancionesController } from './controller/SancionController';
import { TipoOfertaAcademicaController } from './controller/TipoOfertaAcademicaController';
import { TipoSalasController } from './controller/TipoSalaController';


export enum Method {
  post = 'post',
  get = 'get',
  update = 'put',
  delete = 'delete'
}

export interface Route {
  action: any;
  method: Method;
  path: string;
}
/**
 * All application routes.
 */
export function getRoutes {

  const categoriaController = new CategoriaController();
  const estadoSalaController = new EstadoSalaController();
  const ofertaAcademicaController = new OfertaAcademicaController();
  const personaController = new PersonaController();
  const personasReservacionController = new PersonasReservacionController();
  const pisoController = new PisoController();
  const reservasController = new ReservasController();
  const salasController = new SalasController();
  const sancionesController = new SancionesController();
  const tipoOfertaAcademicaController = new TipoOfertaAcademicaController();
  const tipoSalasController = new TipoSalasController();

  const routes: Route[] = [];

  categoriaController.routes.forEach((route) => routes.push(route));
  estadoSalaController.routes.forEach((route) => routes.push(route));
  ofertaAcademicaController.routes.forEach((route) => routes.push(route));
  personaController.routes.forEach((route) => routes.push(route));
  personasReservacionController.routes.forEach((route) => routes.push(route));
  pisoController.routes.forEach((route) => routes.push(route));
  reservasController.routes.forEach((route) => routes.push(route));
  pisoController.routes.forEach((route) => routes.push(route));
  reservasController.routes.forEach((route) => routes.push(route));
  salasController.routes.forEach((route) => routes.push(route));
  sancionesController.routes.forEach((route) => routes.push(route));
  tipoOfertaAcademicaController.routes.forEach((route) => routes.push(route));
  tipoSalasController.routes.forEach((route) => routes.push(route));
  // routes.push(categoriaController.routes);
  return routes;
  // return [
  // /////////// Pisos //////////////////////

  // ///////////// Tipo Oferta Academica /////////////////
  // {
  //   action: tipoOfertaAcademicaController.getAll,
  //   method: Method.get,
  //   path: '/api/tipos'
  // },
  // {
  //   action: tipoOfertaAcademicaController.add,
  //   method: Method.post,
  //   path: '/api/tipo'
  // },
  // {
  //   action: tipoOfertaAcademicaController.getById,
  //   method: Method.get,
  //   path: '/api/tipo/:id'
  // },
  // {
  //   action: tipoOfertaAcademicaController.update,
  //   method: Method.update,
  //   path: '/api/tipo/:id'
  // },
  // {
  //   action: tipoOfertaAcademicaController.deleteOne,
  //   method: Method.delete,
  //   path: '/api/tipo/:id'
  // },
  // /////////// Categoria /////////////////

  // /////////// Oferta Academica //////////
  // {
  //   action: ofertaAcademicaController.getAll,
  //   method: Method.get,
  //   path: '/api/ofertasAcademicas'
  // },
  // {
  //   action: ofertaAcademicaController.add,
  //   method: Method.post,
  //   path: '/api/ofertaAcademica'
  // },
  // {
  //   action: ofertaAcademicaController.getById,
  //   method: Method.get,
  //   path: '/api/ofertaAcademica/:id'
  // },
  // {
  //   action: ofertaAcademicaController.update,
  //   method: Method.update,
  //   path: '/api/ofertaAcademica/:id'
  // },
  // {
  //   action: ofertaAcademicaController.deleteOne,
  //   method: Method.delete,
  //   path: '/api/ofertaAcademica/:id'
  // },
  // //////////// Personas//////////////////
  // {
  //   action: personaController.getAll,
  //   method: Method.get,
  //   path: '/api/personas'
  // },
  // {
  //   action: personaController.add,
  //   method: Method.post,
  //   path: '/api/persona'
  // },
  // {
  //   action: personaController.getById,
  //   method: Method.get,
  //   path: '/api/persona/:id'
  // },
  // {
  //   action: personaController.update,
  //   method: Method.update,
  //   path: '/api/persona/:id'
  // },
  // {
  //   action: personaController.deleteOne,
  //   method: Method.delete,
  //   path: '/api/persona/:id'
  // },
  // //////////// Sanciones /////////////////
  // {
  //   action: sancionesController.add,
  //   method: Method.post,
  //   path: '/api/sancionar'
  // },
  // //////////// Salas //////////////////
  // {
  //   action: salasController.getAll,
  //   method: Method.get,
  //   path: '/api/salas'
  // },
  // {
  //   action: salasController.add,
  //   method: Method.post,
  //   path: '/api/salas'
  // },
  // {
  //   action: salasController.getById,
  //   method: Method.get,
  //   path: '/api/salas/:id'
  // },
  // {
  //   action: salasController.update,
  //   method: Method.update,
  //   path: '/api/salas/:id'
  // },
  // {
  //   action: salasController.deleteOne,
  //   method: Method.delete,
  //   path: '/api/salas/:id'
  // },
  // //////////// Reportes //////////////////
  // {
  //   action: sancionesController.getReport,
  //   method: Method.get,
  //   path: '/api/reportes/sanciones'
  // },
  // {
  //   action: sancionesController.getReportByDate,
  //   method: Method.post,
  //   path: '/api/reportes/sanciones/fecha'
  // },

  // /////////// Cantidad de veces que se reserva una sala
  // {
  //   action: reservasController.getReport,
  //   method: Method.get,
  //   path: '/api/reportes/reservas'
  // },
  // {
  //   action: reservasController.getReportByDate,
  //   method: Method.post,
  //   path: '/api/reportes/reservas/fecha'
  // },

  // ///// Cantidad de persona que hay determinada sala
  // {
  //   action: salasController.getReport,
  //   method: Method.get,
  //   path: '/api/reportes/salas'
  // },
  // {
  //   action: salasController.getReportByDate,
  //   method: Method.post,
  //   path: '/api/reportes/salas/fecha'
  // }
  // ];

} 