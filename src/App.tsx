import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import enUS from 'antd/locale/en_US';
// @ts-ignore
import { usePersistentState } from 'persistent-state-react';

import { CustomLayout } from './layout/CustomLayout';
import { LazyLanding } from './component/landing/LazyLanding';
import { LazyPage2 } from './component/LazyPage2';
import { LazyPage3 } from './component/LazyPage3';

const App = () => {
  const [isDark, setIsDark] = usePersistentState<boolean>('global/theme', false);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ConfigProvider
      locale={enUS}
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <BrowserRouter basename="/react-pipeline">
        <CustomLayout isDark={isDark} toggleTheme={toggleTheme}>
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
      </BrowserRouter>
    </ConfigProvider>
  );
};

// eslint-disable-next-line import/no-default-export
export default App;
