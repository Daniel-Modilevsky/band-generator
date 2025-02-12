import express from "express";
import cors from "cors";
import bandRouter from "./routes/band.ts";
import historyRouter from "./routes/history.ts";
import dotenv from "dotenv";
import authRouter from "./routes/auth.ts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4050;

app.use(express.json());
app.use(cors());
app.use("/", bandRouter);
app.use("/", historyRouter);
app.use("/", authRouter);

app.listen(4050, "0.0.0.0", () => {
  console.log("Server running on port 4050");
});
