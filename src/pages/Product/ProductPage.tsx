import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import ProductList from "./ProductList";

const products = [
  {
    id: "001",
    imageUrl: "Coffeemocha.png",
    name: "Coffee Mocha",
    price: "32.000",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    stock: 10,
    reviews: 131,
    brand: "Starbucks",
    brandLogo: "Starbuck.png",
  },
  {
    id: "002",
    imageUrl: "Coffeemocha.png",
    name: "Coffee Latte",
    price: "28.000",
    description: "A classic coffee with rich milk foam, smooth and flavorful.",
    stock: 7,
    reviews: 98,
    brand: "Highland Coffee",
    brandLogo: "Highland.png",
  },
  {
    id: "001",
    imageUrl: "Coffeemocha.png",
    name: "Coffee Mocha",
    price: "32.000",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    stock: 10,
    reviews: 131,
    brand: "Starbucks",
    brandLogo: "Starbuck.png",
  },
  {
    id: "002",
    imageUrl: "Coffeemocha.png",
    name: "Coffee Latte",
    price: "28.000",
    description: "A classic coffee with rich milk foam, smooth and flavorful.",
    stock: 7,
    reviews: 98,
    brand: "Highland Coffee",
    brandLogo: "Highland.png",
  },
  {
    id: "001",
    imageUrl: "Coffeemocha.png",
    name: "Coffee Mocha",
    price: "32.000",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    stock: 10,
    reviews: 131,
    brand: "Starbucks",
    brandLogo: "Starbuck.png",
  },
  {
    id: "002",
    imageUrl: "Coffeemocha.png",
    name: "Coffee Latte",
    price: "28.000",
    description: "A classic coffee with rich milk foam, smooth and flavorful.",
    stock: 7,
    reviews: 98,
    brand: "Highland Coffee",
    brandLogo: "Highland.png",
  },
  {
    id: "001",
    imageUrl: "Coffeemocha.png",
    name: "Coffee Mocha",
    price: "32.000",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    stock: 10,
    reviews: 131,
    brand: "Starbucks",
    brandLogo: "Starbuck.png",
  },
  {
    id: "002",
    imageUrl: "Coffeemocha.png",
    name: "Coffee Latte",
    price: "28.000",
    description: "A classic coffee with rich milk foam, smooth and flavorful.",
    stock: 7,
    reviews: 98,
    brand: "Highland Coffee",
    brandLogo: "Highland.png",
  },
];

const ProductPage: React.FC = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <Sidebar />
        <div className="main-content">
          <Header />
          <div className="dashboard-body p-6">
            <div className="max-w-[1140px] mx-auto space-y-4">

              {/* Header + Buttons */}
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-neutral-800">Products - <span className="text-orange-600">Coffee</span></h1>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 border rounded-md bg-red-500 text-white hover:bg-red-600">
                    Delete All
                  </button>
                  <button className="px-4 py-2 border rounded-md bg-blue-500 text-white hover:bg-blue-600">
                    Add Product
                  </button>
                </div>
              </div>

              {/* Product List */}
              <ProductList products={products} />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
