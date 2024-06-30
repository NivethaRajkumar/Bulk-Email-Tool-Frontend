import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sendType, setSendType] = useState('individual');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendTypeChange = (type) => {
    setSendType(type);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (sendType === 'individual') {
      try {
        const res = await axios.post('http://localhost:8000/send-email', { email, subject, message });
        alert(res.data.message);
        window.location.reload(); 
      } catch (error) {
        alert('Failed to send email');
      }
    } else {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await axios.post('http://localhost:8000/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert(res.data.message);
        window.location.reload(); 
      } catch (error) {
        alert('Upload failed');
      }
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <button
                  className={`nav-link btn ${sendType === 'individual' ? 'active' : ''}`}
                  onClick={() => handleSendTypeChange('individual')}
                >
                  Single User
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link btn ${sendType === 'bulk' ? 'active' : ''}`}
                  onClick={() => handleSendTypeChange('bulk')}
                >
                  Multiple Users
                </button>
              </li>
            </ul>
          </div>
        </nav>

        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <h2>Dashboard</h2>
          <form onSubmit={handleSubmit}>
            {sendType === 'individual' ? (
              <div>
                <div className="form-group">
                  <label htmlFor="email">Recipient Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder=""
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    className="form-control"
                    placeholder=""
                    value={subject}
                    onChange={handleSubjectChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    className="form-control"
                    placeholder=""
                    value={message}
                    onChange={handleMessageChange}
                    required
                  />
                </div>
              </div>
            ) : (
              <div className="form-group">
                <label htmlFor="file">Upload File</label>
                <input
                  type="file"
                  id="file"
                  className="form-control-file"
                  onChange={handleFileChange}
                  required
                />
              </div>
            )}
            
            <button type="submit" className="btn btn-primary">Send</button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;