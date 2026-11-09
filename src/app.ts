import express from "express";
import cors from "cors";

import User from "./models/user.model";
// import usersRoutes from "./routes/users.routes";
import morgan from "morgan";
import { morganStream } from "./logs/logger";
import swaggerUi from "swagger-ui-express";
import routes from "./app.routes";

const app = express();

// middlewares
app.use(
  cors({
    origin: "*",
    methods: ["GET", "PUT", "POST", "DELETE"],
  }),
); // CROSS ORIGIN RESOURCE SHARING
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json()); // ENABLES body to be present in Request object
// morgan logger - stream should log to a file using winston
app.use(morgan("dev", { stream: morganStream }));
// static file hosting

// routes
app.use(routes);

// app.get("/create-user", async function(req, res) {
//   const user = new User({
//     email: "test@test.test",
//     username: "tester",
//     passwordHash: "SA12345LT"
//   })

//   const savedUser = await user.save()

//   res.json(savedUser)
// })

// app.get("/users", async function(req, res) {
//   const users = await User.find();
//   res.json(users)
// })

// registry
// DI CONTAINER ( dependency injection )

export default app;
