import React, { useState } from 'react';
import './editEvents.css';

const EditEvents = () => {
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [image, setImage] = useState(null);
    const [events, setEvents] = useState([]);

    const handleAddEvent = (e) => {
        e.preventDefault();
        const newEvent = {
            title,
            details,
            date: new Date().toLocaleDateString(),
            image,
        };
        setEvents([...events, newEvent]);
        setTitle('');
        setDetails('');
        setImage(null);
    };

    const handleDeleteEvent = (index) => {
        const newEvents = events.filter((_, i) => i !== index);
        setEvents(newEvents);
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    return (
        <div className="container">
            <header className="header">
                <span className="logo">
                <img src="/logo1.png" alt="FFIM Logo" className="ffim-logo" /> 
                </span>
                <div className="profileIcon"></div>
            </header>
            <main>
                <h1 className="title">EDIT EVENTS</h1>
                <form className="form" onSubmit={handleAddEvent}>
                    <fieldset className="fieldset">
                        <legend className="legend">Event Title</legend>
                        <input
                            type="text"
                            className="input"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="legend">Event Details</legend>
                        <textarea
                            className="textarea"
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            required
                        ></textarea>
                    </fieldset>
                    <section className="buttonContainer">
                        <input
                            type="file"
                            id="importImage"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                        <label htmlFor="importImage" className="importButton">IMPORT IMAGE</label>
                        <button type="submit" className="saveButton">SAVE</button>
                    </section>
                </form>
                <h2 className="eventTitle">EVENTS</h2>
                <table className="eventTable">
                    <thead>
                        <tr>
                            <th>TITLE</th>
                            <th>DATE ADDED</th>
                            <th>IMAGE</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event, index) => (
                            <tr key={index}>
                                <td>{event.title}</td>
                                <td>{event.date}</td>
                                <td>
                                    {event.image && (
                                        <img src={event.image} alt="Event" className="eventImage" />
                                    )}
                                </td>
                                <td>
                                    <button
                                        className="deleteButton"
                                        onClick={() => handleDeleteEvent(index)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default EditEvents;
