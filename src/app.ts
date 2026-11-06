import express from "express";
import cors from "cors";

import User from "./models/user.model";
import usersRoutes from "./routes/users.routes";
import morgan from "morgan";

const app = express();

// middlewares
app.use(
  cors({
    origin: "*",
    methods: ["GET", "PUT", "POST", "DELETE"],
  }),
); // CROSS ORIGIN RESOURCE SHARING
app.use(express.json()); // ENABLES body to be present in Request object
// morgan logger - stream should log to a file using winston
app.use(
  morgan(
    "dev",
    // { stream: null }
  ),
);
// static file hosting

// routes
app.get("/ping", function (req, res) {
  res.send("pong");
});

app.use("/users", usersRoutes);

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
