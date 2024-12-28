import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import '../style/AdminPage.css';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    id: '',
    namaBarang: '',
    jenisBarang: '',
    stokBarang: '',
    hargaBarang: '',
    tanggalKadaluarsa: '',
    deskripsiBarang: '',
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = () => {
    if (!newProduct.id || !newProduct.namaBarang || !newProduct.jenisBarang || !newProduct.stokBarang || !newProduct.hargaBarang || !newProduct.tanggalKadaluarsa || !newProduct.deskripsiBarang) {
      alert('All fields are required');
      return;
    }
    axios.post('http://localhost:2026/api/barang/add', newProduct)
      .then(response => {
        if (response.data.data) {
          setProducts([...products, response.data.data]);
          setNewProduct({
            id: '',
            namaBarang: '',
            jenisBarang: '',
            stokBarang: '',
            hargaBarang: '',
            tanggalKadaluarsa: '',
            deskripsiBarang: '',
          });
          Swal.fire('Berhasil', 'Barang berhasil ditambahkan!', 'success');
        } else {
          console.error('Error adding the product:', response.data);
        }
      })
      .catch(error => {
        console.error('There was an error adding the product!', error);
        Swal.fire('Gagal', 'Terjadi kesalahan saat menambahkan barang.', 'error');
      });
  };

  const handleDeleteProduct = (id) => {
    console.log(`Deleting product with id: ${id}`);
    axios.delete(`http://localhost:2026/api/barang/${id}`)
      .then(response => {
        if (response.data.data && response.data.data.Deleted) {
          setProducts(products.filter(product => product.id !== id));
          Swal.fire('Berhasil', 'Barang berhasil dihapus!', 'success');
        } else {
          console.error('Error deleting the product:', response.data);
          Swal.fire('Gagal', 'Terjadi kesalahan saat menghapus barang.', 'error');
        }
      })
      .catch(error => {
        console.error('There was an error deleting the product!', error);
        Swal.fire('Gagal', 'Terjadi kesalahan saat menghapus barang.', 'error');
      });
  };

  return (
    <div className="admin-page">
      <h2>Halaman Administrator</h2>
      <div className="admin-add-product">
        <h3>Tambah Barang Baru</h3>
        <div>
          <input
            type="text"
            name="id"
            value={newProduct.id}
            onChange={handleInputChange}
            placeholder="ID Barang"
          />
          <input
            type="text"
            name="namaBarang"
            value={newProduct.namaBarang}
            onChange={handleInputChange}
            placeholder="Nama Barang"
          />
          <input
            type="text"
            name="jenisBarang"
            value={newProduct.jenisBarang}
            onChange={handleInputChange}
            placeholder="Jenis Barang"
          />
          <input
            type="number"
            name="stokBarang"
            value={newProduct.stokBarang}
            onChange={handleInputChange}
            placeholder="Stok Barang"
            className="wide-input"
          />
          <input
            type="number"
            name="hargaBarang"
            value={newProduct.hargaBarang}
            onChange={handleInputChange}
            placeholder="Harga Barang"
            className="wide-input"
          />
          <input
            type="date"
            name="tanggalKadaluarsa"
            value={newProduct.tanggalKadaluarsa}
            onChange={handleInputChange}
            placeholder="Tanggal Kadaluarsa"
          />
          <textarea
            name="deskripsiBarang"
            value={newProduct.deskripsiBarang}
            onChange={handleInputChange}
            placeholder="Deskripsi Barang"
          />
          <button onClick={handleAddProduct}>Tambah Barang</button>
        </div>
      </div>
      <h3>Daftar Barang</h3>
      <table>
        <thead>
          <tr>
            <th>ID Barang</th>
            <th>Nama Barang</th>
            <th>Jenis Barang</th>
            <th>Stok Barang</th>
            <th>Harga Barang</th>
            <th>Tanggal Kadaluarsa</th>
            <th>Deskripsi</th>
            <th>Aksi</th>
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
                <td>{product.deskripsiBarang}</td>
                <td>
                  <button onClick={() => handleDeleteProduct(product.id)} className="delete-button">Hapus</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">Tidak ada data barang</td>
            </tr>
          )}
        </tbody>
      </table>
      <Link to="/home" className="home-button">Kembali ke Halaman Utama</Link>
    </div>
  );
};

export default AdminPage;
