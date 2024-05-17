
// // "use client";
// // import axios from 'axios';
// // import React, { useEffect, useState } from 'react';
// // import { Toaster, toast } from 'react-hot-toast';
// // import ProductCard from '../components/productcard';

// // const Dashboard: React.FC = () => {
// //   const [jsonData, setJsonData] = useState([]);
// //   const [productName, setSearch] = useState('');
// //   const [searchData, setSearchData] = useState([]);
// //   const [flag, setFlag] = useState(0);
// //   const [email, setEmail] = useState<string>('');

// //   useEffect(() => {
// //     fetchProducts();
// //     const loggedInEmail = localStorage.getItem('email');
// //     if (loggedInEmail) {
// //       setEmail(loggedInEmail);
// //     }
// //   }, []);

// //   const fetchProducts = async () => {
// //     try {
// //       const response = await axios.get('http://localhost:5000/customer/allproduct');
// //       setJsonData(response.data);
// //     } catch (error) {
// //       console.error('Error fetching products:', error);
// //     }
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     try {
// //       const searchResponse = await axios.get(`http://localhost:3001/seller/search_product_name/${productName}`);
// //       setSearchData(searchResponse.data);
// //       setFlag(1);
// //     } catch (error) {
// //       console.error(error);
// //       toast.error('Error searching for product.');
// //     }
// //   };

// //   const addToCart = async (product: any, quantity: number) => {
// //     try {
// //       const cartResponse = await axios.post(`http://localhost:5000/customer/cart?email=${email}`, {
// //         productId: product.productId,
// //         name: product.productName,
// //         productQuantity: quantity,
// //         productPrice: product.productPrice
// //       });
// //       console.log(cartResponse.status);
// //       if (cartResponse.status === 201) {
// //         toast.success('Product added to cart.');
// //       } else {
// //         toast.error('Failed to add product to cart.');
// //       }
// //     } catch (error) {
// //       console.error(error);
// //       toast.error('Failed to add product to cart.');
// //     }
// //   };

// //   return (
// //     <div className="justify-center bg-gray-50 py-5 px-4 sm:px-6 lg:px-8">
// //       <Toaster />
// //       <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
// //         <label htmlFor="search" className="block text-gray-700 font-bold mb-2">
// //           Search
// //         </label>
// //         <input
// //           type="text"
// //           id="name"
// //           name="name"
// //           value={productName}
// //           onChange={(e) => setSearch(e.target.value)}
// //         />
// //         <button type="submit">Submit</button>
// //       </form>

// //       <div className="grid grid-cols-6 gap-2">
// //         {flag === 1 ? (
// //           searchData.map((item: any, index: number) => (
// //             <ProductCard key={index} data={item} addToCart={addToCart} />
// //           ))
// //         ) : (
// //           jsonData.map((item: any, index: number) => (
// //             <ProductCard key={index} data={item} addToCart={addToCart} />
// //           ))
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;

// "use client";
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Toaster, toast } from 'react-hot-toast';
// import ProductCard from '../components/productcard';

// const Dashboard: React.FC = () => {
//   const [jsonData, setJsonData] = useState([]);
//   const [productName, setSearch] = useState('');
//   const [searchData, setSearchData] = useState([]);
//   const [flag, setFlag] = useState(0);
//   const [email, setEmail] = useState<string>('');
//   const [cartItems, setCartItems] = useState([]);
//   const [viewCart, setViewCart] = useState(false);

//   useEffect(() => {
//     fetchProducts();
//     const loggedInEmail = localStorage.getItem('email');
//     if (loggedInEmail) {
//       setEmail(loggedInEmail);
//     }
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/customer/allproduct');
//       setJsonData(response.data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const searchResponse = await axios.get(`http://localhost:3001/seller/search_product_name/${productName}`);
//       setSearchData(searchResponse.data);
//       setFlag(1);
//     } catch (error) {
//       console.error(error);
//       toast.error('Error searching for product.');
//     }
//   };

