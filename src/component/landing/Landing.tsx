import React from 'react';

// import './Landing.css';

import logo from './landing.svg';

const Landing = () => (
  <div>

    <header>
      <img src={logo} className="animate-spin h-10" alt="logo" />
      <div className="text-red-600">
        React + TS + Vite + Tailwind
      </div>
    </header>
  </div>
);

export { Landing };
