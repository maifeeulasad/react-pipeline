import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { CustomLayout } from './layout/CustomLayout';
import { LazyLanding } from './component/landing/LazyLanding';
import { LazyPage2 } from './component/LazyPage2';
import { LazyPage3 } from './component/LazyPage3';

const App = () => (
  <BrowserRouter basename="/react-pipeline">
    <CustomLayout>
      <Routes>
        <Route path="/landing" element={<LazyLanding />} />
        <Route path="/page2" element={<LazyPage2 />} />
        <Route path="/page3" element={<LazyPage3 />} />
        <Route
          path="*"
          element={<Navigate to="/landing" replace />}
        />
      </Routes>
    </CustomLayout>
  </BrowserRouter >
);

// eslint-disable-next-line import/no-default-export
export default App;
