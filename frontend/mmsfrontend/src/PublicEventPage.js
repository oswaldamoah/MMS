import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API } from './api';

const PublicEventPage = () => {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [qrCode, setQrCode] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const response = await fetch(API + '/api/public/events/' + slug);
        if (!response.ok) throw new Error('Event not found');
        const data = await response.json();
        setEvent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [slug]);

  useEffect(() => {
    if (event) {
      const shareUrl = window.location.origin + '/event/' + event.slug;
      const qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=' + encodeURIComponent(shareUrl);
      setQrCode(qrUrl);
    }
  }, [event]);

  const handleCopyLink = () => {
    const shareUrl = window.location.origin + '/event/' + slug;
    navigator.clipboard.writeText(shareUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '100px', fontFamily: 'Arial, sans-serif' }}>
        <h2>Loading event...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '100px', fontFamily: 'Arial, sans-serif' }}>
        <h2>Event not found</h2>
        <p>{error}</p>
        <Link to="/Events" style={{ color: '#378654', textDecoration: 'none' }}>Back to Events</Link>
      </div>
    );
  }

  if (!event) return null;

  const shareUrl = window.location.origin + '/event/' + event.slug;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <Link to="/Events" style={{ color: '#378654', textDecoration: 'none', display: 'block', marginBottom: '20px' }}>
        Back to Events
      </Link>

      <img
        src={API + '/api/events/image/' + event._id}
        alt={event.eventName}
        style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '12px' }}
      />

      <h1 style={{ color: '#378654', marginTop: '20px' }}>{event.eventName}</h1>

      <div style={{ fontSize: '16px', lineHeight: '1.6', color: '#333' }}>
        <p>{event.eventDescription}</p>
      </div>

      {event.eventRegistrationLink && (
        <a
          href={event.eventRegistrationLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            marginTop: '20px',
            padding: '12px 32px',
            backgroundColor: '#378654',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
          }}
        >
          Register for this Event
        </a>
      )}

      <div style={{ marginTop: '40px', padding: '20px', borderTop: '1px solid #eee' }}>
        <h3 style={{ color: '#378654' }}>Share this Event</h3>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginTop: '16px' }}>
          {qrCode && (
            <img
              src={qrCode}
              alt="QR Code"
              style={{ width: '200px', height: '200px', borderRadius: '8px', border: '2px solid #378654' }}
            />
          )}

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            <input
              type="text"
              value={shareUrl}
              readOnly
              style={{
                padding: '10px 16px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                width: '300px',
                maxWidth: '100%',
                fontSize: '14px',
              }}
            />
            <button
              onClick={handleCopyLink}
              style={{
                padding: '10px 24px',
                backgroundColor: copied ? '#28a745' : '#378654',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicEventPage;