//   const addToCart = async (product: any, quantity: number) => {
//     try {
//       const cartResponse = await axios.post(`http://localhost:5000/customer/cart?email=${email}`, {
//         productId: product.productId,
//         name: product.productName,
//         productQuantity: quantity,
//         productPrice: product.productPrice
//       });
//       console.log(cartResponse.status);
//       if (cartResponse.status === 201) {
//         toast.success('Product added to cart.');
//       } else {
//         toast.error('Failed to add product to cart.');
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error('Failed to add product to cart.');
//     }
//   };

//   const viewCartItems = async () => {
//     try {
//       const cartResponse = await axios.get(`http://localhost:5000/customer/viewcart?email=${email}`);
//       console.log("Cart Response:", cartResponse.data); // Log the response
//       setCartItems(cartResponse.data);
//       setViewCart(true);
//     } catch (error) {
//       console.error(error);
//       toast.error('Error fetching cart items.');
//     }
//   };

//   const cancelViewCart = () => {
//     setViewCart(false);
//   };

//   return (
//     <div className="justify-center bg-gray-50 py-5 px-4 sm:px-6 lg:px-8">
//       <Toaster />
//       {viewCart ? (
//         <div>
//           <button onClick={cancelViewCart}>Cancel</button>
//           <div>
//             {/* Render cart items */}
//             {cartItems.map((item: any, index: number) => (
//               <div key={index}>{/* Render cart item details */}</div>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <div>
//           <button onClick={viewCartItems} className="float-right">View Cart</button>
//           <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//             <label htmlFor="search" className="block text-gray-700 font-bold mb-2">
//               Search
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={productName}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//             <button type="submit">Submit</button>
//           </form>

//           <div className="grid grid-cols-6 gap-2">
//             {flag === 1 ? (
//               searchData.map((item: any, index: number) => (
//                 <ProductCard key={index} data={item} addToCart={addToCart} />
//               ))
//             ) : (
//               jsonData.map((item: any, index: number) => (
//                 <ProductCard key={index} data={item} addToCart={addToCart} />
//               ))
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;




// "use client";
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Toaster, toast } from 'react-hot-toast';
// import ProductCard from '../components/productcard';

// const Dashboard: React.FC = () => {
//   const [jsonData, setJsonData] = useState([]);
//   const [productName, setSearch] = useState('');
//   const [searchData, setSearchData] = useState([]);
//   const [flag, setFlag] = useState(0);
//   const [email, setEmail] = useState<string>('');
//   const [cartItems, setCartItems] = useState([]);
//   const [viewCart, setViewCart] = useState(false);

//   useEffect(() => {
//     fetchProducts();
//     const loggedInEmail = localStorage.getItem('email');
//     if (loggedInEmail) {
//       setEmail(loggedInEmail);
//     }
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/customer/allproduct');
//       setJsonData(response.data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const searchResponse = await axios.get(`http://localhost:3001/seller/search_product_name/${productName}`);
//       setSearchData(searchResponse.data);
//       setFlag(1);
//     } catch (error) {
//       console.error(error);
//       toast.error('Error searching for product.');
//     }
//   };

//   const addToCart = async (product: any, quantity: number) => {
//     try {
//       const cartResponse = await axios.post(`http://localhost:5000/customer/cart?email=${email}`, {
//         productId: product.productId,
//         name: product.productName,
//         productQuantity: quantity,
//         productPrice: product.productPrice
//       });
//       console.log(cartResponse.status);
//       if (cartResponse.status === 201) {
//         toast.success('Product added to cart.');
//       } else {
//         toast.error('Failed to add product to cart.');
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error('Failed to add product to cart.');
//     }
//   };

//   const viewCartItems = async () => {
//     try {
//       const cartResponse = await axios.get(`http://localhost:5000/customer/viewcart?email=${email}`);
//       setCartItems(cartResponse.data);
//       setViewCart(true);
//     } catch (error) {
//       console.error(error);
//       toast.error('Error fetching cart items.');
//     }
//   };

//   const cancelViewCart = () => {
//     setViewCart(false);
//   };

