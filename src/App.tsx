import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import { Landing } from './component/landing/Landing';
import { Page2 } from './component/Page2';
import { Page3 } from './component/Page3';

function App() {
  return (
    <BrowserRouter basename="/react-pipeline">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/page2" element={<Page2 />} />
        <Route path="/page3" element={<Page3 />} />
      </Routes>
    </BrowserRouter>
  );
}

export { App };
