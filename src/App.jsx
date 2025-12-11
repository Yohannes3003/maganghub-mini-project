import React from 'react';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import ProductList from './pages/ProductList';

const { Header, Content } = Layout;

export default function App() {
  return (
    <Layout style={{ minHeight: '100vh', background: 'transparent' }}>
      <Header style={{ padding: 0, background: 'transparent' }}>
        <Navbar />
      </Header>

      <Content
        style={{
          padding: '24px 16px',
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
        }}
      >
        <ProductList />
      </Content>
    </Layout>
  );
}
