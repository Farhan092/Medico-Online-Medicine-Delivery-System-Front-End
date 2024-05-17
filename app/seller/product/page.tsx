'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Link from "next/link";

import NavBar from '../components/navbar';
import TopBar from '../components/topbar';

interface Product {
  productId: number;
  productName: string;
  productDescription: string;
  productManufacturer: string;
  productQuantity: number;
  productPrice:number;
  filename: string;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>('http://localhost:7000/seller/view_all_product');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter(item =>
    item.productName.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <TopBar/>
      <input
        type="text"
        placeholder="Search by product name"
        value={searchTerm}
        onChange={handleSearch}
        className="border border-gray-300 rounded-md px-4 py-2 mb-4"
      />

      <br></br>

      <Link href="product/addProduct">
  <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded mr-2 mb-2">
    Add New Product
  </button>
</Link>

<Link href="product/editProduct">
  <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded mr-2 mb-2">
    Edit Existing Product
  </button>
</Link>

      <h1 className="text-3xl font-semibold mb-4">Available Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <img src={`http://localhost:7000/seller/getimage/${item.filename}`} alt="product" className="w-full h-40 object-cover mb-4" />
            <h2 className="text-xl font-semibold mb-2">{item.productName}</h2>
            <p className="text-gray-600 mb-2">{item.productDescription}</p>
            <p className="text-gray-700 mb-2">Manufacturer: {item.productManufacturer}</p>
            <p className="text-gray-700 mb-2">Quantity: {item.productQuantity}</p>
            <p className="text-gray-700 mb-2">Price: {item.productPrice}</p>
          </div>
        ))}
      </div>
      <NavBar />
    </div>
  );
};

export default ProductsPage;

