import React, { ReactNode } from 'react';
import type { MenuDataItem } from '@ant-design/pro-components';
import { PageContainer, ProLayout } from '@ant-design/pro-components';
import { useLocation, Link } from 'react-router-dom';
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
    icon: icon,
    children: children && loopMenuItem(children),
    path: item.path,
  }));

interface ICustomFooterMenuProps {
  collapsed?: boolean;
}

const CustomFooterMenu = ({ collapsed }: ICustomFooterMenuProps) => {
  if (collapsed) return undefined;
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ textAlign: 'center', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
        <div>
          { /* @ts-ignore */}
          {__HEAD_COMMIT_HASH__ ? `Trace: ${__HEAD_COMMIT_HASH__}` : ''}
        </div>
        <div>
          &copy; {new Date().getFullYear()} - Maifee Ul Asad
        </div>
      </div>

    </div>
  );
}

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
      menuItemRender={(item, dom) => (
        <Link to={item.path || '/'}>{dom}</Link>
      )}
      subMenuItemRender={(_, dom) => <>{dom}</>}
      menuFooterRender={(props) => <CustomFooterMenu {...props} />}
    >
      <PageContainer header={{ title: true }}>
        {children}
      </PageContainer>
    </ProLayout>
  );
};

export { CustomLayout };