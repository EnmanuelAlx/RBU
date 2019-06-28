import PisoController from "./controller/PisoController";

/**
 * All application routes.
 */
export const AppRoutes = [
  {
    action: PisoController.getAll,
    method: "get",
    path: "/pisos",
  },
  {
    action: PisoController.getById,
    method: "get",
    path: "/pisos/:id",
  }
];
