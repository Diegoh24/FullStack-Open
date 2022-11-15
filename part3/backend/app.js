const { response } = require('express');
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

const getRandom = () => Math.floor(Math.random() * 1000000);

app.get("/api/persons", (req, res) => {
  res.json(persons);
})

app.get("/api/persons/:id", (req, res) => {
  let person = persons.find(person => person.id = +req.params.id);
  res.json(person);
})

app.get("/info", (req, res) => {
  let entries = persons.length;
  let time = new Date();

  let html = `
  <p>The phonebook has ${entries} people</p>
  <p>${time.toString()}</p>
  `
  return res.send(html);
})

app.post("/api/persons", (req, res) => {
  let {name, number} = req.body;

  if (name.trim().length < 1 || number.trim().length < 1) {
    res.sendStatus(422);
  } else if (persons.some(person => person.name === name)) {
    res.sendStatus(422);
  } else {
    let person = {...req.body, id: getRandom()};
    persons.push(person);
    res.status(201).json(person);
  }
})

app.put("/api/persons/:id", (req, res) => {
  let newData = req.body;
  let person = persons.find(person => person.id === +req.params.id);
  console.log(person, persons, req.params.id);
  person.number = newData.number;
  res.status(201).json(person);
})

app.delete("/api/persons/:id", (req, res) => {
  persons = persons.filter(person => person.id !== +req.params.id);
  res.sendStatus(200);
})

app.use((req, res) => res.redirect('/info'));

const PORT = 3001;
app.listen(PORT, () => console.log("listening on PORT"), PORT)