// const OrderTable = () => {
//     return (
//       <div className="overflow-x-auto">
//         <table className="min-w-full table-auto border-collapse border border-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Item</th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Status</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {/* Example data */}
//             <tr>
//               <td className="px-4 py-2 whitespace-nowrap">1</td>
//               <td className="px-4 py-2 whitespace-nowrap">John Doe</td>
//               <td className="px-4 py-2 whitespace-nowrap">john@example.com</td>
//               <td className="px-4 py-2 whitespace-nowrap">123-456-7890</td>
//               <td className="px-4 py-2 whitespace-nowrap">123 Main St, City</td>
//               <td className="px-4 py-2 whitespace-nowrap">Product A, Product B</td>
//               <td className="px-4 py-2 whitespace-nowrap">Pending</td>
//             </tr>
//             {/* Add more rows as needed */}
//           </tbody>
//         </table>
//         <button type="submit" className=" bg-[#22c55e] hover:bg-[#16a34a] text-white py-2 px-4 rounded focus:outline-none   ml-[850px]  my-5">Update status</button>
//       </div>
      

      
//     );
//   };
  
//   export default OrderTable;
  
// "use client"
// import { useState } from 'react';
// import axios from 'axios';

// const OrderTable = () => {
//   // State to hold the updated status
//   const [updatedStatus, setUpdatedStatus] = useState('');

//   // Function to handle status update
//   const handleUpdateStatus = async () => {
//     try {
//       // Make a request to update the status in the database
//       const response = await axios.put('http://localhost:3000/deliveryman/updatestatus/:email', {
//         status: updatedStatus // Use the updatedStatus state variable here
//       });

//       // Check if the status update was successful
//       if (response.status === 200) {
//         alert('Status updated successfully!');
//         // Clear the updatedStatus state after successful update
//         setUpdatedStatus('');
//       } else {
//         alert('Failed to update status. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error updating status:', error);
//       alert('Failed to update status. Please try again.');
//     }
//   };

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full table-auto border-collapse border border-gray-200">
//         {/* Table headers */}
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
//             <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//             <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//             <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//             <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
//             <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Item</th>
//             <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Status</th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {/* Example data */}
//           <tr>
//             <td className="px-4 py-2 whitespace-nowrap">1</td>
//             <td className="px-4 py-2 whitespace-nowrap">John Doe</td>
//             <td className="px-4 py-2 whitespace-nowrap">john@example.com</td>
//             <td className="px-4 py-2 whitespace-nowrap">123-456-7890</td>
//             <td className="px-4 py-2 whitespace-nowrap">123 Main St, City</td>
//             <td className="px-4 py-2 whitespace-nowrap">Product A, Product B</td>
//             <td className="px-4 py-2 whitespace-nowrap">Pending</td>
//           </tr>
//           {/* Add more rows as needed */}
//         </tbody>
//       </table>
      
//       {/* Button to update status */}
//       <div className="text-center mt-5">
//         <input
//           type="text"
//           className="border border-gray-300 rounded-md px-4 py-2 mr-2"
//           placeholder="Enter updated status"
//           value={updatedStatus}
//           onChange={(e) => setUpdatedStatus(e.target.value)}
//         />
//         <button
//           type="button"
//           className="bg-[#22c55e] hover:bg-[#16a34a] text-white py-2 px-4 rounded focus:outline-none"
//           onClick={handleUpdateStatus}
//         >
//           Update Status
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OrderTable;
"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
 
// Define the type for the Order
interface Order {
  OrderId: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  orderItem: string;
  orderStatus: string;
}
 
const OrderTable = () => {
  // Set initial state to an empty array of Order type
  const [orders, setOrders] = useState<Order[]>([]);
 
  useEffect(() => {
    fetchOrders();
  }, []);
 
  const fetchOrders = async () => {
    try {
      const response = await axios.get<Order[]>('http://localhost:3000/deliveryman/orders');
      setOrders(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
 
  const handleUpdateStatus = async (email: string) => {
    try {
      const response = await axios.put(`http://localhost:3000/deliveryman/updatestatus/${email}`, { orderStatus: 'Delivered' });
      if (response) {
        // Update the status of the order in the local state
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.email === email ? { ...order, orderStatus: 'Delivered' } : order
          )
        );
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
 
  return (
<div className="overflow-x-auto">
<table className="min-w-full table-auto border-collapse border border-gray-200">
<thead className="bg-gray-50">
<tr>
<th>Order ID</th>
<th>Name</th>
<th>Email</th>
<th>Phone</th>
<th>Address</th>
<th>Order Item</th>
<th>Order Status</th>
<th>Action</th>
</tr>
</thead>
<tbody>
          {orders.map((order) => (
<tr key={order.OrderId}>
<td>{order.OrderId}</td>
<td>{order.name}</td>
<td>{order.email}</td>
<td>{order.phone}</td>
<td>{order.address}</td>
<td>{order.orderItem}</td>
<td>{order.orderStatus}</td>
<td>
                {order.orderStatus !== 'Delivered' && (
<button onClick={() => handleUpdateStatus(order.email)}>Update Status</button>
                )}
</td>
</tr>
          ))}
</tbody>
</table>
</div>
  );
};
 
export default OrderTable;