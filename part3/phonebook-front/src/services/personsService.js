import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = async() => {
  let res = await axios.get(baseUrl);
  return res.data;
}

const addPerson = async(person) => {
  let newPerson = await axios.post(baseUrl, person)
  return newPerson.data;
}

const update = async(newData) => {
  return await axios.put(`${baseUrl}/${newData.id}`, newData);
}

const remove = async(id) => {
  return await axios.delete(`${baseUrl}/${id}`);
}

export default {getAll, addPerson, update, remove}