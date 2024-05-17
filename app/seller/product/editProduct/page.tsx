
'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import NavBar from '../../components/navbar';
import TopBar from '../../components/topbar';


const UpdateProduct = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<{
    productId: number;
    productName: string;
    productDescription: string;
    productManufacturer: string;
    productQuantity: number;
    productPrice: number;
  } | null>(null);

  const [updateData, setUpdateData] = useState({
    productName: '' as string,
    productDescription: '' as string,
    productManufacturer: '' as string,
    productQuantity: '' as string,
    productPrice: '' as string,
    filename: undefined as File | undefined,
  });

  const [errors, setErrors] = useState<Partial<typeof updateData>>({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:7000/seller/view_all_product');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleProductSelect = (product: any) => {
    if (product.productId !== undefined) {
      setSelectedProduct(product);
      setUpdateData({
        productName: product.productName,
        productDescription: product.productDescription,
        productManufacturer: product.productManufacturer,
        productQuantity: product.productQuantity.toString(),
        productPrice: product.productPrice.toString(),
        filename: undefined,
      });
    } else {
      console.error('Selected product has no ID.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;

    try {
      if (!selectedProduct) {
        console.error('No product selected.');
        return;
      }

      const formData = new FormData();
      Object.entries(updateData).forEach(([key, value]) => {
        if (value !== undefined) {
          if (value instanceof File) {
            formData.append(key, value);
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      const response = await axios.put(
        `http://localhost:7000/seller/update/${selectedProduct.productId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        toast.success('Product updated successfully!');
        const updatedProducts = products.map((product) => {
          if (product.productId === selectedProduct.productId) {
            return {
              ...product,
              ...updateData
            };
          }
          return product;
        });
        setProducts(updatedProducts);
        setSelectedProduct(null);
        setUpdateData({
          productName: '',
          productDescription: '',
          productManufacturer: '',
          productQuantity: '',
          productPrice: '',
          filename: undefined,
        });
      } else {
        console.error('Failed to update product.');
        toast.error('Failed to update product. Please try again.');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product. Please try again.');
    }
  };

  const handleDelete = async () => {
    try {
      if (!selectedProduct) {
        console.error('No product selected.');
        return;
      }
  
      const response = await axios.delete(`http://localhost:7000/seller/delete_product/?name=${selectedProduct.productName}`);
      if (response.status === 200) {
        toast.success('Product deleted successfully!');
        const updatedProducts = products.filter((product) => product.productId !== selectedProduct.productId);
        setProducts(updatedProducts);
        setSelectedProduct(null);
        setUpdateData({
          productName: '',
          productDescription: '',
          productManufacturer: '',
          productQuantity: '',
          productPrice: '',
          filename: undefined,
        });
      } else {
        console.error('Failed to delete product.');
        toast.error('Failed to delete product. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product. Please try again.');
    }
  };

  const validateForm = () => {
    const errors: Partial<typeof updateData> = {};

    if (!updateData.productName) {
      errors.productName = 'Product Name is required';
    } else if (!/^[a-zA-Z]+$/.test(updateData.productName)) {
      errors.productName = 'Product Name must contain only alphabets';
    }

    if (!updateData.productDescription) {
      errors.productDescription = 'Product Description is required';
    }

    if (!updateData.productManufacturer) {
      errors.productManufacturer = 'Product Manufacturer is required';
    }

    if (!updateData.productQuantity) {
      errors.productQuantity = 'Product Quantity is required';
    } else if (isNaN(Number(updateData.productQuantity))) {
      errors.productQuantity = 'Product Quantity must be a number';
    }

    if (!updateData.productPrice) {
      errors.productPrice = 'Product Price is required';
    } else if (isNaN(Number(updateData.productPrice))) {
      errors.productPrice = 'Product Price must be a number';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar/>
      <div className="flex-grow flex"></div>
      <div className="w-1/2 p-4">
        <h2 className="text-2xl font-bold mb-4">Products</h2>
        <Toaster />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-md p-4 shadow-md">
              <span className="block font-semibold mb-2">{product.productName}</span>
              <button className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded" onClick={() => handleProductSelect(product)}>Select</button>
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/2 p-4">
        {selectedProduct && (
          <form onSubmit={handleSubmit} className="mt-8">
            
            <label className="block mb-4">
              Product Name:
              <input
                type="text"
                name="productName"
                value={updateData.productName}
                onChange={handleInputChange}
                className={`block border border-gray-300 rounded-md px-4 py-2 mt-2 w-full ${errors.productName && 'border-red-500'}`}
                required
              />
              {errors.productName && <p className="text-red-500 text-xs italic">{errors.productName}</p>}
            </label>

            <label className="block mb-4">
              Product Description:
              <textarea
                name="productDescription"
                value={updateData.productDescription}
                onChange={handleInputChange}
                className={`block border border-gray-300 rounded-md px-4 py-2 mt-2 w-full ${errors.productDescription && 'border-red-500'}`}
                required
              ></textarea>
              {errors.productDescription && <p className="text-red-500 text-xs italic">{errors.productDescription}</p>}
            </label>

            <label className="block mb-4">
              Product Manufacturer:
              <input
                type="text"
                name="productManufacturer"
                value={updateData.productManufacturer}
                onChange={handleInputChange}
                className={`block border border-gray-300 rounded-md px-4 py-2 mt-2 w-full ${errors.productManufacturer && 'border-red-500'}`}
                required
              />
              {errors.productManufacturer && <p className="text-red-500 text-xs italic">{errors.productManufacturer}</p>}
            </label>

            <label className="block mb-4">
              Product Quantity:
              <input
                type="text"
                name="productQuantity"
                value={updateData.productQuantity}
                onChange={handleInputChange}
                className={`block border border-gray-300 rounded-md px-4 py-2 mt-2 w-full ${errors.productQuantity && 'border-red-500'}`}
                required
              />
              {errors.productQuantity && <p className="text-red-500 text-xs italic">{errors.productQuantity}</p>}
            </label>

            <label className="block mb-4">
              Product Price:
              <input
                type="text"
                name="productPrice"
                value={updateData.productPrice}
                onChange={handleInputChange}
                className={`block border border-gray-300 rounded-md px-4 py-2 mt-2 w-full ${errors.productPrice && 'border-red-500'}`}
                required
              />
              {errors.productPrice && <p className="text-red-500 text-xs italic">{errors.productPrice}</p>}
            </label>

            <label className="block mb-4">
              Product Image:
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setUpdateData({ ...updateData, filename: e.target.files[0] });
                  }
                }}
                className="mt-2"
              />
            </label>

            <div>
              <button type="submit" className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded mr-4">Update Product</button>
              <button type="button" onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">Delete Product</button>
            </div>
          </form>
        )}
      </div>
      <NavBar/>
    </div>
    
  );
};

export default UpdateProduct;

