import React, { useState } from "react";
import ProductCard from "./ProductCard";
import type { ProductItem } from "../../types/ProductItem";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "../../components/ui/pagination";

interface ProductListProps {
  products: ProductItem[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* PAGINATION */}
      {products.length > itemsPerPage && (
        <div className="flex flex-col gap-4 items-center mt-6">
          <p className="text-gray-600 text-sm">
            Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
            {Math.min(currentPage * itemsPerPage, products.length)} of {products.length}
          </p>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  aria-disabled={currentPage === 1}
                  href="#"
                />
              </PaginationItem>

              {/* Optional: Show first page + ellipsis if too many pages */}
              {totalPages > 7 && currentPage > 4 && (
                <>
                  <PaginationItem>
                    <PaginationLink onClick={() => setCurrentPage(1)} href="#">
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                </>
              )}

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) =>
                  totalPages <= 7 ||
                  (page >= currentPage - 2 && page <= currentPage + 2)
                )
                .map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={currentPage === page}
                      onClick={() => setCurrentPage(page)}
                      href="#"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

              {totalPages > 7 && currentPage < totalPages - 3 && (
                <>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => setCurrentPage(totalPages)}
                      href="#"
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  aria-disabled={currentPage === totalPages}
                  href="#"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default ProductList;
