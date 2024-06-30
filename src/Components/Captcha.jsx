import React, { useState, useEffect } from 'react';

const generateCaptcha = () => {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let captcha = '';
  for (let i = 0; i < 6; i++) {
    captcha += chars[Math.floor(Math.random() * chars.length)];
  }
  return captcha;
};

const Captcha = ({ onChange }) => {
  const [captcha, setCaptcha] = useState('');

  useEffect(() => {
    const newCaptcha = generateCaptcha();
    setCaptcha(newCaptcha);
    onChange(newCaptcha);
  }, [onChange]);

  const refreshCaptcha = () => {
    const newCaptcha = generateCaptcha();
    setCaptcha(newCaptcha);
    onChange(newCaptcha);
  };

  return (
    <div>
      <div style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '3px', userSelect: 'none' }}>
        {captcha}
      </div>
      <button type="button" onClick={refreshCaptcha}>Refresh Captcha</button>
    </div>
  );
};

export default Captcha;
