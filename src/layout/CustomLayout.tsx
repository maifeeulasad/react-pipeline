import React, { ReactNode, useEffect, useState } from 'react';
import type { MenuDataItem } from '@ant-design/pro-components';
import { PageContainer, ProLayout } from '@ant-design/pro-components';
import { useLocation, Link } from 'react-router-dom';
import { notification, Input, Select, Form, Button, Affix } from 'antd';
import { copyText } from 'copy-clipboard-js';
import CopyOutlined from '@ant-design/icons/CopyOutlined';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import logo from './logo.svg';

const defaultMenus: MenuDataItem[] = [
  {
    path: '/',
    name: 'Pages',
    children: [
      {
        path: '/page2',
        name: 'Page 2',
      },
      {
        path: '/page1',
        name: 'Page 1 - Fallback to landing',
      },
      {
        path: '/page3',
        name: 'Page 3',
      },
    ],
  },
  {
    path: '/landing',
    name: 'Landing Page',
    // hideInMenu: true, // hidden from menu
  },
];

const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] =>
  menus.map(({ icon, children, ...item }) => ({
    ...item,
    icon,
    children: children && loopMenuItem(children),
    path: item.path,
  }));

interface ICustomFooterMenuProps {
  collapsed?: boolean;
}

// @ts-ignore
const TRACE: string = __HEAD_COMMIT_HASH__;

const CustomFooterMenu = ({ collapsed }: ICustomFooterMenuProps) => {
  const [api, contextHolder] = notification.useNotification();

  const copyLink = () => {
    copyText(TRACE);
    api.open({
      key: TRACE,
      message: 'Trace ID copied to clipboard',
      description: `ID: ${TRACE}`,
      duration: 2,
      closeIcon: <div />,
    });
  };

  if (collapsed) return undefined;
  return (
    <>
      {contextHolder}
      <div style={{ textAlign: 'center' }}>
        <div style={{ textAlign: 'center', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
          <div>
            { /* @ts-ignore */}
            {TRACE ? `Trace: ${TRACE}` : ''}
            <CopyOutlined onClick={() => copyLink()} />
          </div>
          <div>
            &copy; {new Date().getFullYear()} - Maifee Ul Asad
          </div>
        </div>
      </div>
    </>
  );
};

const SearchBar = () => {
  const sections = ['whole', 'section1', 'section2', 'section3'];
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const [form] = Form.useForm();
  const [resetVisibility, setResetVisibility] = useState(true);

  const onValuesChange = (changedValues: any) => {
    console.log('Form changed:', changedValues);
    const { range, keyword } = changedValues;
    console.log('Search triggered with:', { range, keyword });
    setResetVisibility(range === undefined && (keyword === undefined || keyword === ''));
  };

  return (
    <Form
      form={form}
      layout="inline"
      onValuesChange={onValuesChange}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="on"
      style={{
        display: 'flex',
        padding: 8,
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
      }}
    >
      <Form.Item
        name="range"
        rules={[{ required: true, message: 'Please select a range!' }]}
      >
        <Select
          defaultValue={sections[0] || ''}
          options={sections.map((section) => ({ label: section, value: section }))}
          style={{ width: 120 }}
        />
      </Form.Item>

      <Form.Item
        style={{ flex: 1 }}
        name="keyword"
        rules={[{ required: true, message: 'Please input your keyword!' }]}
      >
        <Input
          placeholder="Search..."
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item
        hidden={resetVisibility}
      >
        <Button
          style={{
            background: '#1677ff',
          }}
          icon={<ReloadOutlined />}
          type="primary"
          onClick={() => form.resetFields()}
        />
      </Form.Item>
      <Form.Item>
        <Button
          style={{
            background: '#1677ff',
          }}
          icon={<SearchOutlined />}
          type="primary"
          htmlType="submit"
        />
      </Form.Item>
    </Form>
  );
};

const renderMenuItem = (item: any, dom: React.ReactNode) => <Link to={item.path || '/'}>{dom}</Link>;

const subMenuItemRender = (item: any, dom: React.ReactNode) => <Link to={item.path || '/'}>{dom}</Link>;

interface ICustomLayoutProps {
  children: ReactNode;
}

const CustomLayout = ({ children }: ICustomLayoutProps) => {
  const location = useLocation();

  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / scrollHeight) * 100;
      setScrollPercent(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ProLayout
      logo={logo}
      title="React Pipeline"
      style={{ minHeight: '100vh' }}
      fixSiderbar
      location={location}
      menu={{
        request: async () => loopMenuItem(defaultMenus),
      }}
      route={{ routes: defaultMenus }}
      menuItemRender={renderMenuItem}
      subMenuItemRender={subMenuItemRender}
      // eslint-disable-next-line
      menuFooterRender={(props) => <CustomFooterMenu {...props} />}
    >
      <PageContainer header={{ title: true }}>
        <Affix offsetTop={0}>
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: 4,
                width: `${scrollPercent}%`,
                background: '#1890ff',
                transition: 'width 0.1s ease-out',
                zIndex: 9999,
              }}
            />
            <SearchBar />
          </div>
        </Affix>
        <div style={{ padding: 16, background: 'transparent' }}>
          {children}
        </div>
      </PageContainer>
    </ProLayout>
  );
};

export { CustomLayout };
