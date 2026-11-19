import express from "express";
import cors from "cors";

import User from "./models/user.model";
import { emailsController } from "./controllers";
// import usersRoutes from "./routes/users.routes";
import morgan from "morgan";
import { morganStream } from "./logs/logger";
// import swaggerUi from "swagger-ui-express";
import routes from "./app.routes";
import registry from "./app.registry";

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

// registry
registry.register("user.model", User);
registry.register("emails.controller", emailsController);

// routes
app.use(routes);

export default app;
