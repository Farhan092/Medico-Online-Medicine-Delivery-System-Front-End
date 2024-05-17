
// "use client";


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState<any[]>([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchCartItems();
//   }, []);

//   const fetchCartItems = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const email = localStorage.getItem('email');

//       if (!token || !email) {
//         throw new Error('Token or email not found in localStorage');
//       }

//       const headers = {
//         Authorization: `Bearer ${token}`,
//       };

//       const response = await axios.get(`http://localhost:5000/customer/viewcart?email=${email}`, { headers });

//       setCartItems(response.data);
//       calculateTotalPrice(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching cart items:', error);
//       setLoading(false);
//     }
//   };

//   const calculateTotalPrice = (items: any[]) => {
//     const totalPrice = items.reduce((acc, item) => {
//       return acc + (item.productPrice * item.productQuantity);
//     }, 0);

//     setTotalPrice(totalPrice);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Cart</h1>
//       <div className="grid grid-cols-1 gap-4">
//         {cartItems.length > 0 ? (
//           cartItems.map((item: any) => (
//             <div key={item.productId} className="border p-4">
//               <h2 className="text-lg font-semibold">{item.name}</h2>
//               <p>{item.productQuantity} * Price: {item.productPrice}</p>
//               <p>Quantity: {item.productQuantity}</p>
//               {/* <p>Price: {item.productQuantity}</p> */}
//             </div>
//           ))
//         ) : (
//           <p>Your cart is empty</p>
//         )}
//         <div className="border p-4">
//           <h2 className="text-lg font-semibold">Total Price</h2>
//           <p>Total: {totalPrice}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;
//special
// "use client";
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState<any[]>([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchCartItems();
//   }, []);

//   const fetchCartItems = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const email = localStorage.getItem('email');

//       if (!token || !email) {
//         throw new Error('Token or email not found in localStorage');
//       }

//       const headers = {
//         Authorization: `Bearer ${token}`,
//       };

//       const response = await axios.get(`http://localhost:5000/customer/viewcart?email=${email}`, { headers });

//       setCartItems(response.data);
//       calculateTotalPrice(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching cart items:', error);
//       setLoading(false);
//     }
//   };

//   const calculateTotalPrice = (items: any[]) => {
//     const totalPrice = items.reduce((acc, item) => {
//       return acc + (item.productPrice * item.productQuantity);
//     }, 0);

//     setTotalPrice(totalPrice);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Cart</h1>
//       <div className="grid grid-cols-1 gap-4">
//         {cartItems.length > 0 ? (
//           cartItems.map((item: any) => (
//             <div key={item.productId} className="border p-4">
//               <h2 className="text-lg font-semibold">{item.name}</h2>
//               <p>{item.productQuantity} * Price: {item.productPrice}</p>
//               <p>Quantity: {item.productQuantity}</p>
//             </div>
//           ))
//         ) : (
//           <p>Your cart is empty</p>
//         )}
//         <div className="border p-4">
//           <h2 className="text-lg font-semibold">Total Price</h2>
//           <p>Total: {totalPrice}</p>
//         </div>
//         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
//           Checkout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CartPage;

"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; 
import bottombar from '../components/bottombar';
import topbar from '../components/topbar';

const CartPage = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Initialize useRouter hook

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('email');

      if (!token || !email) {
        throw new Error('Token or email not found in localStorage');
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(`http://localhost:5000/customer/viewcart?email=${email}`, { headers });

      setCartItems(response.data);
      calculateTotalPrice(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setLoading(false);
    }
  };

  const calculateTotalPrice = (items: any[]) => {
    const totalPrice = items.reduce((acc, item) => {
      return acc + (item.productPrice * item.productQuantity);
    }, 0);

    setTotalPrice(totalPrice);
  };

  const handleCheckout = () => {
    // Navigate to the order page using router.push
    router.push('/order');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      <div className="grid grid-cols-1 gap-4">
        {cartItems.length > 0 ? (
          cartItems.map((item: any) => (
            <div key={item.productId} className="border p-4">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p>{item.productQuantity} * Price: {item.productPrice}</p>
              <p>Quantity: {item.productQuantity}</p>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
        <div className="border p-4">
          <h2 className="text-lg font-semibold">Total Price</h2>
          <p>Total: {totalPrice}</p>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;





