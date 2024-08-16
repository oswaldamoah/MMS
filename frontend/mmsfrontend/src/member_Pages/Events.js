import React, { useState, useEffect } from 'react';
import MemberHeader from './MemberHeader';
import ImagePreview from './ImagePreview';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Loader from './Loader'; // Import the Loader component
import './Events.css';

// Utility function to format text with *bold* syntax
const formatText = (text) => {
  // Replace *text* with <strong>text</strong>
  return text.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
};

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events');
        const data = await response.json();

        // Sort events by creation date in descending order
        const sortedEvents = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setEvents(sortedEvents);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false); // Set loading to false even if there's an error
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
      <br /><br /><br />
      
      <div className="events-container">
        {loading ? (
          <Loader LoaderMessage="Getting events ready..." /> // Show loader while fetching events
        ) : events.length === 0 ? (
          <p>No events available</p> // Display message if no events are found
        ) : (
          <>
            <h1> </h1>
            <div className="events-grid">
              {events.map((event, index) => (
                <div key={index} className="event-card">
                  <LazyLoadImage
                    src={`http://localhost:5000/api/events/image/${event._id}`}
                    alt={event.eventName}
                    className="event-image"
                    onClick={() => handleImageClick(`http://localhost:5000/api/events/image/${event._id}`)}
                    effect="blur"
                  />
                  <h3>
                    {event.eventName.split('/n').map((line, idx) => (
                      <div key={idx}>{line}</div>
                    ))}
                  </h3>
                  <p dangerouslySetInnerHTML={{ __html: formatText(event.eventDescription) }} />
                  {event.eventRegistrationLink && (
                    <a href={event.eventRegistrationLink} target="_blank" rel="noopener noreferrer">
                      Click here to register
                    </a>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {selectedImage && (
        <ImagePreview imageSrc={selectedImage} onClose={handleClosePreview} />
      )}
    </div>
  );
};

export default Events;
