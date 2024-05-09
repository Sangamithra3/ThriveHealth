import React from 'react';
import './App.css';
import SectionForm from './Components/Section1Form/SectionForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3>Patient enrollment Form</h3>
      </header>
      <main>
        <SectionForm />
      </main>
    </div>
  );
}

export default App;
