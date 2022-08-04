import React, { useState } from 'react';

const Page3 = () => {
  const [someState] = useState(3);
  return <div>Page {someState}</div>;
};

export { Page3 };
