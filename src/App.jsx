import React, { useState } from 'react';
import { Layout, ConfigProvider, theme } from 'antd';
import Navbar from './components/Navbar';
import ProductList from './pages/ProductList';

const { Header, Content } = Layout;
const { defaultAlgorithm, darkAlgorithm } = theme;

export default function App() {
  const [dark, setDark] = useState(false);

  React.useEffect(() => {
    if (dark) document.body.classList.add('dark');
    else document.body.classList.remove('dark');
  }, [dark]);

  return (
    <ConfigProvider theme={{ algorithm: dark ? darkAlgorithm : defaultAlgorithm }}>
      <Layout style={{ minHeight: '100vh', background: 'transparent' }}>
        <Header style={{ padding: 0, background: 'transparent' }}>
          <Navbar dark={dark} setDark={setDark} />
        </Header>
        <Content style={{ padding: '24px 16px', maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          <ProductList />
        </Content>
      </Layout>
    </ConfigProvider>
  );
}
