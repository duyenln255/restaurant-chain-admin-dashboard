import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import ProductList from "./ProductList";
import { getAllProducts } from "../../services/product.service";
import type { Product } from "../../services/product.service";
import type { ProductItem } from "../../types/ProductItem";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import type { RootState } from '../../redux/store';
import { fetchProducts } from '../../redux/slices/productSlice';


const ProductPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: rawProducts, loading, error } = useAppSelector(
    (state: RootState) => state.products
  );

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // Mapping Product -> ProductItem (UI View Model)
  const mappedProducts = useMemo<ProductItem[]>(
    () =>
      rawProducts.map((product: Product) => ({
        id: product.id,
        imageUrl: product.photo || "",
        name: product.name,
        price: product.price.toLocaleString() + " đ",
        description: product.description,
        stock: 0,
        reviews: 0,
        brand: product.brand_id || "Unknown",
        brandLogo: "",
      })),
    [rawProducts]
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen">
      <div className={`transition-all duration-300 ${sidebarOpen ? "w-[240px]" : "w-0 overflow-hidden"}`}>
        {sidebarOpen && <Sidebar />}
      </div>

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
            {!loading && mappedProducts.length === 0 && <p>No products found.</p>}

            {/* Product list */}
            {!loading && mappedProducts.length > 0 && (
              <ProductList products={mappedProducts} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;