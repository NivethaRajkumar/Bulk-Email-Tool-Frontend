import React, { useState } from 'react';
import axios from 'axios';

const SendEmail = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [file, setFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('message', message);
    formData.append('imageUrl', imageUrl);
    formData.append('linkUrl', linkUrl);
    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/send-email`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResponseMessage('Email sent successfully!');
    } catch (error) {
      setResponseMessage(`Error sending email: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  return (
    <div className="container">
      <h2>Send Email</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            className="form-control"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            className="form-control"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            className="form-control"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="linkUrl">Link URL</label>
          <input
            type="text"
            id="linkUrl"
            className="form-control"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="file">File</label>
          <input
            type="file"
            id="file"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Send Email</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default SendEmail;
