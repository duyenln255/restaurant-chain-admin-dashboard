import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addOrder } from "../../redux/slices/orderSlice";
import { fetchProducts } from "../../redux/slices/productSlice";
import { useLoading } from "../../contexts/LoadingContext";
import type { RootState } from "../../redux/store";
import type { OrderCreateRequest } from "../../services/order.service.tsx";

interface CartItem {
  id: string;
  name: string;
  quantity: number;
}

const AddOrder: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { setLoading } = useLoading();
  const { t } = useTranslation();
  const { items: products } = useAppSelector(
    (state: RootState) => state.products
  );

  const [customerPhone, setCustomerPhone] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [orderType, setOrderType] = useState<"AT STORE" | "ONLINE">("AT STORE");
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState<
    "Completed" | "Processing" | "Rejected" | "On Hold" | "In Transit"
  >("Processing");
  const [voucher, setVoucher] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!customerPhone.trim()) newErrors.customerPhone = "Required";
    if (!customerName.trim()) newErrors.customerName = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckPhone = () => {
    // Simulate checking phone number in database
    console.log("Checking phone:", customerPhone);
    // In a real app, you would fetch customer data based on phone number
    // For now, we'll just set a dummy name if phone is valid
    if (customerPhone.length >= 10) {
      setCustomerName("John Doe");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);

      const orderData: OrderCreateRequest = {
        full_name: customerName,
        address: address,
        type: orderType,
        status: status,
        cart: {
          items: [
            {
              id: selectedProduct || "1",
              name:
                products.find((p) => p.id === selectedProduct)?.name ||
                "Product",
              quantity: quantity,
            },
          ],
        },
      };

      await dispatch(addOrder(orderData)).unwrap();
      navigate("/order-list");
    } catch (error) {
      console.error("Failed to add order:", error);
      alert(t("orders.deleteError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <div className="main-content">
          <div className="dashboard-body p-6">
            <div className="mx-auto">
              <h1 className="text-2xl font-bold text-neutral-800 mb-6">
                {t("orders.addNewOrder")}
              </h1>

              <div className="bg-white rounded-xl p-8 shadow-md">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Customer Phone */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {t("orders.phone")} {t("orders.customer")}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="flex">
                        <input
                          type="text"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className="flex-1 border border-gray-300 rounded-l-md px-4 py-2"
                          placeholder="XXX-XXX-XXXX"
                        />
                        <button
                          type="button"
                          onClick={handleCheckPhone}
                          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
                        >
                          {t("common.check")}
                        </button>
                      </div>
                      {errors.customerPhone && (
                        <span className="text-red-500 text-xs mt-1">
                          {errors.customerPhone}
                        </span>
                      )}
                    </div>

                    {/* Customer Name */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {t("orders.customer")} {t("orders.name")}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                        placeholder={`${t("common.enter")} ${t("orders.name")}`}
                      />
                      {errors.customerName && (
                        <span className="text-red-500 text-xs mt-1">
                          {errors.customerName}
                        </span>
                      )}
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {t("orders.address")}
                      </label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                        placeholder={`${t("common.enter")} ${t("orders.address")}`}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {t("employee.email")}
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                        placeholder={`${t("common.enter")} ${t("employee.email")}`}
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {t("products.category")}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white"
                      >
                        <option value="">
                          {t("products.search.allCategories")}
                        </option>
                        <option value="coffee">Coffee</option>
                        <option value="tea">Tea</option>
                        <option value="pastry">Pastry</option>
                      </select>
                    </div>

                    {/* Product */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {t("orders.products")}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white"
                      >
                        <option value="">
                          {t("products.search.allProducts")}
                        </option>
                        {products.map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Order Type */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {t("orders.orderType")}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={orderType}
                        onChange={(e) =>
                          setOrderType(e.target.value as "AT STORE" | "ONLINE")
                        }
                        className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white"
                      >
                        <option value="">{t("orders.search.allTypes")}</option>
                        <option value="AT STORE">AT STORE</option>
                        <option value="ONLINE">ONLINE</option>
                      </select>
                    </div>

                    {/* Quantity */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {t("orders.quantity")}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                        min="1"
                      />
                    </div>

                    {/* Status */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {t("orders.status")}
                      </label>
                      <select
                        value={status}
                        onChange={(e) =>
                          setStatus(
                            e.target.value as
                              | "Completed"
                              | "Processing"
                              | "Rejected"
                              | "On Hold"
                              | "In Transit"
                          )
                        }
                        className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white"
                      >
                        <option value="Processing">
                          {t("orders.processing")}
                        </option>
                        <option value="Completed">
                          {t("orders.completed")}
                        </option>
                        <option value="Rejected">
                          {t("orders.cancelled")}
                        </option>
                        <option value="On Hold">{t("orders.onHold")}</option>
                        <option value="In Transit">
                          {t("orders.shipped")}
                        </option>
                      </select>
                    </div>

                    {/* Voucher */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {t("vouchers.title")}
                      </label>
                      <select
                        value={voucher}
                        onChange={(e) => setVoucher(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white"
                      >
                        <option value="">
                          {t("vouchers.search.allTypes")}
                        </option>
                        <option value="SUMMER10">SUMMER10 - 10% OFF</option>
                        <option value="WELCOME20">WELCOME20 - 20% OFF</option>
                      </select>
                    </div>

                    {/* Notes */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">
                        {t("orders.notes")}
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 h-32"
                        placeholder={`${t("common.enter")} ${t("orders.notes")}`}
                      />
                    </div>
                  </div>

                  <div className="text-center pt-4">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-8 py-2 rounded-md hover:bg-blue-600"
                    >
                      {t("orders.addOrder")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOrder;
