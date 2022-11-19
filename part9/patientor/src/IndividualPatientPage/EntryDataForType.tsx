import { Entry } from "../types";

const healthCheckRatingIcon = {
  0: '💚',
  1: '💛',
  2: '💜',
  3: '❤️',
};

const EntryDataForType = ({entry}: {entry: Entry}) => {
  switch (entry.type) {
    case "HealthCheck":
      return <>
        <p>Rating: {entry.healthCheckRating} - {healthCheckRatingIcon[entry.healthCheckRating]}</p>
      </>;
    case "OccupationalHealthcare":
      return <>
        <p>Employer name {entry.employerName}</p>
        {entry.sickLeave &&
          <>
            <h6>Sick Leave</h6>
            <p>Start Date {entry.sickLeave.startDate}</p>
            <p>End Date: {entry.sickLeave.endDate}</p>
          </>
        }
      </>;
    case "Hospital":
      return <>
        <h6>Discharge:</h6>
        <p>Date: {entry.discharge.date}</p>
        <p>Criteria: {entry.discharge.criteria}</p>
      </>;
    default: 
      return <>The data for this entry is corrupt</>;
  }
};




export default EntryDataForType;