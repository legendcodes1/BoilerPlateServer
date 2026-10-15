import { Request, Response } from 'express';
 
import { User } from "../models/User"

// this controller should have all CRUD operations


class UsersController {
  model: typeof User

  constructor() {
    this.model = User
  }

  list(req: Request, res: Response) {
    // 
  }

  getById(req: Request, res: Response) {

  }

  create(req: Request, res: Response) {
    
  }

  update(req: Request, res: Response) {
    
  }

  delete(req: Request, res: Response) {
    
  }
}

const usersController = new UsersController();

export default usersController;