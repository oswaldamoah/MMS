import React, { useState, useEffect } from 'react';
import './memberManagement.css';
import AdminHeader from './AdminHeader.js';

const MemberManagement = () => {
  const [members, setMembers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/members');
        if (response.ok) {
          const membersData = await response.json();
          setMembers(membersData);
        } else {
          console.error('Error fetching members:', response.statusText);
          alert('Error fetching members. Please try again later.');
        }
      } catch (error) {
        console.error('Error fetching members:', error);
        alert('Error fetching members. Please try again later.');
      }
    };

    fetchMembers();
  }, []);

  const handleCopyContacts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/members/contacts');
      if (response.ok) {
        const data = await response.json();
        if (data.contacts.length > 0) {
          const contactsString = data.contacts.join('\n'); // Join contacts with new lines
          await navigator.clipboard.writeText(contactsString); // Copy to clipboard
          alert('Contacts copied to clipboard!');
        } else {
          alert('No contacts available to copy.');
        }
      } else {
        console.error('Error fetching contacts:', response.statusText);
        alert('Error fetching contacts. Please try again later.');
      }
    } catch (error) {
      console.error('Error copying contacts:', error);
      alert('Error copying contacts. Please try again later.');
    }
  };
  

  const handleAddMember = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    const newMember = { _id: null, name: '', contact: '', dateJoined: currentDate };
    setMembers([...members, newMember]);
    setEditingIndex(members.length);
  };

  const handleSaveMember = async (index) => {
    const member = members[index];
    try {
      let response;
      if (member._id) {
        response = await fetch(`http://localhost:5000/api/members/${member._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(member)
        });
      } else {
        response = await fetch('http://localhost:5000/api/members', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(member)
        });
      }

      if (response.ok) {
        const savedMember = await response.json();
        const updatedMembers = [...members];
        updatedMembers[index] = savedMember.member;
        setMembers(updatedMembers);
        setEditingIndex(null);
        alert('Member saved successfully!');
      } else {
        console.error('Error saving member:', response.statusText);
        alert('Error saving member. Please try again later.');
      }
    } catch (error) {
      console.error('Error saving member:', error);
      alert('Error saving member. Please try again later.');
    }
  };

  const handleDeleteMember = async (index) => {
    const member = members[index];
    try {
      const response = await fetch(`http://localhost:5000/api/members/${member._id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        const updatedMembers = members.filter((_, i) => i !== index);
        setMembers(updatedMembers);
        alert('Member deleted successfully!');
      } else {
        console.error('Error deleting member:', response.statusText);
        alert('Error deleting member. Please try again later.');
      }
    } catch (error) {
      console.error('Error deleting member:', error);
      alert('Error deleting member. Please try again later.');
    }
  };

  const handleInputChange = (e, index, field) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = e.target.value;
    setMembers(updatedMembers);
  };

  return (
    <div className="container">
      <AdminHeader headertitle="Members"/>
      <main>
        <div className="buttons">
          <button className="saveButton" onClick={handleAddMember}>Add</button>
          <button className="copyButton" onClick={handleCopyContacts}>Copy Contacts</button> {/* New button for copying contacts */}
        </div>
        <div className="table-container">
          <table className="memberTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Date Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member, index) => (
                <tr key={index}>
                  <td>
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => handleInputChange(e, index, 'name')}
                      />
                    ) : (
                      member.name
                    )}
                  </td>
                  <td>
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={member.contact}
                        onChange={(e) => handleInputChange(e, index, 'contact')}
                      />
                    ) : (
                      member.contact
                    )}
                  </td>
                  <td>
                    {editingIndex === index ? (
                      <input
                        type="date"
                        value={member.dateJoined}
                        onChange={(e) => handleInputChange(e, index, 'dateJoined')}
                      />
                    ) : (
                      member.dateJoined
                    )}
                  </td>
                  <td>
                    {editingIndex === index ? (
                      <button className="saveButton" onClick={() => handleSaveMember(index)}>Save</button>
                    ) : (
                      <button className="editButton" onClick={() => setEditingIndex(index)}>Edit</button>
                    )}
                    <button className="deleteButton" onClick={() => handleDeleteMember(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default MemberManagement;
