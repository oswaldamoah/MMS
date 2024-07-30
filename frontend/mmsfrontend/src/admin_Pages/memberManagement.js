import React, { useState } from 'react';
import './memberManagement.css';
import './AdminHeader.js';
import AdminHeader from './AdminHeader.js';

const MemberManagement = () => {
    const [members, setMembers] = useState([
        // Sample data
        { name: 'John Doe', contact: 'john.doe@example.com', dateJoined: '2023-01-01' },
        { name: 'Jane Smith', contact: 'jane.smith@example.com', dateJoined: '2023-02-15' },
    ]);
    const [editingIndex, setEditingIndex] = useState(null);

    const handleAddMember = () => {
        const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
        setMembers([...members, { name: '', contact: '', dateJoined: currentDate }]);
    };

    const handleEditMember = (index) => {
        setEditingIndex(index);
    };

    const handleSaveMember = (index) => {
        setEditingIndex(null);
    };

    const handleDeleteMember = (index) => {
        const newMembers = members.filter((_, i) => i !== index);
        setMembers(newMembers);
    };

    const handleInputChange = (index, field, value) => {
        const newMembers = members.map((member, i) => 
            i === index ? { ...member, [field]: value } : member
        );
        setMembers(newMembers);
    };

    return (
        <div className="container">
            <AdminHeader headertitle={"Members"} />
            <main>     
                <div className="buttons">
                    <button className="editButton" onClick={handleAddMember}>ADD</button>
                </div>
                <table className="memberTable">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>NAME</th>
                            <th>CONTACT</th>
                            <th>DATE JOINED</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map((member, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td contentEditable={editingIndex === index} onBlur={(e) => handleInputChange(index, 'name', e.target.textContent)}>
                                    {member.name}
                                </td>
                                <td contentEditable={editingIndex === index} onBlur={(e) => handleInputChange(index, 'contact', e.target.textContent)}>
                                    {member.contact}
                                </td>
                                <td>
                                    {member.dateJoined}
                                </td>
                                <td>
                                    {editingIndex === index ? (
                                        <button className="saveButton" onClick={() => handleSaveMember(index)}>Save</button>
                                    ) : (
                                        <button className="editButton" onClick={() => handleEditMember(index)}>Edit</button>
                                    )}
                                    <button className="deleteButton" onClick={() => handleDeleteMember(index)}>Delete</button>
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
