const express = require('express');
const app = express();

app.use(express.json());

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
  if (name.trim.length < 1 || number.trim.length < 1) {
    res.send(422);
  } else if (persons.find(person => person.number === numebr)) {
    res.send(422);
  } else {
    let person = {...req.body, id: getRandom()};
    persons.push(person);
    res.sendStatus(201);
  }
})

app.delete("/api/persons/:id", (req, res) => {
  persons = persons.filter(person => person.id !== +req.params.id);
  res.sendStatus(200);
})


const PORT = 3001;
app.listen(PORT, () => console.log("listening on PORT"), PORT)