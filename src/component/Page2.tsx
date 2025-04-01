import React from 'react';
import { usePersistentState } from '../state/state';

const Page2 = () => {
  const [countInDifferentPage] = usePersistentState('global/counter', 0);

  return (
    <div>
      Page 2
      <div style={{ border: '1px solid red', padding: '10px' }}>
        global/counter state: {countInDifferentPage}
      </div>
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default Page2;
