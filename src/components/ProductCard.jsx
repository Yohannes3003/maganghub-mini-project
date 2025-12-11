import React from 'react';
import { Card, Button, Typography } from 'antd';

const { Title, Paragraph } = Typography;

export default function ProductCard({ product, onOpen }) {
  return (
    <Card
      hoverable
      style={{
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      bodyStyle={{
        padding: 18,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
      cover={
        <div
          style={{
            height: 220,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#fafafa',
          }}
        >
          <img
            src={product.thumbnail}
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
            }}
          />
        </div>
      }
    >
      {/* TITLE (fixed height) */}
      <Title
        level={5}
        style={{
          marginBottom: 6,
          minHeight: 45, // FIXED height → semua title konsisten
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {product.title}
      </Title>

      {/* DESCRIPTION (fixed height) */}
      <Paragraph
        ellipsis={{ rows: 2 }}
        style={{
          marginBottom: 10,
          minHeight: 44, // FIXED height → semua deskripsi konsisten
        }}
      >
        {product.description}
      </Paragraph>

      {/* PRICE (selalu sejajar) */}
      <Title
        level={5}
        style={{
          color: '#7e3af2',
          marginBottom: 14,
          minHeight: 28, // FIXED height → harga sejajar
          display: 'flex',
          alignItems: 'center',
        }}
      >
        ${product.price}
      </Title>

      {/* Spacer untuk mendorong button ke bawah */}
      <div style={{ flexGrow: 1 }}></div>

      {/* BUTTON */}
      <Button
        type="primary"
        block
        style={{
          borderRadius: 8,
          background: '#4f46e5',
        }}
        onClick={() => onOpen(product)}
      >
        Lihat Detail
      </Button>
    </Card>
  );
}
