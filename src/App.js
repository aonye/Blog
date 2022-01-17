import { useState } from 'react';
import './App.css';
import Nav from './components/Nav.js';

function App() {
  const [x, setX] = useState([]);

  function addStuff() {
    const newDiv = (
      <div>
        Hello world
      </div>
    )
    setX([...x, newDiv]);
  }

  function displayStuff() {
    return x.map(item => item);
  }

  return (
    <>
      <div class='nav-box'>
        <Nav />
      </div>
      <div class='App'>
        <span className='test'>aaaaasds</span>
      </div>
      <button onClick={(e) => { addStuff(e) }}>Add stuff</button>
      {displayStuff()}
    </>
  );
}

export default App;