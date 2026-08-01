import React from 'react';
import MemberHeader from './MemberHeader';
import ImagePreview from './ImagePreview';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Loader from './Loader';
import './Events.css';
import { API } from '../api';

// Utility function to format text with *bold* syntax
const formatText = (text) => {
  return text.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
};

const Events = ({ events, loading, error }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const handleClosePreview = () => {
    setSelectedImage(null);
  };

  const handleShare = (event) => {
    const shareUrl = window.location.origin + '/event/' + event.slug;
    navigator.clipboard.writeText(shareUrl).catch(() => {});
    setCopiedId(event._id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="events-page">
      <MemberHeader headertitle="Events" />
      <br /><br /><br />

      <div className="events-container">
        {loading ? (
          <Loader LoaderMessage="Getting events ready..." />
        ) : error ? (
          <p>{error}</p>
        ) : events.length === 0 ? (
          <p>No events available</p>
        ) : (
          <>
            <h1> </h1>
            <div className="events-grid">
              {events.map((event, index) => (
                <div key={index} className="event-card">
                  <LazyLoadImage
                    src={API + '/api/events/image/' + event._id}
                    alt={event.eventName}
                    className="event-image"
                    onClick={() => handleImageClick(API + '/api/events/image/' + event._id)}
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
                  <div className="event-card-actions">
                    <Link to={'/event/' + event.slug} className="event-view-link">
                      View Details
                    </Link>
                    <button className="event-share-btn" onClick={() => handleShare(event)}>
                      {copiedId === event._id ? 'Copied!' : 'Share'}
                    </button>
                  </div>
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
