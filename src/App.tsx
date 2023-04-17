import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage';
import RegisterPage from './Pages/RegisterPage';
import Events from './Components/Events';
import { CreateEventPage } from './Components/CreateEventsPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/events" element={<Events />} />
          <Route path="/create-event" element={<CreateEventPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
