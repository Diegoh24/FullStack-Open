import express = require("express");
import calculateBmi from './bmi';
import calculator from './calculator';
import exerciseCalculator from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send('pong');
});

app.get("/hello", (_req, res) => {
  res.send("HELLO full stack");
});

app.get("/bmi", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {height, weight} = req.query;

  const bmi : string = calculateBmi(Number(height), Number(weight));

  interface Data {
    height: number,
    weight: number,
    bmi: string
  }

  const data : Data = {
    height: Number(height),
    weight: Number(weight),
    bmi,
  };

  if (bmi.includes('NaN')) {
    res.send({error: "malformatted parameters"});
  } else {
    res.send(data);
  }
});

app.post('/calculate', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  if ( !value1 || isNaN(Number(value1))) {
    return res.status(400).send({ error: '...'});
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculator(Number(value1), Number(value2), op);
  return res.send(result);
});

app.post("/exerciseCalculator", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {target, dailyHours} : any = req.body;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isNumber = (possible : any) : boolean => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return Number(possible.toString()) === possible;
  };

  console.log(target, isNumber(target))
  if (!target || !dailyHours) {
    return res.status(400).send({error: "parameters missing"});
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  } else if (!isNumber(target) || !dailyHours.every(isNumber)) {
    return res.status(404).send({error: "malformatted parameters"});
  } 

  interface Stats {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
  }

  const stats : Stats =  exerciseCalculator(dailyHours, target);
  return res.send(stats);
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log('server running on ', PORT);
});
