import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import logo from './logo.svg';
import './App.css';

import Page1 from "./component/Page1";
import Page2 from "./component/Page2";
import Page3 from "./component/Page3";


const App = () => <BrowserRouter basename="/react-pipeline">
  <Routes>
    <Route path="/" element={<Page1 />} />
    <Route path="/page2" element={<Page2 />} />
    <Route path="/page3" element={<Page3 />} />
  </Routes>
</BrowserRouter>

export default App;





/*
<div className="App">
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <p>
      React TS + Vite
    </p>
  </header>
</div>
*/