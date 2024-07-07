import { validatorMiddleware } from "../../middlewares/validator.middleware";
import { Router } from "express";
import authController from "../../controllers/auth/auth.controller";
import { loginSchema, signupSchema } from "./auth.validation";

export default (app: Router) => {
  app.post('/signup',
    validatorMiddleware(signupSchema),
    authController.signup
  );

  app.post('/login',
    validatorMiddleware(loginSchema),
    authController.login
  );
  return app;
}