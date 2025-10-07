import React from 'react';

import Package from '../../package.json';
import bg from './assets/cover_home.png';
import './introduction.css';

export const Introduction = () => {
  if (
    localStorage.getItem('themeSelected') === null ||
    localStorage.getItem('themeSelected') === undefined ||
    localStorage.getItem('themeSelected') === '' ||
    localStorage.getItem('themeSelected') !== 'kubit'
  ) {
    localStorage.setItem('themeSelected', 'kubit');
  }

  return (
    <div
      className="welcome__container"
      style={{
        background: `url(${bg}) no-repeat center center fixed`,
        backgroundSize: 'cover',
      }}
    >
      <div className="welcome-text-container">
        <h2 className="welcome_title">Kubit | web-charts</h2>
        <h4 className="welcome_version">{`v.${Package.version}`}</h4>
      </div>
    </div>
  );
};
