import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import '../style/Product.css';
import HeroImg from '../assets/Jual.png';
import MapImg from '../assets/wm.png';

const Product = () => {
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    country: '',
    paymentMethod: '',
    purchasedItem: 'Buah Strawberry 1 Pack',
  });

  useEffect(() => {
    if (showPurchaseForm || showSummary) {
      document.body.classList.add('body-lock');
    } else {
      document.body.classList.remove('body-lock');
    }
  }, [showPurchaseForm, showSummary]);

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value.length <= 4) {
      setQuantity(parseInt(value));
    }
  };

  const addToCart = () => {
    const itemIndex = cart.findIndex(item => item.purchasedItem === formData.purchasedItem);
    let newCart = [...cart];
    if (itemIndex !== -1) {
      newCart[itemIndex].quantity += quantity;
    } else {
      newCart.push({ ...formData, quantity });
    }
    setCart(newCart);
    Swal.fire('Berhasil', 'Produk berhasil ditambahkan ke keranjang!', 'success');
  };

  const handlePurchase = () => {
    setShowPurchaseForm(true);
  };

  const handleCloseForm = () => {
    setShowPurchaseForm(false);
    setShowSummary(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowSummary(true);
  };

  const handleConfirmPurchase = () => {
    axios.post('/api/update-stock', { purchasedItem: formData.purchasedItem, quantity })
      .then(response => {
        setShowSummary(false);
        Swal.fire('Pembelian berhasil!', 'Pesanan Anda telah diterima.', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch(error => {
        console.error('There was an error updating the stock!', error);
        Swal.fire('Gagal', 'Terjadi kesalahan saat memperbarui stok.', 'error');
      });
  };

  const getTotalPrice = () => {
    const productPrice = cart.reduce((total, item) => total + item.quantity * 19500, 0);
    const tax = productPrice * 0.05;
    const shipping = formData.country === 'Indonesia' ? 30000 : 70000;
    return productPrice + tax + shipping;
  };

  const updateCartItem = (index, delta) => {
    const newCart = [...cart];
    newCart[index].quantity += delta;
    if (newCart[index].quantity <= 0) {
      newCart.splice(index, 1);
    }
    setCart(newCart);
  };

  return (
    <div data-aos="fade-up" data-aos-duration="300" className="container">
      <div className="header">
        <h1 data-aos="zoom-in" data-aos-duration="400" className="text-3xl font-bold text-white bg-primaryDark rounded-[10px]">STRAWBERRY</h1>
      </div>
      <div className="habitat-info flex flex-col md:flex-row items-start mt-4 mb-6">
        <img src={MapImg} alt="World Map" className="w-60 h-40 mr-6 mb-4 md:mb-0" />
        <div className="info-text text-md">
          <h2 data-aos="zoom-in" data-aos-duration="500" className="text-2xl font-bold mb-2 text-secondary">Habitat Alami Strawberry</h2>
          <p data-aos="fade-left" data-aos-duration="600">Strawberi tumbuh subur di daerah yang memiliki iklim sejuk dengan sinar matahari yang cukup, tanah kaya bahan organik, serta drainase yang baik. Tanaman ini memerlukan tanah berpasir lempung yang subur dengan kelembaban yang cukup, tetapi tidak tergenang. </p>
          <p data-aos="fade-left" data-aos-duration="600">Habitat alami stroberi mencakup area dataran tinggi dengan suhu udara yang lebih rendah, paparan sinar matahari langsung minimal 6-8 jam per hari, dan tanah yang kaya nutrisi. Tanaman ini juga membutuhkan musim dingin yang cukup panjang untuk periode dormansi, penting bagi siklus hidup stroberi. </p>
        </div>
      </div>
      <div data-aos="zoom-in" data-aos-duration="500" className="product mt-6">
        <img src={HeroImg} alt="Strawberry Pack" className="w-40 h-40 md:w-60 md:h-60" />
        <div className="product-details">
          <h1 className="text-secondary">BUAH STRAWBERRY | STRAWBERRY SEGAR 1 PACK</h1>
          <div className="rating">
            <span>★★★★☆</span> 4.8 (57 Penilaian)
          </div>
          <div className="price">Rp19.500</div>
          <div className="quantity">
            <label htmlFor="quantity">Kuantitas: </label>
            <input type="number" id="quantity" name="quantity" value={quantity} min="1" onChange={handleQuantityChange} max="1000" />
          </div>
          <div className="buttons">
            <button onClick={addToCart}>Masukkan Keranjang</button>
            <button onClick={handlePurchase}>Beli Sekarang</button>
          </div>
        </div>
      </div>
      <div className="cart mt-6">
        <h2 className="text-2xl font-bold mb-4">Keranjang</h2>
        {cart.length === 0 ? (
          <p>Keranjang kosong</p>
        ) : (
          <ul className="cart-list">
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <span>{item.purchasedItem} (x{item.quantity})</span>
                <div className="cart-buttons">
                  <button onClick={() => updateCartItem(index, 1)}>Tambah</button>
                  <button onClick={() => updateCartItem(index, -1)}>Kurangi</button>
                  <button onClick={() => updateCartItem(index, -item.quantity)}>Hapus</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {showPurchaseForm && (
        <div className="modal" onClick={handleCloseForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4">Formulir Pembelian</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nama:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  pattern="[A-Za-z\s]*"
                  title="Nama harus berisi huruf saja."
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Alamat:</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Nomor Telepon:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  pattern="[0-9]{10,13}"
                  title="Nomor telepon harus terdiri dari 10-13 angka."
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="country">Negara:</label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleFormChange}
                  required
                >
                  <option value="">Pilih Negara</option>
                  <option value="Indonesia">Indonesia</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Thailand">Thailand</option>
                  <option value="Vietnam">Vietnam</option>
                  <option value="Philippines">Philippines</option>
                  <option value="Japan">Japan</option>
                  <option value="South Korea">South Korea</option>
                  <option value="China">China</option>
                  <option value="India">India</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="paymentMethod">Metode Pembayaran:</label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleFormChange}
                  required
                >
                  <option value="transfer">Transfer Bank</option>
                  <option value="credit-card">Kartu Kredit</option>
                  <option value="paypal">PayPal</option>
				                <option value="cod">Cash On Delivery (COD)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Total Harga:</label>
                <p>
                  Harga: Rp{cart.reduce((total, item) => total + item.quantity * 19500, 0).toLocaleString()}<br />
                  Pajak (5%): Rp{(cart.reduce((total, item) => total + item.quantity * 19500, 0) * 0.05).toLocaleString()}<br />
                  Ongkos Kirim: Rp{(formData.country === 'Indonesia' ? 30000 : 70000).toLocaleString()}<br />
                  Total Harga = Harga + Pajak + Ongkos Kirim = Rp{getTotalPrice().toLocaleString()}
                </p>
              </div>
              <button type="submit" className="submit-button">Lanjutkan</button>
            </form>
          </div>
        </div>
      )}
      {showSummary && (
        <div className="modal" onClick={handleCloseForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4">Ringkasan Pembelian</h2>
            <p>Nama: {formData.name}</p>
            <p>Alamat: {formData.address}</p>
            <p>Nomor Telepon: {formData.phone}</p>
            <p>Negara: {formData.country}</p>
            <p>Metode Pembayaran: {formData.paymentMethod}</p>
            <p>Barang Yang Dibeli:</p>
            <ul>
              {cart.map((item, index) => (
                <li key={index}>{item.purchasedItem} (x{item.quantity})</li>
              ))}
            </ul>
            <p>
              Harga: Rp{cart.reduce((total, item) => total + item.quantity * 19500, 0).toLocaleString()}<br />
              Pajak (5%): Rp{(cart.reduce((total, item) => total + item.quantity * 19500, 0) * 0.05).toLocaleString()}<br />
              Ongkos Kirim: Rp{(formData.country === 'Indonesia' ? 30000 : 70000).toLocaleString()}<br />
              Total Harga = Harga + Pajak + Ongkos Kirim = Rp{getTotalPrice().toLocaleString()}
            </p>
            <button onClick={handleConfirmPurchase} className="confirm-button">Konfirmasi Pembelian</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
