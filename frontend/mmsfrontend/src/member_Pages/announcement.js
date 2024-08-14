import React, { useState, useEffect } from 'react';
import './announcement.css'; // Ensure the correct path for CSS

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch announcements from backend
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('http://mms-0tpv.onrender.com/api/announcements');
        if (response.ok) {
          const data = await response.json();
          setAnnouncements(data);
        } else {
          console.error('Failed to fetch announcements');
        }
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchAnnouncements();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === announcements.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? announcements.length - 1 : prevIndex - 1
    );
  };

  if (announcements.length === 0) {
    // If no announcements, do not render the carousel
    return null;
  }

  return (
    <div className="announcements-page">
      <h1 className="announcements-title">Announcements</h1>
      <div className="carousel-container">
        <button className="carousel-btn prev-btn" onClick={handlePrev}>
          &#10094; {/* HTML Entity for left arrow */}
        </button>
        <div className="carousel-wrapper">
          <div
            className="carousel-content"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {announcements.map((announcement) => (
              <div className="announcement-card" key={announcement._id}>
                <div className="announcement-content">
                  <h2 className="announcement-title">{announcement.announcementTitle}</h2>
                  {/* Removed date display */}
                  <p className="announcement-description">
                    {announcement.announcementDetails}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className="carousel-btn next-btn" onClick={handleNext}>
          &#10095; {/* HTML Entity for right arrow */}
        </button>
      </div>
    </div>
  );
};

export default AnnouncementsPage;
