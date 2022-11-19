import express from "express";
import patientsRouter from "./routes/patients";
import diagnosesRouter from "./routes/diagnoses";

const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/ping", (_req, res) => {
  console.log('pinged');
  res.status(200).send('invalid path pal');
});

app.use('/api/patients', patientsRouter);
app.use('/api/diagnosis', diagnosesRouter)

app.use((_req, res) => res.redirect('/api/ping'));

const PORT = 3001;
app.listen(PORT, () => {
  console.log("listening on port", PORT);
});