import { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form} from "formik";
import { useStateValue } from "../state";

import { TextField, SelectField, DiagnosisSelection, inputsForType } from "./FormFields";
import { 
  PatientEntryType, 
  Entry,
} from "../types";

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export type EntryFormValues = Omit<Entry, "id">;

export type EntryTypeOptions = {
  value: PatientEntryType;
  label: string;
};

// export type HealthCheckRatingOptions = {
//   value: number
//   label: string;
// }

const typeOptions: EntryTypeOptions[] = [
  { value: PatientEntryType.HealthCheck, label: "Health Check" },
  { value: PatientEntryType.OccupationalHealthcare, label: "Occupational Healthcare" },
  { value: PatientEntryType.Hospital, label: "Hospital" },
];


export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  const [type, setType] = useState('HealthCheck');

  const setEntryType = (newType: string) => {
    setType(newType);
  };

  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        description: "",
        date: "",
        specialist: "",
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.tyoe = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date of Diagnosis"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
            <SelectField 
              label="type" 
              name="type"
              value={type}
              options={typeOptions}
              change={setEntryType}
              setFieldValue={setFieldValue}
            />
            
            <fieldset style={{borderRadius: '10px'}}>
              {inputsForType(type)}
            </fieldset>

            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={diagnoses}
            /> 

            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;

