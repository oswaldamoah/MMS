import React, { useState, useEffect } from 'react';
import MemberHeader from './MemberHeader';
import ImagePreview from './ImagePreview'; // Import the ImagePreview component
import './Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const handleClosePreview = () => {
    setSelectedImage(null);
  };

  return (
    <div className="events-page">
      <MemberHeader headertitle="Events" />
      <div className="events-container">
        <h1>Events</h1>
        <div className="events-grid">
          {events.map((event, index) => (
            <div key={index} className="event-card">
              <img 
                src={`http://localhost:5000/api/events/image/${event._id}`} 
                alt={event.eventName} 
                className="event-image" 
                onClick={() => handleImageClick(`http://localhost:5000/api/events/image/${event._id}`)} // Add click handler
              />
              <h3>{event.eventName}</h3>
              <p>{event.eventDescription}</p>
              {event.eventRegistrationLink && (
                <a href={event.eventRegistrationLink}>Click here to register</a>
              )}
            </div>
          ))}
        </div>
      </div>
      {selectedImage && (
        <ImagePreview imageSrc={selectedImage} onClose={handleClosePreview} />
      )}
    </div>
  );
};

export default Events;
