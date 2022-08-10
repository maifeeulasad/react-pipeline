import React from 'react';

import styles from './Landing.module.scss';

import logo from './landing.svg';

const Landing = () => (
  <div>

    <header>
      <img src={logo} className="animate-spin h-10" alt="logo" />
      <div className="text-red-600">
        React + TS + Vite + Tailwind
      </div>
      <div className={styles.sassExample}>
        node-sass is here for styling
      </div>
    </header>
  </div>
);

export { Landing };
