import PisoController from './controller/PisoController';

/**
 * All application routes.
 */
export const AppRoutes = [
  {
    action: PisoController.getAll,
    method: 'get',
    path: '/pisos',
  },
  {
    action: PisoController.add,
    method: 'post',
    path: '/pisos',
  },
  {
    action: PisoController.getById,
    method: 'get',
    path: '/pisos/:id',
  },
  {
    action: PisoController.update,
    method: 'update',
    path: '/pisos/:id',
  },
  {
    action: PisoController.delete,
    method: 'delete',
    path: '/pisos/:id',
  }
];
