import React, { useEffect, useState } from 'react'

import Person from './components/Person'
import PersonForm from './components/Form'
import personService from './services/persons'

const Notification = ({message}) => {
  if (message === null) {
    return null;
  }

  const notificationStyle = {
    color: 'grey',
    background: 'lightgreen',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return (
    <div style={notificationStyle} >
      {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('test');
  const [ newNumber, setNewNumber ] = useState('');
  const [ message, setMessage ] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      });
  }, []);

  const handlePersonChange = (event) => {
    setNewName(event.target.value); 
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value); 
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      id: persons.length + 10,
      name: newName,
      number: newNumber
    }

    if (persons.some(({name}) => name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else if (persons.some(({number}) => number === newNumber)) {
      alert(`${newNumber} is already added to phonebook`);
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setMessage(
            `Note '${returnedPerson.name}' was added to the server`
          )
          setTimeout(() => {
            setMessage(null);
            setNewName('');
          }, 5000);
        })
    }
  };

  const removePerson = (id) => {
    if (window.confirm('Delete this contact?')) {
      personService
      .remove(id)
      .then(returnedData => {
        console.log(returnedData);
      })
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <PersonForm onSubmit={addPerson} nameValue={newName} numValue={newNumber} nameChange={handlePersonChange} numChange={handleNumberChange} />
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <Person key={person.id} name={person.name} number={person.number} removePerson={() => removePerson(person.id)} />
        )}
      </ul>
    </div>
  )
}

export default App;
