import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');
  };

  return (
    <div className="container text-center mt-5">
      <div className="jumbotron">
        <h1 className="display-4">Welcome to Message Transmitter</h1>
        <button className="btn btn-primary btn-lg" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
      </div>
  );
};

export default Home;
