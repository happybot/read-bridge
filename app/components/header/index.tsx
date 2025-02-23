'use client';
import { Menu, Divider } from 'antd';
import { HomeOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { theme } from 'antd';

const items = [
  {
    label: '首页',
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: '导航',
    key: 'nav',
    icon: <AppstoreOutlined />,
    children: [
      {
        label: '选项1',
        key: 'setting:1',
      },
      {
        label: '选项2',
        key: 'setting:2',
      },
    ],
  },
  {
    label: '设置',
    key: 'settings',
    icon: <SettingOutlined />,
    children: [
      {
        label: '个人信息',
        key: 'profile',
      },
      {
        label: '系统设置',
        key: 'system',
      },
    ],
  },
];

export default function Header() {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState('home');

  const onClick = (e: any) => {
    setCurrent(e.key);
  };

  return (
    <div className="header flex justify-between w-full h-full" style={{ backgroundColor: token.colorBgContainer }}>
      <HeaderLogoArea />
      <HeaderContentArea />
      <HeaderIconArea />
    </div>
  );
}

function HeaderLogoArea() {
  return (
    <div className="flex w-[16%] h-full bg-red-500">

    </div>
  )
}

function HeaderContentArea() {
  return (
    <div className="flex w-full h-full bg-blue-500">

    </div>
  )
}

function HeaderIconArea() {
  return (
    <div className="flex w-[16%] h-full bg-green-500">

    </div>
  )
}
