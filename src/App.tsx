import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CreateTemplate from './Routes/CreateTemplate';
import GroupText from './Routes/GroupText';
import ViewCards from './Routes/ViewCards';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create-template' element={<CreateTemplate />} />
        <Route path='/group-template' element={<GroupText />} />
        <Route path='/view-cards' element={<ViewCards />} />
      </Routes>
    </Router>
  );
}

export default App;
