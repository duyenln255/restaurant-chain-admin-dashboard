import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { ProductItem } from "../../types/ProductItem";

interface ProductListProps {
  products: ProductItem[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginatedProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="max-w-[1140px] mx-auto space-y-6">
      {/* ✅ Layout sử dụng flex + justify-between để căn đều */}
      <div className="flex flex-wrap gap-4">
        {paginatedProducts.map((product) => (
          <div key={product.id} className="w-[32%] min-w-[280px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* ✅ Pagination - Hiển thị khi có hơn 6 sản phẩm */}
      {products.length > itemsPerPage && (
        <div className="flex justify-between items-center mt-6 bg-gray-100 p-4 rounded-md">
          {/* ✅ Hiển thị số lượng sản phẩm - Căn trái */}
          <p className="text-gray-600 text-sm">
            Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, products.length)} of {products.length}
          </p>

          {/* ✅ Pagination - Căn phải */}
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              ◀
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded-md ${
                  currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              ▶
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
