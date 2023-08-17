import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Testapi from './Components/Testapi';



function App() {
 
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Testapi />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