//   return (
//     <div className="justify-center bg-gray-50 py-5 px-4 sm:px-6 lg:px-8">
//       <Toaster />
//       {viewCart ? (
//         <div>
//           <button onClick={cancelViewCart}>Cancel</button>
//           <div>
//             {/* Render cart items */}
//             {cartItems.map((item: any, index: number) => (
//               <div key={index}>
//                 <p>Name: {item.name}</p>
//                 <p>Price: {item.productPrice}</p>
//                 <p>Quantity: {item.productQuantity}</p>
//                 {/* Add any other fields you want to display */}
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <div>
//           <button onClick={viewCartItems} className="float-right">View Cart</button>
//           <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//             <label htmlFor="search" className="block text-gray-700 font-bold mb-2">
//               Search
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={productName}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//             <button type="submit">Submit</button>
//           </form>

//           <div className="grid grid-cols-6 gap-2">
//             {flag === 1 ? (
//               searchData.map((item: any, index: number) => (
//                 <ProductCard key={index} data={item} addToCart={addToCart} />
//               ))
//             ) : (
//               jsonData.map((item: any, index: number) => (
//                 <ProductCard key={index} data={item} addToCart={addToCart} />
//               ))
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

//special
// "use client";
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Toaster, toast } from 'react-hot-toast';
// import ProductCard from '../components/productcard';

// const Dashboard: React.FC = () => {
//   const [jsonData, setJsonData] = useState([]);
//   const [email, setEmail] = useState<string>('');
//   const [cartItems, setCartItems] = useState([]);
//   const [viewCart, setViewCart] = useState(false);

//   useEffect(() => {
//     fetchProducts();
//     const loggedInEmail = localStorage.getItem('email');
//     if (loggedInEmail) {
//       setEmail(loggedInEmail);
//     }
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/customer/allproduct');
//       setJsonData(response.data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   const addToCart = async (product: any, quantity: number) => {
//     try {
//       const cartResponse = await axios.post(`http://localhost:5000/customer/cart?email=${email}`, {
//         productId: product.productId,
//         name: product.productName,
//         productQuantity: quantity,
//         productPrice: product.productPrice
//       });
//       if (cartResponse.status === 201) {
//         toast.success('Product added to cart.');
//       } else {
//         toast.error('Failed to add product to cart.');
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error('Failed to add product to cart.');
//     }
//   };

//   const viewCartItems = async () => {
//     try {
//       const cartResponse = await axios.get(`http://localhost:5000/customer/viewcart?email=${email}`);
//       setCartItems(cartResponse.data);
//       setViewCart(true);
//     } catch (error) {
//       console.error(error);
//       toast.error('Error fetching cart items.');
//     }
//   };

//   const cancelViewCart = () => {
//     setViewCart(false);
//   };

//   return (
//     <div className="justify-center bg-gray-50 py-5 px-4 sm:px-6 lg:px-8">
//       <Toaster />
//       {viewCart ? (
//         <div>
//           <button onClick={cancelViewCart}>Cancel</button>
//           <div>
//             {/* Render cart items */}
//             {cartItems.map((item: any, index: number) => (
//               <div key={index}>
//                 <p>Name: {item.name}</p>
//                 <p>Price: {item.productPrice}</p>
//                 <p>Quantity: {item.productQuantity}</p>
//                 {/* Add any other fields you want to display */}
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <div>
//           <button onClick={viewCartItems} className="float-right">View Cart</button>

//           <div className="grid grid-cols-6 gap-2">
//             {jsonData.map((item: any, index: number) => (
//               <ProductCard key={index} data={item} addToCart={addToCart} />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;
//special1
// "use client";
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Toaster, toast } from 'react-hot-toast';
// import ProductCard from '../components/productcard';

// const Dashboard: React.FC = () => {
//   const [jsonData, setJsonData] = useState([]);
//   const [email, setEmail] = useState<string>('');
//   const [cartItems, setCartItems] = useState([]);
//   const [viewCart, setViewCart] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     fetchProducts();
//     const loggedInEmail = localStorage.getItem('email');
//     if (loggedInEmail) {
//       setEmail(loggedInEmail);
//     }
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/customer/allproduct');
//       setJsonData(response.data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   const addToCart = async (product: any, quantity: number) => {
//     try {
//       const cartResponse = await axios.post(`http://localhost:5000/customer/cart?email=${email}`, {
//         productId: product.productId,
//         name: product.productName,
//         productQuantity: quantity,
//         productPrice: product.productPrice
//       });
//       if (cartResponse.status === 201) {
//         toast.success('Product added to cart.');
//       } else {
//         toast.error('Failed to add product to cart.');
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error('Failed to add product to cart.');
//     }
//   };

