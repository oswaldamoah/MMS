// AnnouncementsPage.js

import React, { useState } from 'react';
import './announcement.css'; // Ensure the correct path for CSS

const AnnouncementsPage = () => {
  // Sample data for announcements
  const announcements = [
    {
      title: 'Church Picnic',
      date: 'August 5, 2024',
      description:
        'Join us for a fun-filled church picnic at the community park. Bring your friends and family!',
    },
    {
      title: 'Bible Study Group',
      date: 'Every Wednesday at 7 PM',
      description:
        'Join our weekly Bible study group to deepen your understanding of scripture and strengthen your faith.',
    },
    {
      title: 'Charity Event',
      date: 'September 10, 2024',
      description:
        'Participate in our annual charity event to help support local families in need. Donations are welcome.',
    },
    {
      title: 'Youth Retreat',
      date: 'October 15-17, 2024',
      description:
        'A weekend retreat for youth ages 13-18. Enjoy spiritual growth, activities, and fellowship.',
    },
  ];

  // State to track the current announcement index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to handle the next button click
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === announcements.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to handle the previous button click
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? announcements.length - 1 : prevIndex - 1
    );
  };

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
            {announcements.map((announcement, index) => (
              <div className="announcement-card" key={index}>
                <div className="announcement-content">
                  <h2 className="announcement-title">{announcement.title}</h2>
                  <p className="announcement-date">{announcement.date}</p>
                  <p className="announcement-description">
                    {announcement.description}
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
