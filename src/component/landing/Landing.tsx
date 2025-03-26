import React from 'react';

import styles from './Landing.module.scss';

import logo from './landing.svg';

const Landing = () => (
  <div style={{ textAlign: 'center' }}>
    <header>
      <img src={logo} className="animate-spin h-10 mx-auto" alt="logo" />
      <div className="text-red-600">
        React + TS + Vite + Tailwind
      </div>
      <div className={styles.sassExample}>
        sass is here for styling
      </div>
    </header>
  </div>
);

// eslint-disable-next-line import/no-default-export
export default Landing;
