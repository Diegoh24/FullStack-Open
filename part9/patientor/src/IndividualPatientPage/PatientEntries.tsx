import { Entry, Diagnose } from "../types";
import EntryDataForType from "./EntryDataForType";

const entryTypeIcons = {
  HealthCheck: "🩺",
  OccupationalHealthcare: "🏢",
  Hospital: "➕😷"
};

const DiagnosisCodes = ({codeData, id}: {codeData: Diagnose[] | undefined, id: string}) => {
  if (!codeData) return <></>;
  return <>
    <ul key={id}>
      {codeData.map(diagnosisCode => 
        <li key={id}>{diagnosisCode.code} {diagnosisCode.name}</li>  
      )}
    </ul>
  </>;
};

const IndividualEntry = 
({entry, diagnoses}: {entry: Entry, diagnoses: Diagnose[] | undefined}) => {
  let codeData;
  if (entry.diagnosisCodes) {
    codeData = entry.diagnosisCodes.map(code => diagnoses?.find(diag => diag.code = code));
  }
  
  const diagnosisData: Diagnose[] = codeData as Diagnose[];
  return <>
      <h4>Entry Type: {entry.type} {entryTypeIcons[entry.type]}</h4>
      <EntryDataForType entry={entry}/>

      <p>{entry.date}<span style={{fontSize: 25}}></span></p>
      <i key={entry.id} id={entry.id}>{entry.description}</i>
      {<DiagnosisCodes codeData={diagnosisData} id={entry.id}/>}
      <p style={{borderBottom: "2px solid black", paddingBottom: "15px"}}>
      diagnose by {entry.specialist}
      </p>
  </>;
};


const PatientEntries = ({entries, diagnoses}: {entries: Entry[], diagnoses: Diagnose[]}) => {
  let key = 101;
  const nextKey = () => {
    key += 1;
    return key;
  };

  return <>
    <h3>Entries</h3>
      {entries.map((entry) => 
        <IndividualEntry entry={entry} diagnoses={diagnoses} key={nextKey()}/> 
      )}
  </>;
};

export default PatientEntries;