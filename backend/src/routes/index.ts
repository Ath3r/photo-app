import { Router } from "express"
import auth from "./auth";
import users from "./users";
import posts from "./posts";

export default () => {
  const app = Router();
  app.use('/auth', auth(app));
  app.use('/users', users(app));
  app.use('/posts', posts(app));
  return app;
}