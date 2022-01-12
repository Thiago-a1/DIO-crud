import express from "express";
import statusRoute from "./routes/status.route";
import usersRoute from "./routes/users.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(usersRoute);
app.use(statusRoute);

app.listen(3000, () => {
  console.log('app listen on PORT:3000');
});