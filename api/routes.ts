import PisoController from "./controller/PisoController";
import OfertaAcademica from "./controller/OfertaAcademicaController";
import TipoOfertaAcademica from "./controller/TipoOfertaAcademicaController";
import Categoria from "./controller/CategoriaController";
import Persona from "./controller/PersonaController";
import Sancion from "./controller/SancionController";
import Sala from "./controller/SalasController";
import Reserva from "./controller/ReservasController";

export enum Method {
  post = "post",
  get = "get",
  update = "put",
  delete = "delete"
}
/**
 * All application routes.
 */
export const AppRoutes = [
  ///////////// Pisos //////////////////////

  ///////////// Tipo Oferta Academica /////////////////
  {
    action: TipoOfertaAcademica.getAll,
    method: Method.get,
    path: "/api/tipos"
  },
  {
    action: TipoOfertaAcademica.add,
    method: Method.post,
    path: "/api/tipo"
  },
  {
    action: TipoOfertaAcademica.getById,
    method: Method.get,
    path: "/api/tipo/:id"
  },
  {
    action: TipoOfertaAcademica.update,
    method: Method.update,
    path: "/api/tipo/:id"
  },
  {
    action: TipoOfertaAcademica.delete,
    method: Method.delete,
    path: "/api/tipo/:id"
  },
  ///////////// Categoria /////////////////
  {
    action: Categoria.getAll,
    method: Method.get,
    path: "/api/categorias"
  },
  {
    action: Categoria.add,
    method: Method.post,
    path: "/api/categoria"
  },
  {
    action: Categoria.getById,
    method: Method.get,
    path: "/api/categoria/:id"
  },
  {
    action: Categoria.update,
    method: Method.update,
    path: "/api/categoria/:id"
  },
  {
    action: Categoria.delete,
    method: Method.delete,
    path: "/api/categoria/:id"
  },

  ///////////// Oferta Academica //////////////
  {
    action: OfertaAcademica.getAll,
    method: Method.get,
    path: "/api/ofertasAcademicas"
  },
  {
    action: OfertaAcademica.add,
    method: Method.post,
    path: "/api/ofertaAcademica"
  },
  {
    action: OfertaAcademica.getById,
    method: Method.get,
    path: "/api/ofertaAcademica/:id"
  },
  {
    action: OfertaAcademica.update,
    method: Method.update,
    path: "/api/ofertaAcademica/:id"
  },
  {
    action: OfertaAcademica.delete,
    method: Method.delete,
    path: "/api/ofertaAcademica/:id"
  },
  ////////////Personas//////////////////
  {
    action: Persona.getAll,
    method: Method.get,
    path: "/api/personas"
  },
  {
    action: Persona.add,
    method: Method.post,
    path: "/api/persona"
  },
  {
    action: Persona.getById,
    method: Method.get,
    path: "/api/persona/:id"
  },
  {
    action: Persona.update,
    method: Method.update,
    path: "/api/persona/:id"
  },
  {
    action: Persona.delete,
    method: Method.delete,
    path: "/api/persona/:id"
  },
  //////////// Sanciones /////////////////
  {
    action: Sancion.add,
    method: Method.post,
    path: "/api/sancionar"
  },
  //////////// Salas //////////////////
  {
    action: Sala.getAll,
    method: Method.get,
    path: "/api/salas"
  },
  {
    action: Sala.add,
    method: Method.post,
    path: "/api/salas"
  },
  {
    action: Sala.getById,
    method: Method.get,
    path: "/api/salas/:id"
  },
  {
    action: Sala.update,
    method: Method.update,
    path: "/api/salas/:id"
  },
  {
    action: Sala.delete,
    method: Method.delete,
    path: "/api/salas/:id"
  },
  //////////// Reportes //////////////////
  {
    action: Sancion.getReport,
    method: Method.get,
    path: "/api/reportes/sanciones"
  },
  {
    action: Reserva.getReport,
    method: Method.get,
    path: "/api/reportes/reservas"
  },
  {
    action: Reserva.getReportByDate,
    method: Method.get,
    path: "/api/reportes/reservas/fecha"
  },
  {
    action: Sala.getReport,
    method: Method.get,
    path: "/api/reportes/salas"
  },
  {
    action: Sala.getReportByDate,
    method: Method.get,
    path: "/api/reportes/salas/fecha"
  }
];
