import React, { lazy, Suspense } from 'react';

const Page3 = lazy(() => import('./Page3'));

const LazyPage3 = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Page3 />
  </Suspense>
);

export { LazyPage3 };
