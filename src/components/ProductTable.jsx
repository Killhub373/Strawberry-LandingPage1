import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/ProductTable.css';

const ProductTable = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:2026/api/barang/getAll')
      .then(response => {
        if (Array.isArray(response.data.data)) {
          setProducts(response.data.data);
        } else {
          console.error('Data fetched is not an array:', response.data);
        }
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  return (
    <div className="product-table">
      <h2>Daftar Barang</h2>
      <table>
        <thead>
          <tr>
            <th>ID Barang</th>
            <th>Nama Barang</th>
            <th>Jenis Barang</th>
            <th>Stok Barang</th>
            <th>Harga Barang</th>
            <th>Tanggal Kadaluarsa</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.namaBarang}</td>
                <td>{product.jenisBarang}</td>
                <td>{product.stokBarang}</td>
                <td>{product.hargaBarang}</td>
                <td>{new Date(product.tanggalKadaluarsa).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Tidak ada data barang</td>
            </tr>
          )}
        </tbody>
      </table>
      <Link to="/admin-login" className="admin-login-button">Login Administrator</Link>
    </div>
  );
};

export default ProductTable;
