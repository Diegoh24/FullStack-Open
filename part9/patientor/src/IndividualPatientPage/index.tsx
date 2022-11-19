import axios from "axios";

import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { apiBaseUrl } from "../constants";
import { addEntry } from "../state/reducerAC";

import PatientInfo  from "./PatientInfo";
import PatientEntries from "./PatientEntries";

import { Button } from "@material-ui/core";

import { useStateValue } from "../state";
import { viewPatient, setDiagnoses } from "../state/reducerAC";
import { Patient, Entry, Diagnose, NewEntry, UnformattedNewEntry } from "../types";
import AddEntryModal from "../AddEntryModal";

const genderIcons = {
  male: '♂️',
  female: '♀️',
  other: '⚧️',
};

const PatientPage = () : JSX.Element => {
  const [{ recent, diagnoses }, dispatch] = useStateValue();
  const [error, setError] = useState<string>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const patient : Patient | undefined = recent.find(patient => patient.id === id);

  useEffect(() => {
    if (recent.length && patient) {
      return;
    } else {
      retrievePatient(id)
        .catch(err => console.log(err));
    }
  }, []);

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const retrievePatient = async (id: string | undefined) => {
    const url = `${apiBaseUrl || ''}/patients/${id || ''}`;
    const res : Awaited<{data: Patient, status: number}> = await axios.get(url);
    const patient : Patient = res.data; 
    await setEntryCodeData();
    dispatch(viewPatient(patient));
  };

  
  const setEntryCodeData = async () => {
    if (!diagnoses.length) {
      const res: Awaited<{data: Diagnose[]}> = await axios.get(`${apiBaseUrl}/diagnosis`);
      dispatch(setDiagnoses(res.data));
    }
  };

  /* eslint-disable */
  const formatEntryData = (entry: UnformattedNewEntry): void => {
    switch (entry.type) {
      case "HealthCheck":
        return;
      case "OccupationalHealthcare":
        if (entry.startDate && entry.endDate) {
          const {startDate, endDate} = entry;
          entry.sickLeave = {startDate, endDate};
        }
        return;
      case "Hospital":
        const {dischargeDate, criteria} = entry;
        delete entry.dischargeDate && delete entry.criteria;
        entry.discharge = {date: dischargeDate, criteria,};
    }
  };
  /* eslint-enable */

  const submitNewEntry = async(values: NewEntry) => {
    const current : Patient = patient as Patient;
    try {
      formatEntryData(values);
      const res : Awaited<{data: Entry}> = await axios.post(
        `${apiBaseUrl}/patients/${current.id}/entries`, values
      );

      dispatch(addEntry(res.data));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };
  
  if (!patient) {
    return <p key={'lol'}>Loading...</p>;
  } else {
    const {name, ssn, occupation} = patient;
    const icon = genderIcons[patient.gender];
    const entries = patient.entries || [];

    return <>
            <PatientInfo name={name} ssn={ssn || 'No ssn'} occupation={occupation} icon={icon}/>
            <Button variant="contained" onClick={() => openModal()}>
              Add New Entry
            </Button>
            
            <PatientEntries entries={entries} diagnoses={diagnoses}/>

            <>
              <AddEntryModal 
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
              />
            </>
          </>;
  }
};

export default PatientPage;