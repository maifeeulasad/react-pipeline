import React from 'react';
import Layout from 'antd/lib/layout';
import PageHeader from 'antd/lib/page-header';
import { Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

interface ILayoutProps {
  children: any
}

// eslint-disable-next-line react/prefer-stateless-function
class CustomLayout extends React.Component<ILayoutProps> {
  render() {
    const { children } = this.props;

    return (
      <Layout>
        <Header style={{ backgroundColor: 'white' }}>
          <PageHeader
            className="site-page-header h-full"
            title="React Pipeline"
            subTitle="SPA using React + TS + Vite + Tailwind"
            extra={
              <>
                <Link to="/page2">Page 2</Link>
                <Link to="/page3">Page 3</Link>
              </>
            }
          />
        </Header>
        <Content>
          {children}
        </Content>
        <Footer style={{ backgroundColor: 'white' }}>
          <div className="text-center">
            &copy; Maifee Ul Asad
          </div>
        </Footer>
      </Layout>
    );
  }
}

export { CustomLayout };
