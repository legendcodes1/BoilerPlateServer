import express from 'express';
import cors from 'cors';


import { User } from './models/User';
import usersRoutes from './routes/users.routes';

const app = express();

// middlewares
app.use(cors({
  origin: "*",
  methods: ["GET", "PUT", "POST", "DELETE"]
})); // CROSS ORIGIN RESOURCE SHARING
app.use(express.json()); // ENABLES body to be present in Request object
// morgan logger
// static file hosting


// routes
app.get("/ping", function(req, res) {
  res.send("pong");
})

app.use("/users", usersRoutes)

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

