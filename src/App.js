import logo from './logo.svg';
import './App.css';
import Navbar from './component/router/navbar';
import Form from './component/router/form';
import Table_Data from './component/router/table';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/form" element={<Form />} />
          <Route path="/table" element={<Table_Data />} />
          <Route path="/edit/:id" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
