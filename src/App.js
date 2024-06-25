import './App.css';
import Invoice from './Components/Invoice';

function App() {
  return (
    <>
     <header className="App-header">
        <h1 style={{textAlign:"center"}}>Invoice Generator</h1>
      </header>
      <Invoice/>
    </>
  );
}

export default App;
