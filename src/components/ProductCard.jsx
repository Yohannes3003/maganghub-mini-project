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
            height: 180, // lebih kecil supaya mobile tetap pas
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
      {/* TITLE — Responsive, max 2 lines (tidak dipotong kasar) */}
      <Title
        level={5}
        style={{
          marginBottom: 8,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          height: 48, // FIXED HEIGHT
        }}
      >
        {product.title}
      </Title>

      {/* DESCRIPTION — Tetap 2 baris */}
      <Paragraph
        ellipsis={{ rows: 2 }}
        style={{
          marginBottom: 10,
          height: 40, // FIXED HEIGHT
        }}
      >
        {product.description}
      </Paragraph>

      {/* PRICE — Tetap sejajar */}
      <Title
        level={5}
        style={{
          color: '#7e3af2',
          marginBottom: 14,
          height: 26, // FIXED HEIGHT juga lebih aman
          display: 'flex',
          alignItems: 'center',
        }}
      >
        ${product.price}
      </Title>

      {/* Spacer agar button tetap di bawah */}
      <div style={{ flexGrow: 1 }}></div>

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
