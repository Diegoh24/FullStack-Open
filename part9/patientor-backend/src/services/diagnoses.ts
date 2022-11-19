import diagnoses from '../../data/diagnoses.json';
import { Diagnose } from '../types';

const getAll = (): Diagnose[] => {
  return diagnoses;
}

// const getNonSensitiveEntries =
//   () : [] => {
//     return diaries.map(({id, date, weather, visibility}) => ({
//       id,
//       date,
//       weather,
//       visibility,
//     }))
//   }

const addDiagnose = () => {
  return null;
}

export default {
  getAll,
  addDiagnose,
};