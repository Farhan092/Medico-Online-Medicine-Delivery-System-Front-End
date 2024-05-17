// export default function ProductCard(props: any) {

//     return (<>
 
//         {/* <div className="card bg-base-100 shadow-xl">
//             <figure><img src={'http://localhost:3001/seller/getimage/' + props.data.filename} width={400} /></figure>
//             <div className="card-body">
//                 <h2 className="card-title">ID: {props.data.name}</h2>
//                 Id:  {props.data.productId} <br />
//                 Code:  {props.data.productCode}<br />
//                 Name:  {props.data.productName}<br />
//                 Quantity:  {props.data.productQuantity}<br />
//                 Category:  {props.data.productCategory}<br />
//                 Price:  {props.data.productPrice}<br />
//                 <div className="card-actions justify-end">
//                 <button className="btn btn-error">Delete</button>
//                     <button className="btn btn-warning">Update</button>
//                 </div>
//             </div>
//             </div> */}   

// <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
//     <a href="#">
//         <img className="p-8 rounded-t-lg" src={'http://localhost:5000/customer/getimage/' + props.data.filename} alt="product image" />
//     </a>
//     <div className="px-5 pb-5">
//             <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
//                 {props.data.productName}
//             </h5>
//             Id:  {props.data.productId}<br />
//             {/* Code:  {props.data.productCode}<br /> */}
//             Quantity:  {props.data.productQuantity}<br />
//             {/* Category:  {props.data.productCategory}<br /> */}
//         <div className="flex items-center mt-2.5 mb-5">
//             {/* <div className="flex items-center space-x-1 rtl:space-x-reverse">
//                 <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
//                     <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
//                 </svg>
//                 <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
//                     <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
//                 </svg>
//                 <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
//                     <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
//                 </svg>
//                 <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
//                     <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
//                 </svg>
//                 <svg className="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
//                     <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
//                 </svg>
//             </div>
//             <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span> */}
//         </div>
//         <div className="flex items-center justify-between">
//             <span className="text-3xl font-bold text-gray-900 dark:text-white">৳{props.data.productPrice}</span>
//             {/* <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a> */}
//         </div> <br />
//         <div className="flex items-center justify-between">
//             {/* <Link href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</Link>
//             <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Delete</a> */}
//             <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</button>
//             <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buy now</button>
//         </div>
//     </div>
// </div>
                
//     </>);

// }
//special
// import React, { useState } from 'react';

// interface ProductCardProps {
//   data: {
//     productId: string;
//     productName: string;
//     productQuantity: number;
//     productPrice: number;
//     filename: string;
//   };
//   addToCart: (product: any, quantity: number) => void;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ data, addToCart }) => {
//   const [quantity, setQuantity] = useState(1);

//   const handleAddToCart = () => {
//     addToCart(data, quantity);
//   };

//   return (
//     <>
//       <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
//         <a href="#">
//           <img className="p-8 rounded-t-lg" src={'http://localhost:5000/customer/getimage/' + data.filename} alt="product image" />
//         </a>
//         <div className="px-5 pb-5">
//           <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
//             {data.productName}
//           </h5>
//           Id: {data.productId}<br />
//           Quantity: <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} /><br />
//           <div className="flex items-center justify-between">
//             <span className="text-3xl font-bold text-gray-900 dark:text-white">৳{data.productPrice}</span>
//           </div> <br />
//           <div className="flex items-center justify-between">
//             <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleAddToCart}>Add to cart</button>
//             <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buy now</button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ProductCard;

import React, { useState } from 'react';
import bottombar from '../components/bottombar';
import topbar from '../components/topbar';

interface ProductCardProps {
  data: {
    productId: string;
    productName: string;
    productQuantity: number;
    productPrice: number;
    filename: string;
  };
  addToCart: (product: any, quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ data, addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(data, quantity);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="p-4">
        <a href="#">
          <img className="w-full h-auto rounded-lg" src={'http://localhost:5000/customer/getimage/' + data.filename} alt="product image" />
        </a>
        <div className="mt-4">
          <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
            {data.productName}
          </h5>
          <p className="text-sm text-gray-600 dark:text-gray-400">Id: {data.productId}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Price: ৳{data.productPrice}</p>
          <div className="flex items-center justify-between mt-2">
            <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} className="w-20 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleAddToCart}>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;


