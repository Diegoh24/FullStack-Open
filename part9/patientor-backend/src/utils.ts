import { Patient, Gender, 
  Entry, BaseEntry, ValidBaseEntry, 
  HealthCheckRating, HealthCheckEntry,
  OccupationalHealthcareEntry,  HospitalEntry
} from "./types"

import { v1 as uuid } from "uuid"; 



type Fields = { name: unknown, dateOfBirth: unknown, gender: unknown, occupation: unknown, ssn: unknown};

export const toNewPatientData = 
({name, dateOfBirth, gender, occupation, ssn} : Fields)
: Patient => {
  const id : string = uuid();

  return {
    id,
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    ssn: parseSsn(ssn),
    entries: []
  }
}

const isSsn = (ssn : string) : boolean => {
  return Boolean(ssn.match(/^\d{6}-\d{3,}/));
}

const parseSsn = (ssn: unknown) : string => {
  if (!ssn || !isString(ssn) || !isSsn(ssn)) {
    throw new Error('invalid ssn');
  }

  return ssn;
}

const parseOccupation = (occupation: unknown) : string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('pick a job, any job. even a ..');
  }

  return occupation;
}

const parseGender = (gender: unknown) : Gender => {
  if (!gender || !isString || !isGender(gender)) {
    throw new Error("WOW. it's 2022 and WOW!");
  }

  return gender;
}

const isGender = (gender: any) : gender is Gender => {
  return Object.values(Gender).includes(gender);
}

const parseName = (name : unknown) : string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
}

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Invalid date');
  }

  return date;
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
}

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
}

// new patient entry validation
type EntryFields = {
  type: unknown,
  description: unknown, date: unknown, specialist: unknown,
  healthCheckRating: unknown, employerName: unknown, discharge: unknown
};

export const toNewEntryData = (data: EntryFields): Entry => {
  const id : string = uuid();
  return {...parseEntry(data), id,};
}

const isObject = (obj: unknown) : obj is object => {
  return !!obj && typeof obj === 'object';
}

const isValidBaseEntry = (entry: object) : entry is BaseEntry => {
  const requiredFields: string[]  = Object.keys(ValidBaseEntry);
  const newEntryFields: string[] = Object.keys(entry);
  const hasAllFields : boolean = requiredFields.every(field => newEntryFields.includes(field));
  
  if (!hasAllFields) {
    throw new Error("Missing description, date, or specialist fields");
  }

  return true;
}

const isHealthCheck = (entry : BaseEntry): entry is HealthCheckEntry => entry.hasOwnProperty('healthCheckRating');

const isOccupationalHealthcare = (entry: BaseEntry): entry is OccupationalHealthcareEntry => {
  return entry.hasOwnProperty("employerName");
}

const isHospitalEntry = (entry: BaseEntry): entry is HospitalEntry => entry.hasOwnProperty("discharge");

const validDischarge = (entry: HospitalEntry) => {
  const {date, criteria} = entry.discharge
  console.log('passes valid dischrage')
  if (!isString(date) || !isString(criteria)) throw new Error("Invalid discharge inputs");
  return true;
}

const validHospitalEntry = (entry: unknown): entry is Entry => {
  if (!isObject(entry) || !isValidBaseEntry(entry) || !isHospitalEntry(entry)) {
    return false;
  }
  console.log('passes validHospitalEntry')

  return validDischarge(entry);
}

const validHealthCheck = (entry: unknown) : entry is Entry => {
  if (!isObject(entry) || !isValidBaseEntry(entry) || !isHealthCheck(entry)) {
    return false;
  }
  
  return Object.values(HealthCheckRating).includes(entry.healthCheckRating);
}

const parseHealthCheckEntry = (entry: EntryFields) : Entry => {
  if (validHealthCheck(entry)) return entry;
  throw new Error('Invalid HealthCheck entry');  
}

const validOccupationalHealthcare = (entry: unknown): entry is Entry => {
  if (!isObject(entry) || !isValidBaseEntry(entry) || !isOccupationalHealthcare(entry)) {
    return false;
  }

  return typeof entry.employerName === 'string';
};

const parseOccupationalHealthcareEntry = (entry: unknown) : Entry => {
  if (validOccupationalHealthcare(entry)) {
    return entry;
  }

  throw new Error("Invalid or missing 'employer name' field");
};

const parseHospitalEntry = (entry: unknown): Entry => {
  if (validHospitalEntry(entry)) return entry;
  throw new Error("Invalid Hospital entry: invalid or missing parameters");
}

const parseEntry = (data : EntryFields) : Entry => {
  switch (data.type) {
    case "HealthCheck": 
      return parseHealthCheckEntry(data);
    case "OccupationalHealthcare":
      return parseOccupationalHealthcareEntry(data);
    case "Hospital":
      return parseHospitalEntry(data);
    default:
      throw new Error("Invalid 'type' field for entry");
  }
}