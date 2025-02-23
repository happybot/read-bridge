"use client"

import { Layout } from "antd";
import HeaderContent from "./components/header/index";
import { CSSProperties } from "react";

const { Header, Content, Sider, Footer } = Layout;

const layoutStyle: CSSProperties = {
  height: '100vh',
  width: '100%',
  maxWidth: '1920px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  position: 'relative',
};

const headerStyle: CSSProperties = {
  textAlign: 'center',
  height: '64px',
  lineHeight: '64px',
  position: 'sticky',
  top: 0,
  zIndex: 1,
  padding: 0,
  width: '100%',
};

const contentStyle: CSSProperties = {
  textAlign: 'center',
  flex: 1,
  overflow: 'auto',
};

const siderStyle: CSSProperties = {
  textAlign: 'center',
  overflow: 'auto',
};

const footerStyle: CSSProperties = {
  textAlign: 'center',
  position: 'sticky',
  bottom: 0,
  width: '100%',
  height: '24px',
};

export default function Home() {
  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}><HeaderContent /></Header>
      <Layout style={{ flex: 1, overflow: 'hidden' }}>
        <Content style={{ ...contentStyle, flex: 1 }}>Content</Content>
        <Sider
          width="20%"
          style={siderStyle}
          breakpoint="lg"
          collapsedWidth={0}
        >
          Sider
        </Sider>
      </Layout>
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
  );
}
