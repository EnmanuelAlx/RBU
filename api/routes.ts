import PisoController from './controller/PisoController';
import OfertaAcademica from './controller/OfertaAcademicaController';
import TipoOfertaAcademica from './controller/TipoOfertaAcademicaController';
import Categoria from './controller/CategoriaController';
import Persona from './controller/PersonaController';
import Sancion from './controller/SancionController';

enum Method {
  post = 'post',
  get = 'get',
  update = 'put',
  delete = 'delete',
}
/**
 * All application routes.
 */
export const AppRoutes = [
  ///////////// Pisos //////////////////////
  {
    action: PisoController.getAll,
    method: Method.get,
    path: '/pisos',
  },
  {
    action: PisoController.add,
    method: Method.post,
    path: '/pisos',
  },
  {
    action: PisoController.getById,
    method: Method.get,
    path: '/pisos/:id',
  },
  {
    action: PisoController.update,
    method: Method.update,
    path: '/pisos/:id',
  },
  {
    action: PisoController.delete,
    method: Method.delete,
    path: '/pisos/:id',
  },

///////////// Tipo Oferta Academica /////////////////
  {
    action: TipoOfertaAcademica.getAll,
    method: Method.get,
    path: '/api/tipos',
  },
  {
    action: TipoOfertaAcademica.add,
    method: Method.post,
    path: '/api/tipo',
  },
  {
    action: TipoOfertaAcademica.getById,
    method: Method.get,
    path: '/api/tipo/:id',
  },
  {
    action: TipoOfertaAcademica.update,
    method: Method.update,
    path: '/api/tipo/:id',
  },
  {
    action: TipoOfertaAcademica.delete,
    method: Method.delete,
    path: '/api/tipo/:id',
  },
///////////// Categoria /////////////////
  {
    action: Categoria.getAll,
    method: Method.get,
    path: '/api/categorias',
  },
  {
    action: Categoria.add,
    method: Method.post,
    path: '/api/categoria',
  },
  {
    action: Categoria.getById,
    method: Method.get,
    path: '/api/categoria/:id',
  },
  {
    action: Categoria.update,
    method: Method.update,
    path: '/api/categoria/:id',
  },
  {
    action: Categoria.delete,
    method: Method.delete,
    path: '/api/categoria/:id',
  },

///////////// Oferta Academica //////////////
  {
    action: OfertaAcademica.getAll,
    method: Method.get,
    path: '/api/ofertasAcademicas',
  },
  {
    action: OfertaAcademica.add,
    method: Method.post,
    path: '/api/ofertaAcademica',
  },
  {
    action: OfertaAcademica.getById,
    method: Method.get,
    path: '/api/ofertaAcademica/:id',
  },
  {
    action: OfertaAcademica.update,
    method: Method.update,
    path: '/api/ofertaAcademica/:id',
  },
  {
    action: OfertaAcademica.delete,
    method: Method.delete,
    path: '/api/ofertaAcademica/:id',
  },
  ////////////Personas//////////////////
  {
    action: Persona.getAll,
    method: Method.get,
    path: '/api/personas',
  },
  {
    action: Persona.add,
    method: Method.post,
    path: '/api/persona',
  },
  {
    action: Persona.getById,
    method: Method.get,
    path: '/api/persona/:id',
  },
  {
    action: Persona.update,
    method: Method.update,
    path: '/api/persona/:id',
  },
  {
    action: Persona.delete,
    method: Method.delete,
    path: '/api/persona/:id',
  },
  //////////// Sanciones /////////////////
  {
    action: Sancion.add,
    method: Method.post,
    path: '/api/sancionar',
  },
];
