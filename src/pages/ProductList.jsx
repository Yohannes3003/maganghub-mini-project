import React from 'react';
import { Row, Col, Select, Input, Pagination, Spin, Empty, Card } from 'antd';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import useProductFilters from '../hooks/useProductFilters';

const { Option } = Select;
const { Search } = Input;

const getProducts = async () => {
  const res = await api.get('/products?limit=100');
  return res.data.products;
};

export default function ProductList() {
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5,
  });

  const { category, sort, query, page, categories, paginated, total, pageSize, setCategory, setSort, setQuery, setPage, formatCategory } = useProductFilters(products);

  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);

  const onOpenModal = (product) => {
    setSelected(product);
    setOpen(true);
  };

  if (isLoading)
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 80 }}>
        <Spin size="large" />
      </div>
    );

  if (error) return <div>Error loading data.</div>;

  return (
    <Row gutter={24}>
      {/* ==================== FILTER KIRI ==================== */}
      <Col
        xs={24}
        md={6}
        style={{
          marginBottom: 20, // spacing di mobile agar tidak nempel
        }}
      >
        <Card
          style={{
            padding: 20,
            borderRadius: 16,
            boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
            background: 'white',

            // Desktop sticky, mobile non-sticky
            position: window.innerWidth >= 768 ? 'sticky' : 'static',
            top: window.innerWidth >= 768 ? 90 : 'auto',
            zIndex: 10,
          }}
        >
          <h3 style={{ marginBottom: 20, fontWeight: 600 }}>Filter</h3>

          <div style={{ marginBottom: 16 }}>
            <Select value={category} onChange={setCategory} style={{ width: '100%' }} size="large">
              {categories.map((c) => (
                <Option key={c} value={c}>
                  {c === 'all' ? 'Semua Kategori' : formatCategory(c)}
                </Option>
              ))}
            </Select>
          </div>

          <div style={{ marginBottom: 16 }}>
            <Select value={sort} onChange={setSort} style={{ width: '100%' }} size="large">
              <Option value="default">Default</Option>
              <Option value="price-asc">Harga: Rendah ke Tinggi</Option>
              <Option value="price-desc">Harga: Tinggi ke Rendah</Option>
              <Option value="name-asc">Nama: A - Z</Option>
              <Option value="name-desc">Nama: Z - A</Option>
            </Select>
          </div>

          <Search placeholder="Cari produk..." allowClear enterButton size="large" value={query} onChange={(e) => setQuery(e.target.value)} onSearch={(v) => setQuery(v)} />
        </Card>
      </Col>

      {/* ==================== PRODUK KANAN ==================== */}
      <Col xs={24} md={18}>
        {paginated.length === 0 ? (
          <Empty description="Tidak ada produk ditemukan" />
        ) : (
          <Row gutter={[16, 16]}>
            {paginated.map((product) => (
              <Col key={product.id} xs={12} sm={12} md={8} lg={6}>
                <ProductCard product={product} onOpen={onOpenModal} />
              </Col>
            ))}
          </Row>
        )}

        {/* Pagination */}
        <div
          style={{
            marginTop: 24,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Pagination current={page} total={total} pageSize={pageSize} onChange={setPage} showSizeChanger={false} />
        </div>
      </Col>

      {/* Modal Detail */}
      <ProductModal open={open} onClose={() => setOpen(false)} product={selected} />
    </Row>
  );
}
