import React, { ReactNode } from 'react';
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
        path: '/page1',
        name: 'Page 1 - Fallback to landing',
      },
      {
        path: '/page2',
        name: 'Page 2',
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

  return (
    <Form
      form={form}
      layout="inline"
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
        style={{ padding: 2 }}
        rules={[{ required: true, message: 'Please select a range!' }]}
      >
        <Select
          defaultValue={sections[0] || ''}
          options={sections.map((section) => ({ label: section, value: section }))}
          style={{ width: 120 }}
        />
      </Form.Item>

      <Form.Item
        style={{ flex: 1, padding: 2 }}
        name="keyword"
        rules={[{ required: true, message: 'Please input your keyword!' }]}
      >
        <Input
          placeholder="Search..."
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item style={{ padding: 2 }}>
        <Button
          style={{
            background: '#1677ff',
          }}
          icon={<ReloadOutlined />}
          type="primary"
          onClick={() => form.resetFields()}
        />
      </Form.Item>
      <Form.Item style={{ padding: 2 }}>
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
          <SearchBar />
        </Affix>
        {children}
      </PageContainer>
    </ProLayout>
  );
};

export { CustomLayout };
