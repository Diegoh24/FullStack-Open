import { useEffect, useState, } from 'react'
import axios from 'axios';
import Filter from './components/Filter';
import AddContact from './components/AddContact';
import Contacts from './components/Contacts';

import personsService from './services/personsService';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState({searching: false});
  const [newName, setNewName] = useState('')

  useEffect(() => {
      personsService.getAll()
      .then(persons => setPersons(persons))
      .catch(err => alert(err));
  }, [])

  const exists = (data, type) => persons.some(person => person[type] === data);

  const addPerson = event => {
    event.preventDefault();
    let name = event.target.name.value;
    let number = event.target.number.value;

    if (name.trim().length < 0 || !/^\d{9,}$/.test(number)) {
      return alert('enter a name and valid phone number');
    } else if (exists(name, "name")) {
      let existing = persons.find(person => person.name === name);
      if (window.confirm('Name is already in phonebook. Would you like to update the number?')) {
        personsService
          .update({name, number, id: existing.id})
          .then(res => {
            if (res.status === 200) {
              let newData = [...persons];
              let idx = newData.indexOf(existing);
              newData[idx] = res.data;
              setPersons(newData);
            }
          })
          .catch(err => alert(err));
      }
    } else if (exists(number, "number")) {
      return alert(`${number} is already in phonebook`);
    }

    let newPerson = {name, number}

    personsService
      .addPerson(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        event.target.reset();
      })
      .catch(err => alert(err));
  }

  const searchByName = event => {
    event.preventDefault();
    let search = event.target.value;
    if (!search) return setSearch({searching: false})
    
    let results = persons.filter(person => (new RegExp(search)).test(person.name));
    setSearch({searching: true, results,});
  }

  const removePerson = (id) => {
    if (window.confirm('Are you sure you want to delete this person')) {
      personsService
      .remove(id)
      .then(res => {
        if (res.status !== 200) alert('Person is already removed');
        setPersons(persons.filter(person => person.id !== id));
      })
    };
  };

  let personsToShow = search.searching ? search.results : persons;

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter onChange={searchByName} />
      <h2>Add New</h2>
      <AddContact onSubmit={addPerson} />
      <h2>Numbers</h2>
      <Contacts contacts={personsToShow} removePerson={removePerson}/>
    </div>
  )
}

export default App