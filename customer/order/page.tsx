// "use client";
// import React, { useState } from 'react';

// const OrderPage = () => {
//   const [paymentType, setPaymentType] = useState('');
//   const [paymentAmount, setPaymentAmount] = useState('');
//   const [showAmountInput, setShowAmountInput] = useState(false);

//   const handlePaymentTypeChange = (e:any) => {
//     const selectedType = e.target.value;
//     setPaymentType(selectedType);
//     if (selectedType === 'pay_now') {
//       setShowAmountInput(true);
//     } else {
//       setShowAmountInput(false);
//     }
//   };

//   const handleAmountChange = (e:any) => {
//     setPaymentAmount(e.target.value);
//   };

//   const handleOrder = () => {
//     // Perform order action
//     console.log('Order placed!');
//   };

//   return (
//     <div className="container mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Order</h1>
//       <div className="grid grid-cols-1 gap-4">
//         <div className="border p-4">
//           <h2 className="text-lg font-semibold">Payment Type</h2>
//           <div className="mt-2">
//             <input type="radio" id="cash_on_delivery" name="payment_type" value="cash_on_delivery" onChange={handlePaymentTypeChange} checked={paymentType === 'cash_on_delivery'} />
//             <label htmlFor="cash_on_delivery" className="ml-2">Cash on Delivery</label>
//           </div>
//           <div className="mt-2">
//             <input type="radio" id="pay_now" name="payment_type" value="pay_now" onChange={handlePaymentTypeChange} checked={paymentType === 'pay_now'} />
//             <label htmlFor="pay_now" className="ml-2">Pay Now</label>
//           </div>
//           {showAmountInput && (
//             <div className="mt-4">
//               <label htmlFor="payment_amount" className="block mb-2">Enter Amount:</label>
//               <input type="text" id="payment_amount" name="payment_amount" value={paymentAmount} onChange={handleAmountChange} className="border border-gray-300 rounded-md px-4 py-2 w-full" />
//             </div>
//           )}
//         </div>
//         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleOrder}>Place Order</button>
//       </div>
//     </div>
//   );
// };

// export default OrderPage;
// "use client";
// import React, { useState } from 'react';
// import axios from 'axios';
// import Bottombar from '../components/bottombar';
// import Topbar from '../components/topbar';

// const OrderPage = () => {
//   const [paymentType, setPaymentType] = useState('');
//   const [paymentAmount, setPaymentAmount] = useState('');
//   const [showAmountInput, setShowAmountInput] = useState(false);
//   const [orderPlaced, setOrderPlaced] = useState(false);
//   const [email, setEmail] = useState('');

//   const handlePaymentTypeChange = (e:any) => {
//     const selectedType = e.target.value;
//     setPaymentType(selectedType);
//     if (selectedType === 'pay_now') {
//       setShowAmountInput(true);
//     } else {
//       setShowAmountInput(false);
//     }
//   };

//   const handleAmountChange = (e:any) => {
//     setPaymentAmount(e.target.value);
//   };

//   const handleOrder = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const email = localStorage.getItem('email');

//       if (!token || !email) {
//         throw new Error('Token or email not found in localStorage');
//       }

//       const headers = {
//         Authorization: `Bearer ${token}`,
//       };

//       // Send Axios POST request to make order
//       const response = await axios.post(`http://localhost:5000/customer/order/${email}`, { paymentType, paymentAmount }, { headers });

//       // Check if order was successful
//       if (response.status) {
//         // Update state to indicate order placed
//         setOrderPlaced(true);
//       } else {
//         throw new Error('Failed to place order');
//       }
//     } catch (error) {
//       console.error('Error placing order:', error);
//     }
//   };

