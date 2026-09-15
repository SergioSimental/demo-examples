import { useState } from 'react'


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

const Person = ({person}) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  )
}


const Persons = ({persons}) => {
  return (
    <div>
      {persons.map(person => 
        <Person key={person.id} person={person} />
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

  const personsToShow = persons.filter(person =>
     person.name.toLowerCase().includes(filter.toLowerCase())
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

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        filter={filter} 
        handleFilterChange={handleFilterChange}
      />

      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} 
      />
      
      <h2>Numbers</h2>
      <Persons persons={personsToShow}/>
    </div>
  )
}

export default App