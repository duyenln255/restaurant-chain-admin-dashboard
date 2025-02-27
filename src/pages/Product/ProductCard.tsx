import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ProductItem } from "../../types/ProductItem";

const ProductCard: React.FC<{ product: ProductItem }> = ({ product }) => {
  const handleEdit = () => {
    console.log("Edit Product:", product);
  };

  const handleDelete = () => {
    console.log("Delete Product:", product);
  };

  return (
    <div className="w-full flex flex-col bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      {/* ✅ Logo thương hiệu */}
      <div className="relative w-full aspect-[4/3] flex justify-center items-center bg-gray-100">
        <img 
          src={`/assets/images/${product.imageUrl}`}
          alt={product.name} className="w-full h-full object-cover" />
        <img
          src={`/assets/images/${product.brandLogo}`} 
          alt={product.brand}
          className="absolute top-2 right-2 w-10 h-10 rounded-full border bg-white p-1"
        />
      </div>

      {/* ✅ Thông tin sản phẩm */}
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
        <p className="text-blue-600 font-bold text-sm mt-1">{product.price} VND</p>
        <p className="text-gray-600 text-sm mt-1">
          {product.description} <span className="text-blue-500">Xem thêm</span>
        </p>

        {/* ✅ Đánh giá sản phẩm */}
        <div className="flex items-center text-yellow-500 mt-2">
          {"★".repeat(5)}
          <span className="text-gray-500 text-sm ml-1">({product.reviews})</span>
        </div>

        {/* ✅ Số lượng tồn kho */}
        <p className="text-sm text-gray-500 mt-1">SL: {product.stock}</p>
      </div>

      {/* ✅ Nút chức năng (canh đều, padding chuẩn) */}
      <div className="flex justify-between px-4 pb-4 space-x-2">
        <button
          onClick={handleEdit}
          className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium border rounded-md bg-blue-500 text-white hover:bg-blue-600 flex-1"
        >
          <FontAwesomeIcon icon={faPen} size="sm" />
          Edit Product
        </button>

        <button
          onClick={handleDelete}
          className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium border rounded-md bg-red-500 text-white hover:bg-red-600 flex-1"
        >
          <FontAwesomeIcon icon={faTrash} size="sm" />
          Delete Product
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
