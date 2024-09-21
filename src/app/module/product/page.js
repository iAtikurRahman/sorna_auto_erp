'use client';
import React, { useState } from 'react';
import ErpHeader from '../../_components/ErpHeader';

const Product = () => {
  // Sample data for products
  const [products, setProducts] = useState([
    { id: 1, product_name: 'Smartphone', category: 'Electronics', price: 500, stock: 100 },
    { id: 2, product_name: 'T-shirt', category: 'Clothing', price: 20, stock: 200 },
    { id: 3, product_name: 'Sofa', category: 'Furniture', price: 1000, stock: 10 },
    { id: 4, product_name: 'Laptop', category: 'Electronics', price: 1200, stock: 50 },
    { id: 5, product_name: 'Jeans', category: 'Clothing', price: 40, stock: 150 },
  ]);

  const [productNameFilter, setProductNameFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [stockFilter, setStockFilter] = useState('');
  const [newProduct, setNewProduct] = useState({ product_name: '', category: '', price: '', stock: '' });
  const [editProductId, setEditProductId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const filteredProducts = products.filter((product) => {
    return (
      (productNameFilter === '' || product.product_name.toLowerCase().includes(productNameFilter.toLowerCase())) &&
      (categoryFilter === '' || product.category === categoryFilter) &&
      (priceFilter === '' || product.price.toString().includes(priceFilter)) &&
      (stockFilter === '' || product.stock.toString().includes(stockFilter))
    );
  });

  const handleAddProduct = () => {
    setNewProduct({ product_name: '', category: '', price: '', stock: '' });
    setIsAdding(true);
    setIsModalOpen(true);
  };

  const handleUpdateProduct = () => {
    if (editProductId !== null) {
      setProducts(products.map(product =>
        product.id === editProductId ? { ...newProduct, id: product.id } : product
      ));
      setEditProductId(null);
      setNewProduct({ product_name: '', category: '', price: '', stock: '' });
      setIsModalOpen(false);
    }
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  const handleEditProduct = (product) => {
    setNewProduct(product);
    setEditProductId(product.id);
    setIsAdding(false);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSaveProduct = () => {
    if (isAdding) {
      setProducts([...products, { ...newProduct, id: products.length + 1 }]);
    } else {
      handleUpdateProduct();
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <ErpHeader />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Product Management</h1>
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <input
              type="text"
              name="productNameFilter"
              placeholder="Filter by Product Name"
              onChange={(e) => setProductNameFilter(e.target.value)}
              className="border border-gray-300 rounded p-2"
            />
            <select name="categoryFilter" onChange={(e) => setCategoryFilter(e.target.value)} className="border border-gray-300 rounded p-2">
              <option value="">Filter by Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Furniture">Furniture</option>
            </select>
            <input
              type="text"
              name="priceFilter"
              placeholder="Filter by Price"
              onChange={(e) => setPriceFilter(e.target.value)}
              className="border border-gray-300 rounded p-2"
            />
            <input
              type="text"
              name="stockFilter"
              placeholder="Filter by Stock"
              onChange={(e) => setStockFilter(e.target.value)}
              className="border border-gray-300 rounded p-2"
            />
          </div>
          <button onClick={handleAddProduct} className="bg-blue-500 text-white px-4 py-2 rounded">Add Product</button>
        </div>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left">Product Name</th>
              <th className="py-2 px-4 text-left">Category</th>
              <th className="py-2 px-4 text-left">Price</th>
              <th className="py-2 px-4 text-left">Stock</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr key={index} className="border-t hover:bg-gray-100">
                <td className="py-2 px-4">{product.product_name}</td>
                <td className="py-2 px-4">{product.category}</td>
                <td className="py-2 px-4">{product.price}</td>
                <td className="py-2 px-4">{product.stock}</td>
                <td className="py-2 px-4">
                  <button onClick={() => handleEditProduct(product)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Update</button>
                  <button onClick={() => handleDeleteProduct(product.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg w-1/3">
            <h2 className="text-xl mb-4">{isAdding ? 'Add Product' : 'Edit Product'}</h2>
            <form>
              <input
                type="text"
                name="product_name"
                placeholder="Product Name"
                value={newProduct.product_name}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full p-2 mb-2"
              />
              <select
                name="category"
                value={newProduct.category}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full p-2 mb-2"
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Furniture">Furniture</option>
              </select>
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={newProduct.price}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full p-2 mb-2"
              />
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={newProduct.stock}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full p-2 mb-2"
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveProduct}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  {isAdding ? 'Add' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
