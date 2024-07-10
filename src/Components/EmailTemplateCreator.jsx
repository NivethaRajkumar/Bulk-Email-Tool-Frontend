import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';

const EmailTemplateCreator = () => {
  const [templateContent, setTemplateContent] = useState('');
  const [subject, setSubject] = useState('');

  const handleTemplateChange = (event, editor) => {
    const data = editor.getData();
    setTemplateContent(data);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/templates', { subject, templateContent });
      alert('Template saved successfully');
    } catch (error) {
      alert('Failed to save template');
    }
  };

  return (
    <div className="container">
      <h2>Create Email Template</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            className="form-control"
            placeholder="Subject"
            value={subject}
            onChange={handleSubjectChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="templateContent">Template Content</label>
          <CKEditor
            editor={ClassicEditor}
            data={templateContent}
            onChange={handleTemplateChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Save Template</button>
      </form>
    </div>
  );
};

export default EmailTemplateCreator;