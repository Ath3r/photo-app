import usersController from "../../controllers/users/users.controller";
import { isAuthenticated } from "../../middlewares/auth.middleware";
import { Router } from "express";

export default (app: Router) => {
  // get all users
  app.get(
    '/all',
    isAuthenticated('user:readAll'),
    usersController.getAllUsers
  )
  // update user
  app.patch(
    '/update/:id',
    isAuthenticated('user:update'),
    usersController.updateUser
  )
  
  // create user
  app.post(
    '/create',
    isAuthenticated('user:create'),
    usersController.createUser
  )
  // get profile
  app.get(
    '/me',
    isAuthenticated(),
    usersController.getProfile
  )
  // delete user
  app.delete(
    '/delete/:id',
    isAuthenticated('user:delete'),
    usersController.deleteUser
  )
  // get all user permissions
  app.get(
    '/permissions',
    isAuthenticated('user:create'),
    usersController.getAllUserPermissions
  )
  return app;
}