import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchProducts } from "../../redux/slices/productSlice";
import { fetchBranches } from "../../redux/slices/branchSlice";
import { fetchCustomers } from "../../redux/slices/customerSlice";
import { addOrder } from "../../redux/slices/orderSlice";
import { useLoading } from "../../contexts/LoadingContext";
import type { RootState } from "../../redux/store";
import type { OrderCreateRequest } from "../../services/order.service";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../components/ui/select";

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

  const products = useAppSelector((state: RootState) => state.products.items);
  const branches = useAppSelector((state: RootState) => state.branches.items);
  const customers = useAppSelector((state: RootState) => state.customers.items);

  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [address, setAddress] = useState("");
  const [preorderTime, setPreorderTime] = useState("");
  const [orderType, setOrderType] = useState("AT STORE");
  const [status, setStatus] = useState("Processing");
  const [branchId, setBranchId] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchBranches());
    dispatch(fetchCustomers());
  }, [dispatch]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!selectedCustomerId) newErrors.customerId = "Required";
    if (!branchId) newErrors.branchId = "Required";
    if (cartItems.length === 0) newErrors.cart = "Cart cannot be empty";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddToCart = () => {
    if (!selectedProduct || quantity <= 0) return;
    const existingIndex = cartItems.findIndex((item) => item.id === selectedProduct);
    if (existingIndex !== -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += quantity;
      setCartItems(updated);
    } else {
      const product = products.find((p) => p.id === selectedProduct);
      if (product) {
        setCartItems([...cartItems, { id: product.id, name: product.name, quantity }]);
      }
    }
    setSelectedProduct("");
    setQuantity(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const orderData: OrderCreateRequest = {
        customer_id: selectedCustomerId,
        address,
        type: orderType,
        status,
        preorder_time: preorderTime,
        payment_method: "Cash",
        branch_id: branchId,
        cart: { items: cartItems },
      };
      await dispatch(addOrder(orderData)).unwrap();
      navigate("/order-list");
    } catch (error) {
      console.error("Failed to create order:", error);
      alert(t("orders.addError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 mx-auto space-y-6">
      <div
        className="text-sm text-blue-600 cursor-pointer"
        onClick={() => navigate("/order-list")}
      >
        ← {t("orders.orderList")}
      </div>

      <h1 className="text-3xl font-bold text-neutral-800">{t("orders.addNewOrder")}</h1>

      <div className="bg-white rounded-xl p-8 shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Select */}
            <div>
              <label className="text-sm font-medium block mb-1">
                {t("common.customer")} <span className="text-red-500">*</span>
              </label>
              <Select value={selectedCustomerId} onValueChange={setSelectedCustomerId}>
                <SelectTrigger className="w-full border border-neutral-300">
                  <SelectValue placeholder={t("common.selectCustomer")} />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((c) => (
                    <SelectItem key={c.customer_id} value={c.customer_id}>
                      {c.full_name} - {c.phone}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.customerId && <p className="text-red-500 text-xs">{errors.customerId}</p>}
            </div>

            {/* Address */}
            <div>
              <label className="text-sm font-medium block mb-1">{t("orders.address")}</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="text-sm w-full border border-neutral-300 rounded-md px-4 py-2"
              />
            </div>

            {/* Branch */}
            <div>
              <label className="text-sm font-medium block mb-1">{t("orders.branch")} <span className="text-red-500">*</span></label>
              <Select value={branchId} onValueChange={setBranchId}>
                <SelectTrigger className="w-full border border-neutral-300">
                  <SelectValue placeholder={t("orders.selectBranch")} />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((b) => (
                    <SelectItem key={b.id} value={b.id}>
                      {b.address}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.branchId && <p className="text-red-500 text-xs">{errors.branchId}</p>}
            </div>

            {/* Preorder Time */}
            <div>
              <label className="text-sm font-medium block mb-1">{t("orders.preorderTime")}</label>
              <input
                type="datetime-local"
                value={preorderTime}
                onChange={(e) => setPreorderTime(e.target.value)}
                className="text-sm w-full border border-neutral-300 rounded-md px-4 py-2"
              />
            </div>

            {/* Order Type */}
            <div>
              <label className="text-sm font-medium block mb-1">{t("orders.type")}</label>
              <Select value={orderType} onValueChange={setOrderType}>
                <SelectTrigger className="w-full border border-neutral-300">
                  <SelectValue placeholder={t("orders.type")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AT STORE">{t("orders.atStore")}</SelectItem>
                  <SelectItem value="ONLINE">{t("orders.online")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div>
              <label className="text-sm font-medium block mb-1">{t("orders.status")}</label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-full border border-neutral-300">
                  <SelectValue placeholder={t("orders.status")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Processing">{t("orders.processing")}</SelectItem>
                  <SelectItem value="Completed">{t("orders.completed")}</SelectItem>
                  <SelectItem value="Rejected">{t("orders.rejected")}</SelectItem>
                  <SelectItem value="On Hold">{t("orders.onHold")}</SelectItem>
                  <SelectItem value="In Transit">{t("orders.inTransit")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Cart Section */}
          <div className="space-y-3">
            <label className="text-base font-semibold">{t("orders.cart")}</label>

            <div className="flex flex-col md:flex-row md:items-end gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium block mb-1">{t("orders.product")}</label>
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger className="w-full border border-neutral-300">
                    <SelectValue placeholder={t("products.selectProduct")} />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium block mb-1">{t("orders.quantity")}</label>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full border border-neutral-300 rounded-md px-4 py-2"
                />
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md h-[42px]"
              >
                {t("orders.addProduct")}
              </button>
            </div>

            {cartItems.length > 0 && (
              <table className="w-full text-sm mt-4 border border-gray-200 rounded-md">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left px-3 py-2">{t("orders.product")}</th>
                    <th className="text-left px-3 py-2">{t("orders.quantity")}</th>
                    <th className="text-center px-3 py-2">{t("common.action")}</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, idx) => (
                    <tr key={idx} className="border-t border-gray-200">
                      <td className="px-3 py-2">{item.name}</td>
                      <td className="px-3 py-2">{item.quantity}</td>
                      <td className="px-3 py-2 text-center">
                        <button
                          type="button"
                          className="text-red-500 hover:underline text-xs"
                          onClick={() => {
                            const updated = cartItems.filter((_, i) => i !== idx);
                            setCartItems(updated);
                          }}
                        >
                          {t("common.remove")}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {errors.cart && <p className="text-red-500 text-xs">{errors.cart}</p>}
          </div>

          {/* Submit */}
          <div className="text-center pt-4">
            <button type="submit" className="bg-blue-500 text-white px-8 py-2 rounded-md hover:bg-blue-600">
              {t("orders.addOrder")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrder;
