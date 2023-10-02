import express from "express";
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.json({ message: "Ok" });
});

app.get("/api/notes", async (req, res) => {
  res.json({ message: "success!" });
});

app.listen(port, () => {
  console.log(`⚡️⚡️⚡️[server]: Server is running at http://localhost:${port}`);
});
