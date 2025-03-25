import React from 'react';
import Layout from 'antd/lib/layout';
import { PageHeader } from '@ant-design/pro-layout';
import { Link, useNavigate } from 'react-router-dom';
import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

const { Header, Content, Footer } = Layout;

import { useTranslation, initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translation: {
          "title": "React Pipeline",
          "sub-title": "SPA using React + TS + Vite + Tailwind",
        }
      },
      bn: {
        translation: {
          "title": "React Pipeline",
          "sub-title": "React + TS + Vite + Tailwind ব্যবহার করে SPA",
        }
      }
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

const CustomHeader = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <PageHeader
      className="site-page-header h-full"
      title={<Link to="/">{t('title')}</Link>}
      subTitle={t('sub-title')}
      onBack={() => navigate(-1)}
      extra={
        <>
          <Link to="/page2">Page 2</Link>
          <Link to="/page3">Page 3</Link>
        </>
      }
    />
  );
};

const CustomFooter = () => (
  <div style={{ textAlign: 'center' }}>
    <div>
      { /* @ts-ignore */}
      {__HEAD_COMMIT_HASH__ ? `Trace: ${__HEAD_COMMIT_HASH__}` : ""}
    </div>
    <div>
      &copy; {new Date().getFullYear()} - Maifee Ul Asad
    </div>
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
