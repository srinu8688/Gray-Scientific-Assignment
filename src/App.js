import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EventProvider } from './contexts/EventContext';
import Header from './components/Header/Header';
import CalendarView from './components/CalendarView/CalendarView';
import EventForm from './components/EventForm/EventForm';
import './App.css';

function App() {
  return (
    <EventProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="app-content">
            <Routes>
              <Route path="/" element={<CalendarView />} />
              <Route path="/add-event" element={<EventForm />} />
              <Route path="/edit-event/:id" element={<EventForm />} />
            </Routes>
          </main>
        </div>
      </Router>
    </EventProvider>
  );
}

export default App;
