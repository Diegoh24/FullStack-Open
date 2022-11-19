export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export enum PatientEntryType {
  HealthCheck = "HealthCheck",
  OccupationalHealthcare = "OccupationalHealthcare",
  Hospital = "Hospital"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: Entry[];
  diagnosisData?: any[];
}

export type UnformattedNewEntry = {
  type: "Hospital" | "OccupationalHealthcare" | "HealthCheck";
  startDate?: string;
  endDate?: string;
  sickLeave?: {startDate: string, endDate: string};
  dischargeDate?: string;
  criteria?: string;
  discharge?: {date?: string, criteria?: string};
};

export type NewEntry = Omit<Entry, "id">;

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck",
  healthCheckRating: HealthCheckRating,
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare",
  employerName: string,
  sickLeave ?: { startDate: string, endDate: string}
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital",
  discharge: {
    date: string,
    criteria: string,
  },
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface EntryWithCodes {
  diagnosisCodes: Diagnose[];
}

export type PublicPatientInfo = Omit<Patient, 'ssn' | 'entries'>;

export interface Diagnose {
  code: string,
  name: string,
  latin ?: string
}

