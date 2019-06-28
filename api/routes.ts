import PisoController from './controller/PisoController';

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
  }
];
