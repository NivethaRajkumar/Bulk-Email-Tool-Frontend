import React, { useState } from 'react';

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const backendURL = 'https://bulk-email-tool-backend-1-qe7h.onrender.com';

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${backendURL}/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        subject,
        message,
        imageUrl,
        linkUrl
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Handle success (e.g., show a success message, reset form, etc.)
      alert('Email sent successfully!');
      setEmail('');
      setSubject('');
      setMessage('');
      setImageUrl('');
      setLinkUrl('');
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle error (e.g., show an error message)
      alert('Failed to send email');
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Subject"
        required
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
        required
      ></textarea>
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL"
      />
      <input
        type="text"
        value={linkUrl}
        onChange={(e) => setLinkUrl(e.target.value)}
        placeholder="Link URL"
      />
      <button type="submit">Send Email</button>
    </form>
  );
};

export default EmailForm;
