import React from 'react';

// @ts-ignore
import { usePersistentState } from 'persistent-state-react';
import styles from './Landing.module.scss';

import logo from './landing.svg';

const Landing = () => {
  const [count1, setCount] = usePersistentState<number>('global/counter', 0);

  const [count2] = usePersistentState('global/counter', 0);

  return (
    <div style={{ textAlign: 'center' }}>
      <header>
        <img src={logo} className="animate-spin h-10 mx-auto" alt="logo" />
        <div className="text-red-600">
          React + TS + Vite + Tailwind
        </div>
        <div className={styles.sassExample}>
          sass is here for styling
        </div>
        <div style={{ border: '1px solid red', padding: '10px' }}>
          <p>
            global/counter state from variable 1
            <button
              type="button"
              onClick={() => setCount(count1 + 1)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Count 1: {count1}
            </button>
          </p>
          <p>
            global/counter state from variable 2
            <button
              type="button"
              onClick={() => setCount(count2 + 1)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Count 2: {count2}
            </button>
          </p>
        </div>
      </header>
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default Landing;
