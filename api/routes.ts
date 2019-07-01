import PisoController from './controller/PisoController';
import OfertaAcademica from './controller/OfertaAcademicaController';
import TipoOfertaAcademica from './controller/TipoOfertaAcademicaController';

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

////////////////////////////////
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

//////////////////////////////////
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
];