//   return (<>
//   <Topbar/>
//     <div className="container mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Order</h1>
//       <div className="grid grid-cols-1 gap-4">
//         <div className="border p-4">
//           <h2 className="text-lg font-semibold">Payment Type</h2>
//           <div className="mt-2">
//             <input type="radio" id="cash_on_delivery" name="payment_type" value="cash_on_delivery" onChange={handlePaymentTypeChange} checked={paymentType === 'cash_on_delivery'} />
//             <label htmlFor="cash_on_delivery" className="ml-2">Cash on Delivery</label>
//           </div>
//           <div className="mt-2">
//             <input type="radio" id="pay_now" name="payment_type" value="pay_now" onChange={handlePaymentTypeChange} checked={paymentType === 'pay_now'} />
//             <label htmlFor="pay_now" className="ml-2">Pay Now</label>
//           </div>
//           {showAmountInput && (
//             <div className="mt-4">
//               <label htmlFor="payment_amount" className="block mb-2">Enter Amount:</label>
//               <input type="text" id="payment_amount" name="payment_amount" value={paymentAmount} onChange={handleAmountChange} className="border border-gray-300 rounded-md px-4 py-2 w-full" />
//             </div>
//           )}
//         </div>
//         {orderPlaced ? (
//           <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
//             Your order has been placed!
//           </div>
//         ) : (
//           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleOrder}>Place Order</button>
//         )}
//       </div>
//     </div>
//     <Bottombar/>
//   </>);
// };

// export default OrderPage;
"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Bottombar from '../components/bottombar';
import Topbar from '../components/topbar';

const OrderPage = () => {
  const [paymentType, setPaymentType] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [showAmountInput, setShowAmountInput] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const router = useRouter();

  const handlePaymentTypeChange = (e:any) => {
    const selectedType = e.target.value;
    setPaymentType(selectedType);
    if (selectedType === 'pay_now') {
      setShowAmountInput(true);
    } else {
      setShowAmountInput(false);
    }
  };

  const handleAmountChange = (e:any) => {
    setPaymentAmount(e.target.value);
  };

  const handleOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('email');

      if (!token || !email) {
        throw new Error('Token or email not found in localStorage');
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Send Axios POST request to make order
      const response = await axios.post(`http://localhost:5000/customer/order/${email}`, { paymentType, paymentAmount }, { headers });

      // Check if order was successful
      if (response.status) {
        // Update state to indicate order placed
        setOrderPlaced(true);
      } else {
        throw new Error('Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const goToCustomerDatabase = () => {
    router.push('/customerdashboard');
  };

  return (
    <>
      <Topbar />
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Order</h1>
        <div className="grid grid-cols-1 gap-4">
          <div className="border p-4">
            <h2 className="text-lg font-semibold">Payment Type</h2>
            <div className="mt-2">
              <input type="radio" id="cash_on_delivery" name="payment_type" value="cash_on_delivery" onChange={handlePaymentTypeChange} checked={paymentType === 'cash_on_delivery'} />
              <label htmlFor="cash_on_delivery" className="ml-2">Cash on Delivery</label>
            </div>
            <div className="mt-2">
              <input type="radio" id="pay_now" name="payment_type" value="pay_now" onChange={handlePaymentTypeChange} checked={paymentType === 'pay_now'} />
              <label htmlFor="pay_now" className="ml-2">Pay Now</label>
            </div>
            {showAmountInput && (
              <div className="mt-4">
                <label htmlFor="payment_amount" className="block mb-2">Enter Amount:</label>
                <input type="text" id="payment_amount" name="payment_amount" value={paymentAmount} onChange={handleAmountChange} className="border border-gray-300 rounded-md px-4 py-2 w-full" />
              </div>
            )}
          </div>
          {orderPlaced && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              Your order has been placed! <a href="#" onClick={goToCustomerDatabase} className="underline">Go back to Customer Database</a>
            </div>
          )}
          {!orderPlaced && (
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleOrder}>Place Order</button>
          )}
        </div>
      </div>
      <Bottombar />
    </>
  );
};

export default OrderPage;


