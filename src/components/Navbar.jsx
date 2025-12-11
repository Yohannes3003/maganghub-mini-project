import React from 'react';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

export default function Navbar() {
  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingInline: 32,
        background: '#ffffff',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      }}
    >
      <h2
        style={{
          margin: 0,
          color: '#4f46e5',
          fontWeight: 700,
        }}
      >
        MagangHub – Mini Project
      </h2>
    </Header>
  );
}
