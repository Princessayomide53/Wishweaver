import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CreateTemplate from './Routes/CreateTemplate';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create-template' element={<CreateTemplate />} />
        {/* <Route path='/contact' element={<Contact />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
