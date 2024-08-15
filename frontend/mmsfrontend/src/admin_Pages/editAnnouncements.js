import React, { useState, useEffect } from 'react';
import './editAnnouncements.css';
import AdminHeader from './AdminHeader';

// Utility function to format date
const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleString('en-GB', options).replace(',', '');
};

const EditAnnouncements = () => {
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        // Fetch announcements when the component mounts
        const fetchAnnouncements = async () => {
            try {
                const response = await fetch('https://mms-0tpv.onrender.com/api/announcements');
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

    const handleAddAnnouncement = async (e) => {
        e.preventDefault();
        const newAnnouncement = {
            title,
            details,
            date: new Date().toISOString(), // Use ISO format for consistency
        };

        try {
            const response = await fetch('https://mms-0tpv.onrender.com/api/announcements', {
                method: 'POST',
                body: JSON.stringify(newAnnouncement),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const savedAnnouncement = await response.json();
                setAnnouncements([...announcements, savedAnnouncement]);
                setTitle('');
                setDetails('');
            } else {
                console.error('Failed to save announcement');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDeleteAnnouncement = async (id) => {
        try {
            const response = await fetch(`https://mms-0tpv.onrender.com/api/announcements/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Update the state to remove the deleted announcement
                const newAnnouncements = announcements.filter(announcement => announcement._id !== id);
                setAnnouncements(newAnnouncements);
            } else {
                console.error('Failed to delete announcement');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container">
            <AdminHeader headertitle='Edit Announcements' />
    
            <main>
                <h1 className="title"></h1>
                <form className="form" onSubmit={handleAddAnnouncement}>
                    <fieldset className="fieldset">
                        <legend className="legend">Announcement Title</legend>
                        <input
                            type="text"
                            className="input"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="legend">Announcement Details</legend>
                        <textarea
                            className="textarea"
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            required
                        ></textarea>
                    </fieldset>
                    <section className="buttonContainer">
                        <button type="submit" className="saveButton">SAVE</button>
                    </section>
                </form>
                <h2 className="announcementTitle">ANNOUNCEMENTS</h2>
                <table className="announcementTable">
                    <thead>
                        <tr>
                            <th>TITLE</th>
                            <th>DATE ADDED</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {announcements.map((announcement) => (
                            <tr key={announcement._id}>
                                <td>{announcement.announcementTitle}</td>
                                <td>{formatDate(announcement.createdAt)}</td>
                                <td>
                                    <button
                                        className="deleteButton"
                                        onClick={() => handleDeleteAnnouncement(announcement._id)}
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

export default EditAnnouncements;
