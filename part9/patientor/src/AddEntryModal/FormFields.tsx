import { useState } from "react";
import { ErrorMessage, Field, FieldProps, FormikProps } from "formik";
import { EntryTypeOptions } from "./AddEntryForm";
import { Diagnose } from "../types";
import {
  Select,
  FormControl,
  MenuItem,
  TextField as TextFieldMUI,
  Typography,
  InputLabel,
} from "@material-ui/core";
import Input from '@material-ui/core/Input';


type SelectFieldProps = {
  name: string;
  label: string;
  options: EntryTypeOptions[];
  change?: (event: any) => void;
  value: string;
  setFieldValue: FormikProps<{ type:string }>["setFieldValue"];
};

const FormikSelect = ({ field, ...props }: FieldProps) => <Select {...field} {...props} />;

export const SelectField = 
({ name, label, options, change, value, setFieldValue}: SelectFieldProps) => (
  <>
    <InputLabel>{label}</InputLabel>
    <Field
      fullWidth
      style={{ marginBottom: "0.5em" }}
      label={label}
      component={FormikSelect}
      name={name}
      value={value}
      onChange={(e: {target: {value: string}}) => {
        change && change(e.target.value);
        setFieldValue("type", e.target.value);
      }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label || option.value}
        </MenuItem>
      ))}
    </Field>
  </>
);

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField = ({ field, label, placeholder }: TextProps) => (
  <div style={{ marginBottom: "1em" }}>
    <TextFieldMUI
      fullWidth
      label={label}
      placeholder={placeholder}
      {...field}
    />
    <Typography variant="subtitle2" style={{ color: "red" }}>
      <ErrorMessage name={field.name} />
    </Typography>
  </div>
);

interface NumberProps extends FieldProps {
  label: string;
  min: number;
  max: number;
}

export const NumberField = ({ field, label, min, max }: NumberProps) => {
  const [value, setValue] = useState<number>();

  return (
    <div style={{ marginBottom: "1em" }}>
      <TextFieldMUI
        fullWidth
        label={label}
        placeholder={String(min)}
        type="number"
        {...field}
        value={value}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          if (value === undefined) return;
          if (value > max) setValue(max);
          else if (value <= min) setValue(min);
          else setValue(Math.floor(value));
      }}
      />
      <Typography variant="subtitle2" style={{ color: "red" }}>
        <ErrorMessage name={field.name} />
      </Typography>
    </div>
  );
};

export const DiagnosisSelection = ({
  diagnoses,
  setFieldValue,
  setFieldTouched,
}: {
  diagnoses: Diagnose[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
}) => {
  const [selectedDiagnoses, setDiagnoses] = useState<string[]>([]);
  const field = "diagnosisCodes";
  const onChange = (data: string[]) => {    
    setDiagnoses([...data]);
    setFieldTouched(field, true);
    setFieldValue(field, selectedDiagnoses);
  };

  const stateOptions = diagnoses.map((diagnosis) => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code,
  }));

  return (
    <FormControl style={{ width: 552, marginBottom: '30px' }}>
      <InputLabel>Diagnoses</InputLabel>
      <Select multiple value={selectedDiagnoses} onChange={(e) => onChange(e.target.value as string[])} input={<Input />}>
        {stateOptions.map((option) => (
          <MenuItem key={option.key} value={option.value}>
            {option.text}
          </MenuItem>
        ))}
      </Select>
      <ErrorMessage name={field} />
    </FormControl>
  );
};

export const inputsForType = (type: string) => {
  switch (type) {
    case "HealthCheck":
      return   <>
      <InputLabel>Health Check Rating</InputLabel>
      <Field
        fullWidth
        style={{ marginBottom: "0.5em" }}
        label="Choose a rating"
        component={FormikSelect}
        name="healthCheckRating"
        //eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      >
        {[0, 1, 2, 3].map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Field>
    </>;
    case "OccupationalHealthcare":
      return <>
        <Field
          label="Employer Name"
          name="employerName"
          placeholder="employer name"
          component={TextField}
        />

        <fieldset style={{borderRadius: '10px'}}>
          <h3>Sick Leave - optional</h3>
          <Field
            label="Start Date"
            name="startDate"
            placeholder="YYYY-MM-DD"
            component={TextField}
          />

          <Field 
            label="End Date"
            name="endDate"
            placeholder="YYYY-MM-DD"
            component={TextField}
          />
        </fieldset>
      </>;
    case "Hospital": 
      return <>
        <h3>Discharge</h3>
        <Field
          label="date"
          name="dischargeDate"
          placeholder="YYYY-MM-DD"
          component={TextField}
        />

        <Field
          label="Criteria"
          name="criteria"
          placeholder="..."
          component={TextField}
        />
      </>;
    default: 
      return <p>There was an error loading this form</p>;
  }
};