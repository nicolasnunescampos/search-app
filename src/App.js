import { FiSearch } from 'react-icons/fi'
import './style.css'
import {useState} from 'react'
import api from './services/api'

function App() {

const [input, setInput] = useState ('')
const [cep, setCep] = useState({})

async function handleSearch(){
  if(input === ''){
    alert('Preencha com algum CEP')
    return
  }

  try{
    const response = await api.get(`${input}/json`)
    setCep(response.data)
    setInput("")
  } catch {
    alert('erro')
    setInput ("")
  }
} 

  return (
    <div className="container">
      <h1 className="title">CEP Search</h1>

      <div className="containerInput">
        <input
          type={"text"}
          placeholder="Digite seu CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="containerBtn" onClick={handleSearch}>
          <FiSearch size={25} color="white"/>
        </button>
      </div>

      {Object.keys(cep).length > 0 &&(
        <main className='main'>
        <h2>CEP: {cep.cep}</h2>
        <span>Cidade: {cep.localidade} - {cep.uf} </span>
        <span>DDD: {cep.ddd} </span>
        <span>IBGE: {cep.ibge} </span>
      </main>
      )}

    </div>
  );
}

export default App;
