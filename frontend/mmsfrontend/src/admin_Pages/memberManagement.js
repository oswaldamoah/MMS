import React, { useState } from 'react';
import './memberManagement.css';

const MemberManagement = () => {
    const [members, setMembers] = useState([
        // Sample data
        { name: 'John Doe', contact: 'john.doe@example.com', dateJoined: '2023-01-01' },
        { name: 'Jane Smith', contact: 'jane.smith@example.com', dateJoined: '2023-02-15' },
    ]);

    const handleAddMember = () => {
        // Logic to add a member
    };

    const handleEditMember = (index) => {
        // Logic to edit a member
    };

    const handleDeleteMember = (index) => {
        const newMembers = members.filter((_, i) => i !== index);
        setMembers(newMembers);
    };

    return (
        <div className="container">
            <header className="header">
                <div className="logo">FFIM</div>
                <div className="profileIcon"></div>
            </header>
            <main>
                <h1 className="title">MEMBERS</h1>
                <div className="buttons">
                    <button className="editButton" onClick={handleEditMember}>ADD/EDIT</button>
                    <button className="deleteButton" onClick={handleDeleteMember}>DELETE</button>
                </div>
                <table className="memberTable">
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>CONTACT</th>
                            <th>DATE JOINED</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map((member, index) => (
                            <tr key={index}>
                                <td>{member.name}</td>
                                <td>{member.contact}</td>
                                <td>{member.dateJoined}</td>
                                <td>
                                    <button onClick={() => handleEditMember(index)}>Edit</button>
                                    <button onClick={() => handleDeleteMember(index)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default MemberManagement;
