import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmailTemplateCreator from '../Components/EmailTemplateCreator';

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sendType, setSendType] = useState('individual');
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');
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
    setSelectedTemplate('');
    setEmail('');
    setSubject('');
    setMessage('');
    setFile(null);
    setImageUrl('');
    setLinkUrl('');
  };

  const handleTemplateChange = (e) => {
    const templateId = e.target.value;
    setSelectedTemplate(templateId);
    const template = templates.find(t => t._id === templateId);
    if (template) {
      setSubject(template.subject);
      setMessage(template.content);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (sendType === 'individual') {
      formData.append('email', email);
    }
    formData.append('subject', subject);
    formData.append('message', message);
    formData.append('imageUrl', imageUrl);
    formData.append('linkUrl', linkUrl);
    if (file) {
      formData.append('file', file);
    }

    try {
      const res = await axios.post(`http://localhost:8000/send-email?sendType=${sendType}`, formData);
      alert(res.data.message);
      window.location.reload(); // Reload the page after a successful response
    } catch (error) {
      alert('Failed to send email');
    }
  };

  const fetchTemplates = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/templates');
      setTemplates(response.data);
    } catch (error) {
      alert('Failed to fetch templates');
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

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
          <div className="row">
            <div className="col-md-6">
              <h3>Create Template</h3>
              <EmailTemplateCreator />
            </div>
            <div className="col-md-6">
              <form onSubmit={handleSubmit}>
                {sendType === 'individual' && (
                  <>
                    {/* <select className="form-control" value={selectedTemplate} onChange={handleTemplateChange}>
                      <option value="">Select a template</option>
                      {templates.map(template => (
                        <option key={template._id} value={template._id}>{template.subject}</option>
                      ))}
                    </select> */}
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Recipient Email"
                      value={email}
                      onChange={handleEmailChange}
                      required
                    />
                  </>
                )}
                <input
                  type="text"
                  className="form-control"
                  placeholder="Subject"
                  value={subject}
                  onChange={handleSubjectChange}
                  required
                />
                <textarea
                  className="form-control"
                  placeholder="Message"
                  value={message}
                  onChange={handleMessageChange}
                  required
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Image URL"
                  value={imageUrl}
                  onChange={handleImageUrlChange}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Link URL"
                  value={linkUrl}
                  onChange={handleLinkUrlChange}
                />
                <input
                  type="file"
                  onChange={handleFileChange}
                />
                <button type="submit" className="btn btn-primary">Send</button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;