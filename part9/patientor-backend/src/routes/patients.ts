import express from "express";
import patientService from "../services/patients";
import { toNewPatientData, toNewEntryData } from "../utils";
import { Entry } from "../types"


const router = express.Router();

router.get('/', (_req, res) => {
  console.log('hello')
  res.status(200).send(patientService.getAll())
});

router.get('/:id', (req, res) => {
  let patient = patientService.findById(req.params.id);
  patient ? res.status(200).json(patient) : res.status(400).send({error: "patient not found"});
})

router.post('/', (req, res) => {
  try {
    let newPatient = toNewPatientData(req.body)
    patientService.addPatient(newPatient);
    res.status(200).json(newPatient);

  } catch (error: unknown ){
    let msg = 'something went wrong';
    if (error instanceof Error) {
      msg = `${msg}  Error${error.message}`
    }

    res.status(400).send(msg);
   }
})

router.post("/:id/entries", (req, res) => {
  const data = req.body;
  console.log('hi', data);
  try {
    const newEntry : Entry =  toNewEntryData(data);
    patientService.addEntry(newEntry, req.params.id);
    res.status(200).json(newEntry);
  } catch (error : unknown) {
    if (error instanceof Error) {
      res.status(400).json({error: error.message})
    } else {
      res.status(500).json({error,})
    }  }
});

export default router;