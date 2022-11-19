import { State } from "./state";
import { Patient, Entry, Diagnose } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "VISIT_PATIENT_PAGE";
    payload: Patient;
  }
  | {
    type: "ADD_ENTRY",
    payload: Entry;
  }
  | {
    type: "SET_DIAGNOSIS_LIST",
    payload: Diagnose[]
  };
  
export const setPatients = (patients: Patient[]): Action => {
  return {
      type: "SET_PATIENT_LIST",
      payload: patients,
    };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient,
  };
};

export const viewPatient = (patient: Patient) : Action => {
  return {
    type: "VISIT_PATIENT_PAGE",
    payload: patient,
  };
};

export const addEntry = (newEntry: Entry): Action => {
  return {
    type: "ADD_ENTRY",
    payload: newEntry
  };
};

export const setDiagnoses = (diagnoses: Diagnose[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnoses,
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "VISIT_PATIENT_PAGE":
      return {
        ...state,
        recent: state.recent.slice(0, 2).concat(action.payload)
      };
    case "ADD_ENTRY":
      const patient : Patient = state.recent[state.recent.length - 1];
      if (patient.id !== patient.id) throw new Error("Something went wrong");
      const entries : Entry[] = patient.entries || [];
      
      const newEntries : Entry[] = entries.concat(action.payload);
      const newPatientData : Patient = {...patient, entries: newEntries};
      const newRecent = state.recent.slice(0, state.recent.length - 1);

      return {
        ...state,
        recent: newRecent.concat(newPatientData)
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: action.payload,
      };
    default:
      return state;
  }
};
