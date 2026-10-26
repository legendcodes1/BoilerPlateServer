import { Router } from 'express';

import usersController from '../controllers/users.controller';


const router = Router();


router.route("/")
  .get(usersController.list.bind(usersController))
//   .post(usersController.create.bind(usersController))
//   // .put(usersController.update.bind(usersController))
//   // .delete(usersController.delete.bind(usersController));

// // path parameters in express 5 doc
// // example router.route("/users/:_id")
// // get -> getById
// // put -> update
// // delete -> delete
// router.route("/:_id")
//   .get(usersController.getById.bind(usersController))
//   .put(usersController.update.bind(usersController))
//   .delete(usersController.delete.bind(usersController));

  

export default router;

