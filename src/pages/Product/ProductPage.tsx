import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import ProductList from "./ProductList";
import { getAllProducts } from "../../services/product.service";
import type { Product } from "../../services/product.service";

export interface ProductItem {
  id: string;
  imageUrl: string;
  name: string;
  price: string;
  description: string;
  stock: number;
  reviews: number;
  brand: string;
  brandLogo: string;
}

const ProductPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // Mapping product từ API -> UI ProductItem
  const mapApiProductToProductItem = (product: Product): ProductItem => ({
    id: product.id,
    imageUrl: product.photo || "",  // fallback nếu null
    name: product.name,
    price: product.price.toLocaleString() + " đ",
    description: product.description,
    stock: 0, // backend không có -> mặc định
    reviews: 0, // backend không có -> mặc định
    brand: product.brand_id || "Unknown",
    brandLogo: "", // backend không có -> để trống
  });
  

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getAllProducts();
        const mapped = data.map(mapApiProductToProductItem);
        setProducts(mapped);
      } catch (err) {
        setError("Failed to load products.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className={`transition-all duration-300 ${sidebarOpen ? "w-[240px]" : "w-0 overflow-hidden"}`}>
        {sidebarOpen && <Sidebar />}
      </div>

      {/* Main content */}
      <div className="flex-1">
        <Header toggleSidebar={toggleSidebar} />

        <div className="p-6">
          <div className="max-w-[1140px] mx-auto space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-neutral-800">Product Lists</h1>
              <button className="bg-blue-500 text-white px-5 py-2 rounded-md">
                Add New Product
              </button>
            </div>

            {/* Status */}
            {loading && <p>Loading products...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && products.length === 0 && <p>No products found.</p>}

            {/* Product list */}
            {!loading && products.length > 0 && <ProductList products={products} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;