import personsService from "../services/personsService";

const Contacts = ({contacts, removePerson}) => {
  return (
  <ul>
    {contacts.map(person => 
      <li key={person.id}>
        {person.name} {person.number}
        <button onClick={() => removePerson(person.id)}>delete</button>
      </li>
    )}

  </ul>
  )
}

export default Contacts;
