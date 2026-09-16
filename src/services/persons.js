import axisos from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axisos.get(baseUrl)
}

const create = newObject => {
  return axisos.post(baseUrl, newObject)
}

export default { 
    getAll, 
    create 
}