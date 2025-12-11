import { useMemo, useState, useEffect } from 'react';

export default function useProductFilters(products) {
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('default');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 8;

  // Format helper
  const formatCategory = (str) => {
    if (!str) return '';
    return str.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  };

  // Extract categories
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ['all', ...set];
  }, [products]);

  // Filter logic
  const filtered = useMemo(() => {
    let list = [...products];

    // Filter berdasarkan kategori
    if (category !== 'all') {
      list = list.filter((p) => p.category === category);
    }

    // Search bar (title, desc, brand)
    const q = query.toLowerCase();
    if (q.trim()) {
      list = list.filter((p) => {
        const title = p.title?.toLowerCase() || '';
        const desc = p.description?.toLowerCase() || '';
        const brand = p.brand?.toLowerCase() || '';
        return title.includes(q) || desc.includes(q) || brand.includes(q);
      });
    }

    // Sorting
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);

    if (sort === 'name-asc') list.sort((a, b) => a.title.localeCompare(b.title));

    if (sort === 'name-desc') list.sort((a, b) => b.title.localeCompare(a.title));

    return list;
  }, [products, category, sort, query]);

  // Pagination
  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  // Reset ke halaman 1 saat filter berubah
  useEffect(() => {
    setPage(1);
  }, [category, sort, query]);

  return {
    // filters
    category,
    sort,
    query,
    page,
    setCategory,
    setSort,
    setQuery,
    setPage,

    // list
    categories,
    filtered,
    paginated,
    total,
    pageSize,

    // helpers
    formatCategory,
  };
}
