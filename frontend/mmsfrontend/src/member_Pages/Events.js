import React, { useState, useEffect } from 'react';
import MemberHeader from './MemberHeader';
import ImagePreview from './ImagePreview';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Loader from './Loader'; // Import the Loader component
import './Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events');
        const data = await response.json();
        setEvents(data);
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
      <br></br><br></br><br></br>
      
      <div className="events-container">
        {loading ? (
          <Loader LoaderMessage="Getting events ready..." /> // Show loader while fetching events
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
                  <h3>{event.eventName}</h3>
                  <p>{event.eventDescription}</p>
                  {event.eventRegistrationLink && (
                    <a href={event.eventRegistrationLink}>Click here to register</a>
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
