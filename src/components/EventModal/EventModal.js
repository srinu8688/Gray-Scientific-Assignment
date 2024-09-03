
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EventModal.css';
const EventModal = ({ event, onClose, onDelete }) => {
    const navigate = useNavigate();
  
    const handleEdit = () => {
      navigate(`/edit-event/${event.id}`);
      onClose();
    };
  
    const handleDelete = () => {
      if (window.confirm('Are you sure you want to delete this event?')) {
        onDelete(event.id);
      }
    };
  
    return (
        <div className="event-modal-overlay" onClick={onClose}>
          <div className="event-modal" onClick={e => e.stopPropagation()}>
            <h2>{event.title}</h2>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Category:</strong> {event.category}</p>
            <p><strong>Description:</strong> {event.description}</p>
            <div className="event-actions">
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete} className="delete-btn">Delete</button>
              <button onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      );
    };
    
export default EventModal;
    

  

 