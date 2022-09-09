import './App.css';
import MiApi from './components/MiApi';
import Form from './components/Form';
import Button from './components/Button'
import { useState } from 'react'


const App = () => {
  const [base, setBase] = useState([])
  return (
    <div className="container">
      <h1>Ofertas laborales en EEUU</h1>
      <MiApi setBase={setBase} />
      <Form base={base} setBase={setBase} />
      <Button />
    </div>
  );
}

export default App;
