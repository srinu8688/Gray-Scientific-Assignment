import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EventContext } from '../../contexts/EventContext';
import './EventForm.css';

const EventForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, addEvent, updateEvent } = useContext(EventContext);
  const [event, setEvent] = useState({
    title: '',
    date: '',
    category: 'personal',
    description: ''
  });

  useEffect(() => {
    if (id) {
      const eventToEdit = events.find(e => e.id === parseInt(id));
      if (eventToEdit) setEvent(eventToEdit);
    }
  }, [id, events]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updateEvent({ ...event, id: parseInt(id) });
    } else {
      addEvent(event);
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <h2>{id ? 'Edit Event' : 'Add New Event'}</h2>
      <input
        type="text"
        name="title"
        value={event.title}
        onChange={handleChange}
        placeholder="Event Title"
        required
      />
      <input
        type="date"
        name="date"
        value={event.date}
        onChange={handleChange}
        required
      />
      <select
        name="category"
        value={event.category}
        onChange={handleChange}
      >
        <option value="work">Work</option>
        <option value="personal">Personal</option>
      </select>
      <textarea
        name="description"
        value={event.description}
        onChange={handleChange}
        placeholder="Event Description"
      />
      <button type="submit">{id ? 'Update Event' : 'Add Event'}</button>
      <button type="button" onClick={() => navigate('/')}>Cancel</button>
    </form>
  );
};

export default EventForm;

