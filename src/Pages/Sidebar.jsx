import React from 'react';

const Sidebar = ({ sendType, handleSendTypeChange }) => {
  return (
    <div className="list-group">
      <button
        className={`list-group-item list-group-item-action ${sendType === 'individual' ? 'active' : ''}`}
        value="individual"
        onClick={handleSendTypeChange}
      >
        Single User
      </button>
      <button
        className={`list-group-item list-group-item-action ${sendType === 'bulk' ? 'active' : ''}`}
        value="bulk"
        onClick={handleSendTypeChange}
      >
        Multiple Users
      </button>
    </div>
  );
};

export default Sidebar;
