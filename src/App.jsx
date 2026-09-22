import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({filter, handleFilterChange}) => {
  return (
    <div>
      filter shown with: <input
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  )
}

const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}/>
        </div>

        <div>
          number: <input
            value={newNumber}
            onChange={handleNumberChange}/>
        </div>
        
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Person = ({person, handleDelete, changeNumber}) => {
  const handleChangeNumber = () => {
    const newNumber = window.prompt(
      `Enter new number for ${person.name}:`
    )

    if (newNumber) {
      changeNumber(person.id, newNumber)
    }
  }
  
  return (
    <p>
      {person.name} {person.number}

      <button onClick={() => handleDelete(person)}>
        delete
      </button>

      <button onClick={handleChangeNumber}>
        change number
      </button>
    </p>
  )
}


const Persons = ({persons, handleDelete, changeNumber}) => {
  return (
    <div>
      {persons.map(person => 
        <Person 
          key={person.id} 
          person={person} 
          handleDelete={handleDelete}
          changeNumber={changeNumber}
        />
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
     { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  /*const hook = () => {
  axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }*/

  const hook = () => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  const showNotification = (message, type = 'success') => {
    setNotification({
      message: message,
      type: type
    })
    
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          showNotification(`Deleted ${person.name}`, 'success')
        })
        .catch(error => {
          showNotification(
            `Information of ${person.name} has already been removed from server`,
            'error' 
        )
      })
    }
  }

  const changeNumber = (id, newNumber) => {
    const person = persons.find(person => person.id === id)

    const changedPerson = {
      ...person,
      number: newNumber
    }

    personService
    .update(id, changedPerson)
    .then(returnedPerson => {
      setPersons(
        persons.map(person =>
          person.id !== id ? person : returnedPerson.data
        )
      )

      showNotification(
        `Changed number of ${person.name}`,
        'success'
      )
    })
    .catch(error => {
      showNotification(
        `Information of ${person.name} has already been removed from server`,
        'error'
      )
    })
  }

  console.log(persons)

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )  

  console.log(
    persons.map((person, index) => ({
      index,
      person,
      name: person?.name
    }))
  )

  const addPerson = (event) => {
    event.preventDefault()

    const nameExists = persons.some(person => person.name === newName)

    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        showNotification(`Added ${response.data.name}`, 'success')
      })
  }

  /*axios
    .post('http://localhost:3001/persons', {
      name: newName,
      number: newNumber
    })
    .then(response => {
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
    })
    .catch(error => {
      console.error('Error adding person:', error)
    })
  }*/

    /*const personObject = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')*
  }*/

  return (
    <div>
      <h2>Phonebook</h2>
      {notification && (
        <div className={notification.type}>
          {notification.message}
        </div>
      )}

      <Filter 
        filter={filter} 
        handleFilterChange={handleFilterChange}
      />

      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} 
      />
      
      <h3>Numbers</h3>
      <Persons 
        persons={personsToShow}
        handleDelete={handleDelete}
        changeNumber={changeNumber}
      />
    </div>
  )
}

export default App