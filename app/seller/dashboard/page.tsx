'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/navigation';
import NavBar from '../components/navbar';
import TopBar from '../components/topbar';
import toast from 'react-hot-toast/headless';



interface Order {
  orderId: number;
  orderNumber: string;
  totalPrice: number;
  status: string;
  customer?: {
    customerId: number;
  };
  assignedTo?: string;
}

interface Product {
  productId: number;
  productName: string;
  productDescription: string;
  productPrice: number;
  //filename:string;
}

const DashboardPage: React.FC = () => {



  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [sellerId, setSellerId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [selectedOrderProducts, setSelectedOrderProducts] = useState<Product[]>([]);
  

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      fetchSellerId(email);
    }
  }, []);

  const fetchSellerId = async (email: string) => {
    try {
      const response = await axios.get<string | null>(`http://localhost:7000/seller/abc/${email}`);
      if (response.data !== null) {
        setSellerId(response.data);
        fetchOrders(response.data);
      } else {
        setMessage('Seller ID not found for email: ' + email);
      }
    } catch (error) {
      setMessage('Error fetching seller ID.');
    }
  };

  const fetchOrders = async (sellerId: string) => {
    try {
      const response = await axios.get<Order[]>(`http://localhost:7000/seller/seller/${sellerId}`);
      setOrders(response.data);
    } catch (error) {
      setMessage('Error fetching orders.');
    }
  };

  const handleApprove = async (orderId: number) => {
    const order = orders.find(order => order.orderId === orderId);
    if (order) {
      if (order.status === 'pending') {
        try {
          const response = await axios.put(`http://localhost:7000/seller/approve/${orderId}`);
          if (response.status === 200) {
            fetchOrders(sellerId || '');
            setMessage('Order approved successfully.'); 
          }
        } catch (error) {
          setMessage('Error approving order.'); 
        }
      } else {
        setMessage('Cannot approve order: Order already approved or cancelled or not found.'); 
      }
    } else {
      setMessage('Order not found.'); 
    }
  };

  const handleCancel = async (orderId: number) => {
    const order = orders.find(order => order.orderId === orderId);
    if (order) {
      if (order.status === 'pending') {
        try {
          const response = await axios.put(`http://localhost:7000/seller/cancel/${orderId}`);
          if (response.status === 200) {
            fetchOrders(sellerId || '');
            setMessage('Order cancelled successfully.'); 
          }
        } catch (error) {
          setMessage('Error cancelling order.');
        }
      } else {
        setMessage('Cannot cancel order: Order already approved or cancelled or not found.'); 
      }
    } else {
      setMessage('Order not found.'); 
    }
  };

  const handleAssignDeliveryMan = async (orderId: number) => {
    const order = orders.find(order => order.orderId === orderId);
    if (order) {
      if (order.status === 'Approved') { 
        const deliveryManId = prompt('Enter the ID of the delivery man to assign:');
        if (deliveryManId) {
          try {
            const response = await axios.post(`http://localhost:7000/seller/${orderId}/assign/${deliveryManId}`);
            if (response) {
              
              fetchOrders(sellerId || ''); 
              
              
              router.push('/dashboard');

              toast.success('Delivery man assigned successfully.');
             
            }
          } catch (error) {
            setMessage('Error assigning delivery man.'); 
          }
        }
      } else {
        setMessage('Cannot assign delivery man: Order is not approved.'); 
      }
    } else {
      setMessage('Order not found.'); 
    }
  };

  const fetchOrderProducts = async (orderId: number) => {
    try {
      const response = await axios.get<Product[]>(`http://localhost:7000/seller/order/${orderId}`);
      setSelectedOrderProducts(response.data);
    } catch (error) {
      console.error('Error fetching products for order:', error);
      
    }
  };

  return (<>

    <TopBar />
    
    <div className="bg-gray-100">
      
      
      <br />
      
      <br />
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-semibold mb-4">Order List</h1>

        {/* Display the message */}
        {message && <p className="text-red-500">{message}</p>}

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{order.orderNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.totalPrice}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`bg-blue-500 text-white rounded px-2 py-1`}>{order.status}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{order.customer?.customerId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.assignedTo || 'Not assigned'}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="btn bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 text-white font-bold py-2 px-4 rounded" onClick={() => handleApprove(order.orderId)}>Approve</button>
                  <button className="btn bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 text-white font-bold py-2 px-4 rounded" onClick={() => handleCancel(order.orderId)}>Cancel</button>
                  <button className="btn bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 text-white font-bold py-2 px-4 rounded" onClick={() => handleAssignDeliveryMan(order.orderId)}>Assign Delivery Man</button>
                  <button className="btn btn-active btn-neutral" onClick={() => fetchOrderProducts(order.orderId)}>View Product Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Display product details */}
        {selectedOrderProducts.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Selected Product Details</h2>
            <ul>
              {selectedOrderProducts.map((product, index) => (
                <li key={index}>
                  
                  <p><b>Product Name: </b>{product.productName}</p>
                  <p><b>Product Description: </b>{product.productDescription}</p>
                  <p><b>Product Price: </b>{product.productPrice}</p>
                  
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <NavBar />
    </div>
  </>);
};

export default DashboardPage;



