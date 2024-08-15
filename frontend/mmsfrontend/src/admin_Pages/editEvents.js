import React, { useState, useEffect } from 'react';
import './editEvents.css';
import AdminHeader from './AdminHeader.js';

const EditEvents = () => {
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [image, setImage] = useState(null); // Change to null for better handling of images
    const [registrationLink, setRegistrationLink] = useState('');
    const [events, setEvents] = useState([]);
    const [imageUploaded, setImageUploaded] = useState(false);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/events');
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleAddEvent = async (e) => {
        e.preventDefault();

        if (registrationLink && !isValidUrl(registrationLink)) {
            alert('Please enter a valid registration link.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('details', details);
        if (image) {
            formData.append('image', image); // Append the image file to the form data
        }
        formData.append('registrationLink', registrationLink);

        try {
            const response = await fetch('http://localhost:5000/api/events', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const savedEvent = await response.json();
                setEvents([...events, savedEvent]);
                setTitle('');
                setDetails('');
                setImage(null);
                setImageUploaded(false);
                setRegistrationLink('');
            } else {
                alert('Failed to save event');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/events/${eventId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const result = await response.json();
                alert(result.message);
                setEvents(events.filter((event) => event._id !== eventId));
            } else {
                const error = await response.json();
                alert(`Failed to delete event: ${error.message}`);
            }
        } catch (error) {
            console.error('Error deleting event:', error);
            alert('Failed to delete event');
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImageUploaded(true);
        } else {
            setImageUploaded(false);
        }
    };

    const isValidUrl = (url) => {
        const urlPattern = new RegExp('^(https?:\\/\\/)?'+
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+
            '((\\d{1,3}\\.){3}\\d{1,3}))'+
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
            '(\\?[;&a-z\\d%_.~+=-]*)?'+
            '(\\#[-a-z\\d_]*)?$','i');
        return !!urlPattern.test(url);
    };

    return (
        <div className="container">
            <AdminHeader headertitle={"Edit Events"} />
            <main>
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
                    <fieldset className="fieldset">
                        <legend className="legend">Registration Link (Optional)</legend>
                        <input
                            type="url"
                            className="input"
                            value={registrationLink}
                            onChange={(e) => setRegistrationLink(e.target.value)}
                            placeholder="https://example.com"
                        />
                    </fieldset>
                    <section className="buttonContainer">
                        <input
                            type="file"
                            id="importImage"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                        <label 
                            htmlFor="importImage" 
                            className={`importButton ${imageUploaded ? 'importButton--active' : ''}`}
                        >
                            IMPORT IMAGE
                        </label>
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
                            <th>REGISTRATION LINK</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event) => (
                            <tr key={event._id}>
                                <td>{event.eventName}</td>
                                <td>{new Date(event.createdAt).toLocaleString()}</td>
                                <td>
                                    {event.eventImage ? (
                                        <img src={`http://localhost:5000/api/events/image/${event._id}`} alt="Event" className="eventImage" />
                                    ) : (
                                        'No Image'
                                    )}
                                </td>
                                <td>
                                    {event.eventRegistrationLink ? (
                                        <a href={event.eventRegistrationLink} target="_blank" rel="noopener noreferrer">
                                            View Registration
                                        </a>
                                    ) : (
                                        'No Link'
                                    )}
                                </td>
                                <td>
                                    <button
                                        className="deleteButton"
                                        onClick={() => handleDeleteEvent(event._id)}
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
