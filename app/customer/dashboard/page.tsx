// pages/dashboard.tsx

// import React from 'react';

// const Dashboard = () => {
//     return (
//         <div>
//             <h1>Welcome to the Dashboard</h1>
//             {/* You can add more content here */}
//         </div>
//     );
// };

// export default Dashboard;

// "use client"
// import axios from 'axios';
// import { Toaster, toast } from 'react-hot-toast';
// //import Session from '../components/session';
// import ProductCard from '../components/productcard';
// //import { useRouter } from 'next/router';
// import { useRouter } from 'next/navigation';
// import React, { useEffect, useState } from 'react';
// //import UpdateProduct from '../update_product/page';


// export default function Dashboard() {
  
//    const router = useRouter();
//    const [jsonData, setJsonData] = useState([]);
//    const [productName, setSearch] = useState('');
//    //const [searchData, setSearchData] = useState('');

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   function handleUpdate(items: any){

//         // UpdateProduct(items);
//         // router.push('/update_product');

//   }

//   const fetchProducts = async () => {
//     try {
//       const response: any = await axios.get('http://localhost:5000/customer/allproduct');
//       const jsonData = response.data
//       setJsonData(jsonData);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   var flag = 0;
//   var searchData: any;
//   //var jsonData: any;

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     try {
//       const search: any = await axios.get('http://localhost:3001/seller/search_product_name/' + productName);
//       searchData = search.data;
//       flag = 1;
//       //setSearchData(searchData);
//       //fetchProducts();
//       } catch (error) {
//       console.error(error);
//       }
//       console.log(productName);
//       console.log(searchData);
//   };
//   // const fetchProducts = async () => {
//   //   if(flag == 1){
//   //     const response: any = await axios.get('http://localhost:3001/seller/search_product_name/' + productName);
//   //     jsonData = response.data;
//   //     return jsonData;
//   //   }
//   //   else{
//   //     const response: any = await axios.get('http://localhost:3001/seller/show_all_product');
//   //     jsonData = response.data
//   //     return jsonData;
//   //   }

//   // }

//   function setSearchData(searchdata: any){

//     return(
//       <>
//         {searchdata.map((items: any) => {
//             return (
//               <>
//                 <ProductCard data={items} />
//               </>

//             );
//           }

//         )}
//       </>
//     );

//   }
//   if(flag == 1){
//     return(
//       <>
//           {/* {searchData.map((items: any) => {
//             return (
//               <ProductCard data={items} />

//             );
//           }

//           )} */}
//           <h1>{setSearchData(searchData)}</h1>

//       </>
//     );
//   }
  
//   else{
//   return (<>
//     {/* <Session /> */}
//      <div className=" justify-center bg-gray-50 py-5 px-4 sm:px-6 lg:px-8">
//       <Toaster />
//       <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//           <label htmlFor="search" className="block text-gray-700 font-bold mb-2">
//             Search
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={productName}
//             onChange={(e) => setSearch(e.target.value)}
//             //className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//           <button type="submit">Submit</button>
//       </form>

//       <div className="grid grid-cols-6 gap-2">
//         {jsonData.map((items: any, index: any) => {
//            return (<div key={index}>
//             {/* <ProductCard data={items} /> */}
//             <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
//               <a href="#">
//                 <img className="p-8 rounded-t-lg" src={'http://localhost:5000/customer/getimage/' + items.filename} alt="product image" />
//               </a>
//               <div className="px-5 pb-5">
//                 <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
//                   {items.productName}
//                 </h5>
//               Id:  {items.productId}<br />
//               {/* Code:  {items.productCode}<br /> */}
//               Quantity:  {items.productQuantity}<br />
//               {/* Category:  {items.productCategory}<br /> */}
//               <div className="flex items-center justify-between">
//                 <span className="text-3xl font-bold text-gray-900 dark:text-white">৳{items.productPrice}</span>
                
//               </div> <br />
//               <div className="flex items-center justify-between">
//             {/* <Link href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</Link>
//             <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Delete</a> */}
//                 <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => handleUpdate(items)}>Add to cart</button>
//                 <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buy now</button>
//               </div>
//               </div>
//             </div>
//           </div>

//           );
//         }


//         )}
//       </div>
//     </div>
//   </>);
//   }
// }
///special
"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import ProductCard from '../components/productcard';

const Dashboard: React.FC = () => {
  const [jsonData, setJsonData] = useState([]);
  const [productName, setSearch] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [flag, setFlag] = useState(0);
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    fetchProducts();
    const loggedInEmail = localStorage.getItem('email');
    if (loggedInEmail) {
      setEmail(loggedInEmail);
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/customer/allproduct');
      setJsonData(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const searchResponse = await axios.get(`http://localhost:3001/seller/search_product_name/${productName}`);
      setSearchData(searchResponse.data);
      setFlag(1);
    } catch (error) {
      console.error(error);
      toast.error('Error searching for product.');
    }
  };

  const addToCart = async (product: any, quantity: number) => {
    try {
      const cartResponse = await axios.post(`http://localhost:5000/customer/cart?email=${email}`, {
        productId: product.productId,
        name: product.productName,
        productQuantity: quantity,
        productPrice: product.productPrice
      });
      console.log(cartResponse.status);
      if (cartResponse.status === 201) {
        toast.success('Product added to cart.');
      } else {
        toast.error('Failed to add product to cart.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to add product to cart.');
    }
  };

  return (
    <div className="justify-center bg-gray-50 py-5 px-4 sm:px-6 lg:px-8">
      <Toaster />
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <label htmlFor="search" className="block text-gray-700 font-bold mb-2">
          Search
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={productName}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <div className="grid grid-cols-6 gap-2">
        {flag === 1 ? (
          searchData.map((item: any, index: number) => (
            <ProductCard key={index} data={item} addToCart={addToCart} />
          ))
        ) : (
          jsonData.map((item: any, index: number) => (
            <ProductCard key={index} data={item} addToCart={addToCart} />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;