//   const viewCartItems = async () => {
//     try {
//       const cartResponse = await axios.get(`http://localhost:5000/customer/viewcart?email=${email}`);
//       setCartItems(cartResponse.data);
//       setViewCart(true);
//     } catch (error) {
//       console.error(error);
//       toast.error('Error fetching cart items.');
//     }
//   };

//   const cancelViewCart = () => {
//     setViewCart(false);
//   };

//   const filteredProducts = jsonData.filter(item =>
//     item.productName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="justify-center bg-gray-50 py-5 px-4 sm:px-6 lg:px-8">
//       <Toaster />
//       <input
//         type="text"
//         placeholder="Search by product name"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//       />
//       {viewCart ? (
//         <div>
//           <button onClick={cancelViewCart}>Cancel</button>
//           <div>
//             {/* Render cart items */}
//             {cartItems.map((item: any, index: number) => (
//               <div key={index}>
//                 <p>Name: {item.name}</p>
//                 <p>Price: {item.productPrice}</p>
//                 <p>Quantity: {item.productQuantity}</p>
//                 {/* Add any other fields you want to display */}
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <div>
//           <button onClick={viewCartItems} className="float-right">View Cart</button>

//           <div className="grid grid-cols-6 gap-2">
//             {filteredProducts.map((item: any, index: number) => (
//               <ProductCard key={index} data={item} addToCart={addToCart} />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;
"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import ProductCard from '../components/productcard';
import Bottombar from '../components/bottombar';
import Topbar from '../components/topbar';

interface Product {
  productQuantity: number;
  productId: string;
  productName: string;
  productPrice: number;
  filename: string;

  
}

const Dashboard: React.FC = () => {
  const [jsonData, setJsonData] = useState<Product[]>([]);
  const [email, setEmail] = useState<string>('');
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [viewCart, setViewCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
    const loggedInEmail = localStorage.getItem('email');
    if (loggedInEmail) {
      setEmail(loggedInEmail);
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>('http://localhost:5000/customer/allproduct');
      setJsonData(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addToCart = async (product: Product, quantity: number) => {
    try {
      const cartResponse = await axios.post(`http://localhost:5000/customer/cart?email=${email}`, {
        productId: product.productId,
        name: product.productName,
        productQuantity: quantity,
        productPrice: product.productPrice
      });
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

  const viewCartItems = async () => {
    try {
      const cartResponse = await axios.get<Product[]>(`http://localhost:5000/customer/viewcart?email=${email}`);
      setCartItems(cartResponse.data);
      setViewCart(true);
    } catch (error) {
      console.error(error);
      toast.error('Error fetching cart items.');
    }
  };

  const cancelViewCart = () => {
    setViewCart(false);
  };

  const filteredProducts = jsonData.filter(item =>
    item.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (<>
    <Topbar/>
    <div className="justify-center bg-gray-50 py-5 px-4 sm:px-6 lg:px-8">
      
      <Toaster />
      <input
        type="text"
        placeholder="Search by product name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
      {viewCart ? (
        <div>
          <button onClick={cancelViewCart}>Cancel</button>
          <div>
            {}
            {cartItems.map((item: Product, index: number) => (
              <div key={index}>
                <p>Name: {item.productName}</p>
                <p>Price: {item.productPrice}</p>
                <p>Quantity: {item.productQuantity}</p>
                {}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <button onClick={viewCartItems} className="float-right">View Cart</button>

          <div className="grid grid-cols-6 gap-2">
            {filteredProducts.map((item: Product, index: number) => (
              <ProductCard key={index} data={item} addToCart={addToCart} />
            ))}
          </div>
        </div>
      )}
    </div>
    <Bottombar/>
  </>);
};

export default Dashboard;

