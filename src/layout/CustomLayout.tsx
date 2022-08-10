import React from 'react';
import Layout from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import Dropdown from 'antd/lib/dropdown';
import PageHeader from 'antd/lib/page-header';
import { Link, useNavigate } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';

import './CustomLayout.scss';

const { Header, Content, Footer } = Layout;

const CustomHeaderDropdownMenu = () => (
  <Menu
    items={[
      {
        key: '1',
        label: (
          <Link to="/page2">Page 2</Link>
        ),
      },
      {
        key: '2',
        label: (
          <Link to="/page3">Page 3</Link>
        ),
      },
    ]}
  />
);

const CustomHeader = () => {
  const navigate = useNavigate();
  return (
    <PageHeader
      className="site-page-header h-full"
      title="React Pipeline"
      subTitle="SPA using React + TS + Vite + Tailwind"
      onBack={() => navigate(-1)}
      extra={
        <Dropdown overlay={CustomHeaderDropdownMenu}>
          <DownOutlined />
        </Dropdown>
  }
    />
  );
};

const CustomFooter = () => (
  <div className="text-center">
    &copy; Maifee Ul Asad
  </div>
);

interface ILayoutProps {
  children: any
}

// eslint-disable-next-line react/prefer-stateless-function
class CustomLayout extends React.Component<ILayoutProps> {
  render() {
    const { children } = this.props;

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ backgroundColor: 'white' }}>
          <CustomHeader />
        </Header>
        <Content>
          {children}
        </Content>
        <Footer style={{ backgroundColor: 'white' }}>
          <CustomFooter />
        </Footer>
      </Layout>
    );
  }
}

export { CustomLayout };
