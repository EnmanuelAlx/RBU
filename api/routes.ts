import UserController from "./controller/UserController";

/**
 * All application routes.
 */
export const AppRoutes = [
  {
    action: UserController.getAll,
    method: "get",
    path: "/users",
  },
  {
    action: UserController.getById,
    method: "get",
    path: "/users/:id",
  }
];
