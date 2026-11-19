import { Request, Response } from "express";

import errorHandler, { ERROR_MESSAGES } from "../utils/helpers/errors.handler";
import logger from "../logs/logger";
import registry from "../app.registry";
import broker from "../app.broker";

class AuthController {
  errorHandler: typeof errorHandler;
  ERROR_MESSAGES: typeof ERROR_MESSAGES;
  registry: typeof registry;
  logger: typeof logger;
  broker: typeof broker;

  constructor() {
    this.errorHandler = errorHandler;
    this.ERROR_MESSAGES = ERROR_MESSAGES;
    this.registry = registry;
    this.logger = logger;
    this.broker = broker;
  }

  async register(req: Request, res: Response) {
    try {
      const { email, username, password } = req.body;
      const userModel = this.registry.get("user.model");

      // const checkUser = await User.findOne({ email });
      const checkUser = await userModel.findOne({
        $or: [{ username }, { email }],
      });

      if (checkUser) throw new Error(ERROR_MESSAGES.CONFLICT);
      const user = new userModel({ email, username, password });
      const savedUser = await user.save();

      this.broker.emit("auth:user:registered", { email, username });

      res.status(201).json({
        message: "successful...",
        data: savedUser,
      });
    } catch (error) {
      this.errorHandler(error as Error, req, res);
    }
  }

  async verifyEmail(req: Request, res: Response) {
    try {
    } catch (error) {
      this.errorHandler(error as Error, req, res);
    }
  }

  async login(req: Request, res: Response) {
    try {
    } catch (error) {
      this.errorHandler(error as Error, req, res);
    }
  }

  async forgotPassword(req: Request, res: Response) {
    try {
    } catch (error) {
      this.errorHandler(error as Error, req, res);
    }
  }
}

const authController = new AuthController();

export default authController;
