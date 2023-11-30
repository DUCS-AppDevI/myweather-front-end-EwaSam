// src/App.js

import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './component/login';
import Weather from './component/weather';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/weather" element={<Weather />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;