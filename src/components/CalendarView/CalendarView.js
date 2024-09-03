import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import { EventContext } from '../../contexts/EventContext';
import EventModal from '../EventModal/EventModal';
import { formatDate } from '../../utils/dateUtils';
import 'react-calendar/dist/Calendar.css';
import './CalendarView.css';

const CalendarView = () => {
  const { events, deleteEvent } = useContext(EventContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filter, setFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const dateMatch = formatDate(eventDate) === formatDate(selectedDate);
    const categoryMatch = filter === 'all' || event.category === filter;
    return dateMatch && categoryMatch;
  });

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  const handleDeleteEvent = (id) => {
    deleteEvent(id);
    closeModal();
  };

  return (
    <div className="calendar-container">
      <Calendar 
        onChange={setSelectedDate} 
        value={selectedDate}
        tileContent={({ date }) => {
          const eventsForDay = events.filter(event => 
            formatDate(new Date(event.date)) === formatDate(date)
          );
          return eventsForDay.length > 0 ? <p className="event-indicator">{eventsForDay.length}</p> : null;
        }}
      />
      <div className="calendar-controls">
        <select 
          className="category-filter"
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
        </select>
        <Link to="/add-event" className="add-event-btn">Add Event</Link>
      </div>
      <ul className="event-list">
        {filteredEvents.map(event => (
          <li key={event.id} className="event-item" onClick={() => handleEventClick(event)}>
            {event.title}
          </li>
        ))}
      </ul>
      {selectedEvent && (
        <EventModal 
          event={selectedEvent} 
          onClose={closeModal} 
          onDelete={handleDeleteEvent}
        />
      )}
    </div>
  );
};

export default CalendarView;

