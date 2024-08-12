import React from 'react';
import MemberHeader from './MemberHeader';// Import the MemberHeader component
import './Events.css'; // Import the CSS for styling

const eventsData = [
  {
    image: "/events1.jpeg",
    title: "Church Concert",
    description: "There will be an event on the 20th of this month. Do well to attend.",
    link: "#"
  },
  {
    image: "/events2.jpeg",
    title: "Church Anniversary",
    description: "There will be an event on the 20th of this month. Do well to attend.",
    link: "#"
  },
  {
    image: "/events3.jpeg",
    title: "Gospel Night",
    description: "There will be an event on the 20th of this month. Do well to attend.",
    link: "#"
  },
  {
    image: "/events4.jpeg",
    title: "Culture fest",
    description: "There will be an event on the 20th of this month. Do well to attend.",
    link: "#"
  },
  {
    image: "/events5.jpg",
    title: "Church Summit",
    description: "There will be an event on the 20th of this month. Do well to attend.",
    link: "#"
  },
  {
    image: "/events6.jpg",
    title: "Songs Of Deliverance",
    description: "There will be an event on the 20th of this month. Do well to attend.",
    link: "#"
  },
  {
    image: "/events7.jpg",
    title: "Worship",
    description: "There will be an event on the 20th of this month. Do well to attend.",
    link: "#"
  },
  {
    image: "/events8.jpg",
    title: "Church Bible Studies",
    description: "There will be an event on the 20th of this month. Do well to attend.",
    link: "#"
  },
];

const Events = () => {
  return (
    <div className="events-page">
      <MemberHeader headertitle="Events" /> {/* Include the header */}
      <div className="events-container">
        <h1>Events</h1>
        <div className="events-grid">
          {eventsData.map((event, index) => (
            <div key={index} className="event-card">
              <img src={event.image} alt={event.title} className="event-image" />
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <a href={event.link}>Click here to register</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
