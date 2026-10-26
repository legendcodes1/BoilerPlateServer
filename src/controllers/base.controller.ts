import type { Model } from 'mongoose';
import type { Request, Response } from 'express';
import _ from "lodash";

import errorHandler, { ERROR_MESSAGES } from '../utils/helpers/errors.handler'
import logger from '../logs/logger';

class BaseController<T> {
  model: Model<T>;
  ERROR_MESSAGES: typeof ERROR_MESSAGES;
  errorHandler: (error: Error, req: Request, res: Response) => void
  logger: typeof logger;
  _: typeof _


  constructor(model: Model<T>) {
    this.model = model
    this.ERROR_MESSAGES = ERROR_MESSAGES;
    this.errorHandler = errorHandler;
    this.logger = logger;
    this._ = _;
  }

  async list(req: Request, res: Response) {
    try {
      // http://localhost:8000/api/v1/users?email=test@test.test
      // queries = page, limit, order
      const { page = 1, limit = 10 } = req.query;
      // page - 1, limit - 10
      const q = this._.omit(req.query, ['page', 'limit'])

      const documents = await this.model.find(q)
        .sort({ createdAt: -1 })
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit))

      if(!documents) throw new Error(this.ERROR_MESSAGES.INTERNAL_SERVER_ERROR)

      res.status(200).json({
        message: "Documents retrieved succesfully...",
        data: documents,
      })
    } catch (error) {
      this.errorHandler((error as Error), req, res)
    }
  }

  async getById() {
    try {

    } catch (error) {

    }
  }

  async create() {
    try {

    } catch (error) {

    }

  }

  async update() {
    try {

    } catch (error) {

    }
  }

  async delete() {
    try {

    } catch (error) {

    }
  }
  
}

export default BaseController