import React from 'react';

import styles from './Landing.module.scss';

import logo from './landing.svg';
import { usePersistentState } from '../../state/state';

const ComponentIncrement = () => {
  const [count, setCount] = usePersistentState('app/counter', 0);
  return (
    <div style={{ marginBottom: '1rem' , border: '1px solid black', padding: '1rem' }}>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <div>Count: {count}</div>
    </div>
  );
}

const ComponentDecrement = () => {
  const [count, setCount] = usePersistentState('app/counter', 0);
  return (
    <div style={{ marginBottom: '1rem' , border: '1px solid black', padding: '1rem' }}>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
      <div>Count: {count}</div>
    </div>
  );
}

const ComponentRandom = () => {
  const [random, setRandom] = usePersistentState('app/counter', 0);
  return (
    <div style={{ marginBottom: '1rem' , border: '1px solid black', padding: '1rem' }}>
      <button onClick={() => setRandom(Math.random())}>
        Set Random
      </button>
      <div>Count: {random}</div>
    </div>
  );
}

const ComponentOnlyRead = () => {
  const [count] = usePersistentState('app/counter', 0);
  return (
    <div style={{ marginBottom: '1rem' , border: '1px solid black', padding: '1rem' }}>
      <div>Count: {count}</div>
    </div>
  );
}

const Landing = () => (
  <div>

    <header>
      <img src={logo} className="animate-spin h-10" alt="logo" />
      <div className="text-red-600">
        React + TS + Vite + Tailwind
      </div>
      <div className={styles.sassExample}>
        sass is here for styling
      </div>
      <div>
        <div style={{display:'flex'}}>
          <ComponentIncrement />
          {/* <ComponentDecrement /> */}
        </div>
        <div style={{display:'flex'}}>
          {/* <ComponentRandom /> */}
          {/* <ComponentOnlyRead /> */}
        </div>
      </div>
    </header>
  </div>
);

// eslint-disable-next-line import/no-default-export
export default Landing;
