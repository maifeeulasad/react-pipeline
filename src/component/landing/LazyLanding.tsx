import React, { lazy, Suspense } from 'react';

const Landing = lazy(() => import('./Landing'));

const LazyLanding = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Landing />
  </Suspense>
);

export { LazyLanding };
