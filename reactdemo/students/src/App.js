import React, { useState, useEffect } from 'react';
import './App.css';

const StudentDetails = () => {
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentAddress, setStudentAddress] = useState('');
  const [students, setStudents] = useState([]);
  const [expandedStudentId, setExpandedStudentId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/students');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleAdd = async () => {
    if (studentName && studentEmail && studentAddress) {
      const newStudent = { studentName, studentEmail, studentAddress };
      try {
        const response = await fetch('http://localhost:8080/api/students', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newStudent),
        });

        if (response.ok) {
          fetchStudents(); // Refresh the list after adding a new student
          setStudentName('');
          setStudentEmail('');
          setStudentAddress('');
        } else {
          console.error('Failed to add student:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding student:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/students/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchStudents(); // Refresh the list after deleting a student
      } else {
        console.error('Failed to delete student:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const toggleDetails = (id) => {
    setExpandedStudentId(expandedStudentId === id ? null : id);
  };

  const isAddButtonActive = studentName && studentEmail && studentAddress;

  return (
    <div className="student-details-container">
      <h1>Employee Details</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={studentEmail}
          onChange={(e) => setStudentEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={studentAddress}
          onChange={(e) => setStudentAddress(e.target.value)}
        />
      </div>
      <button
        className={`add-button ${isAddButtonActive ? 'active' : ''}`}
        onClick={handleAdd}
        disabled={!isAddButtonActive}
      >
        Add
      </button>
      <div className="student-list">
        {students.map((student) => (
          <div key={student.id} className="student-item">
            <div
              className="student-name"
              onClick={() => toggleDetails(student.id)}
            >
              {student.studentName}
            </div>
            {expandedStudentId === student.id && (
              <div className="student-details">
                <p><strong>Email:</strong> {student.studentEmail}</p>
                <p><strong>Address:</strong> {student.studentAddress}</p>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(student.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDetails;
