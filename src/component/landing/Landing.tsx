import React from 'react'
import { PageHeader } from 'antd';
import {
  Link,
} from "react-router-dom";

// import './Landing.css';

import logo from './landing.svg';

const Landing = () => <div>
  <PageHeader
    className="site-page-header"
    title="Title"
    subTitle="This is a subtitle"
    extra={<><Link to="/page2">Page 2</Link><Link to="/page3">Page 3</Link></>}
  />
<header>
  <img src={logo} className="animate-spin h-10" alt="logo" />
  <div className='text-red-600'>
    React TS + Vite
  </div>
</header>
</div>

export default Landing;