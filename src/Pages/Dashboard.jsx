import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sendType, setSendType] = useState('individual');
  const [imageUrl, setImageUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

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

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleLinkUrlChange = (e) => {
    setLinkUrl(e.target.value);
  };

  const handleSendTypeChange = (type) => {
    setSendType(type);
    setEmail('');
    setSubject('');
    setMessage('');
    setFile(null);
    setImageUrl('');
    setLinkUrl('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('message', message);
    formData.append('imageUrl', imageUrl);
    formData.append('linkUrl', linkUrl); 
    if (sendType === 'individual') {
      formData.append('email', email);
    } else if (sendType === 'bulk') {
      formData.append('file', file);
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/send-email`, formData);
      alert(res.data.message);
      
      setEmail('');
      setSubject('');
      setMessage('');
      setFile(null);
      setImageUrl('');
      setLinkUrl('');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email');
    }
  };

  return (
    <div className="container">
      <h2>Send Email</h2>
      <form onSubmit={handleSubmit}>
        {sendType === 'individual' && (
          <input
            type="email"
            className="form-control mb-2"
            placeholder="Recipient Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        )}
        {sendType === 'bulk' && (
          <input
            type="file"
            className="form-control-file mb-2"
            onChange={handleFileChange}
            required
          />
        )}
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Subject"
          value={subject}
          onChange={handleSubjectChange}
          required
        />
        <textarea
          className="form-control mb-2"
          placeholder="Message"
          value={message}
          onChange={handleMessageChange}
          required
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Image URL"
          value={imageUrl}
          onChange={handleImageUrlChange}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Link URL"
          value={linkUrl}
          onChange={handleLinkUrlChange}
        />
        <div>
          <button type="submit" className="btn btn-primary mr-2">Send</button>
          <button
            type="button"
            className={`btn ${sendType === 'individual' ? 'btn-primary' : 'btn-secondary'} ml-2`}
            onClick={() => handleSendTypeChange('individual')}
          >
            Single User
          </button>
          <button
            type="button"
            className={`btn ${sendType === 'bulk' ? 'btn-primary' : 'btn-secondary'} ml-2`}
            onClick={() => handleSendTypeChange('bulk')}
          >
            Multiple Users
          </button>
        </div>
      </form>
    </div>
  );
};

export default Dashboard;