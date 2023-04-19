import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage';
import RegisterPage from './Pages/RegisterPage';
import Events from './Components/Events';
import EventPage from './Components/EventPage';
import { CreateEventPage } from './Components/CreateEventsPage';
import Organizations from './Components/Organizations';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventPage />} />
          <Route path="/event-form" element={<CreateEventPage />} />
          <Route path="/organizations" element={<Organizations />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
