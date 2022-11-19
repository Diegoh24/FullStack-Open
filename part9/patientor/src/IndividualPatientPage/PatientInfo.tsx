const PatientInfo = 
({name, ssn, occupation, icon}: 
{name: string, ssn: string, occupation: string, icon: string}) => {
  return  <>
    <h2> {name} <b style={{fontSize: "25px"}}>{icon}</b></h2>
    <p>ssh: {ssn}</p>
    <p>{occupation}</p>
  </>;
};

export default PatientInfo;