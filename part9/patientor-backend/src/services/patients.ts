import patients from '../../data/patients';

import { Patient, PublicPatientInfo, Entry } from '../types';

const hidePatientInfo = ({id, name, dateOfBirth, gender, occupation}: Patient) : PublicPatientInfo => {
  return {id, name, dateOfBirth, gender, occupation};
};

const getAll = (): PublicPatientInfo[] => {
  return patients.map(hidePatientInfo);
}

const addPatient = (patient: Patient) => {
  patients.push(patient);
}

const findById = (id : string) : Patient | undefined => {
  const patient : Patient | undefined = patients.find(patient => patient.id === id);
  return patient;
}

export const addEntry = (newEntry: Entry, patientId: string) => {
  const patient = patients.find((patient: Patient) => patient.id === patientId);
  patient?.entries.push(newEntry);
}

export default {
  getAll,
  addPatient,
  findById,
  addEntry,
};