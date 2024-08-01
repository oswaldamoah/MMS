import React, { useState } from 'react';
import './editAnnouncements.css';
import AdminHeader from './AdminHeader';
<AdminHeader headertitle={"Members"} />


const EditAnnouncements = () => {
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [image, setImage] = useState(null);
    const [announcements, setAnnouncements] = useState([]);

    const handleAddAnnouncement = (e) => {
        e.preventDefault();
        const newAnnouncement = {
            title,
            details,
            date: new Date().toLocaleDateString(),
            image,
        };
        setAnnouncements([...announcements, newAnnouncement]);
        setTitle('');
        setDetails('');
        setImage(null);
    };

    const handleDeleteAnnouncement = (index) => {
        const newAnnouncements = announcements.filter((_, i) => i !== index);
        setAnnouncements(newAnnouncements);
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
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
                <h2 className="announcementTitle">ANNOUNCEMENTS</h2>
                <table className="announcementTable">
                    <thead>
                        <tr>
                            <th>TITLE</th>
                            <th>DATE ADDED</th>
                            <th>IMAGE</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {announcements.map((announcement, index) => (
                            <tr key={index}>
                                <td>{announcement.title}</td>
                                <td>{announcement.date}</td>
                                <td>
                                    {announcement.image && (
                                        <img src={announcement.image} alt="Announcement" className="announcementImage" />
                                    )}
                                </td>
                                <td>
                                    <button
                                        className="deleteButton"
                                        onClick={() => handleDeleteAnnouncement(index)}
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