import React from 'react';
import { Modal, Carousel, Typography, Row, Col, Tag, Rate } from 'antd';

const { Title, Paragraph, Text } = Typography;

export default function ProductModal({ open, onClose, product }) {
  if (!product) return null;

  const formatCategory = (str) => {
    if (!str) return '';
    return str.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <Modal title={product.title} open={open} onCancel={onClose} footer={null} width={800} centered>
      <Row gutter={16}>
        <Col xs={24} sm={10}>
          <Carousel autoplay>
            {(product.images?.length ? product.images : [product.thumbnail]).map((img, idx) => (
              <div key={idx} style={{ height: 320, display: 'flex', justifyContent: 'center' }}>
                <img src={img} style={{ maxHeight: 320, width: '100%', objectFit: 'contain' }} />
              </div>
            ))}
          </Carousel>
        </Col>

        <Col xs={24} sm={14}>
          <Title level={4}>${product.price}</Title>
          <Paragraph>{product.description}</Paragraph>

          <div style={{ margin: '12px 0' }}>
            <Text strong>Brand: </Text> <Tag>{product.brand}</Tag>
            <Text strong style={{ marginLeft: 12 }}>
              Category:{' '}
            </Text>
            <Tag>{formatCategory(product.category)}</Tag>
          </div>

          <div style={{ marginTop: 8 }}>
            <Text strong>Rating: </Text>
            <Rate disabled defaultValue={Math.round(product.rating)} /> ({product.rating})
          </div>

          <div style={{ marginTop: 12 }}>
            <Text strong>Stock: </Text> {product.stock}
          </div>
        </Col>
      </Row>
    </Modal>
  );
}
