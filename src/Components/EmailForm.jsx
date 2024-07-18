import React, { useState } from 'react';
import axios from 'axios';

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [feedback, setFeedback] = useState('');

  const backendURL = process.env.REACT_APP_BACKEND_URL;

  if (!backendURL) {
    console.error('Backend URL not set. Please set REACT_APP_BACKEND_URL in your environment variables.');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback('');

    try {
      const response = await axios.post(`${backendURL}/send-email`, {
        email,
        subject,
        message,
        imageUrl,
        linkUrl,
      });

      setFeedback('Email sent successfully!');
      console.log('Success:', response.data);
    } catch (error) {
      setFeedback('Failed to send email. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Subject:</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Message:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
      </div>
      <div>
        <label>Image URL:</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <div>
        <label>Link URL:</label>
        <input
          type="text"
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
        />
      </div>
      <button type="submit">Send Email</button>
      {feedback && <p>{feedback}</p>}
    </form>
  );
};

export default EmailForm;