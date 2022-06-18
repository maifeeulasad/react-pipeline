import React from 'react'
import { PageHeader } from 'antd';
import {
  Link,
} from "react-router-dom";


import logo from './landing.svg';
import './Landing.css';

const Landing = () => <div className="App">
  <PageHeader
    className="site-page-header"
    title="Title"
    subTitle="This is a subtitle"
    extra={<><Link to="/page2">Page 2</Link><Link to="/page3">Page 3</Link></>}
  />
<header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <p>
    React TS + Vite
  </p>
</header>
</div>

export default Landing;