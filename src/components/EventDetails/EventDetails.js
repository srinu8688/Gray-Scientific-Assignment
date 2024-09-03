import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EventContext } from '../../contexts/EventContext';
import './EventDetails.css';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, deleteEvent } = useContext(EventContext);
  const event = events.find(e => e.id === parseInt(id));

  if (!event) return <div>Event not found</div>;

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(event.id);
      navigate('/');
    }
  };

  return (
    <div className="event-details">
      <h2>{event.title}</h2>
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Category:</strong> {event.category}</p>
      <p><strong>Description:</strong> {event.description}</p>
      <div className="event-actions">
        <button onClick={() => navigate(`/edit-event/${event.id}`)}>Edit</button>
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
        <button onClick={() => navigate('/')}>Back to Calendar</button>
      </div>
    </div>
  );
};

export default EventDetails;

