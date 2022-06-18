import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


import Landing from "./component/landing/Landing";
import Page2 from "./component/Page2";
import Page3 from "./component/Page3";


const App = () => <BrowserRouter>
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/page2" element={<Page2 />} />
    <Route path="/page3" element={<Page3 />} />
  </Routes>
</BrowserRouter>

export default App;