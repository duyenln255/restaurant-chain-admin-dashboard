import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createFeedback, deleteFeedback } from "../../services/feedback.service";
import { fetchBranches } from "../../redux/slices/branchSlice";
import { fetchProducts } from "../../redux/slices/productSlice";
import { useLoading } from "../../contexts/LoadingContext";
import type { RootState } from "../../redux/store";


const AddFeedback: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { setLoading } = useLoading();
  const { t } = useTranslation(); // Không cần namespace
  const { items: branches } = useAppSelector((state: RootState) => state.branches);
  const { items: products } = useAppSelector((state: RootState) => state.products);

  const [status, setStatus] = useState<"published" | "hidden" | "pending">("pending");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [orderId, setOrderId] = useState("");
  const [productId, setProductId] = useState("");
  const [requestType, setRequestType] = useState("");
  const [description, setDescription] = useState("");
  const [branchId, setBranchId] = useState("");
  const [staffResponsible, setStaffResponsible] = useState("");
  const [staffFollow, setStaffFollow] = useState("");
  const [feedbackType, setFeedbackType] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    dispatch(fetchBranches());
    dispatch(fetchProducts());
  }, [dispatch]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!customerPhone.trim()) newErrors.customerPhone = "Required";
    if (!customerName.trim()) newErrors.customerName = "Required";
    if (!feedbackType.trim()) newErrors.feedbackType = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckPhone = () => {
    if (customerPhone.length >= 10) {
      setCustomerName("John Doe");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    try {
      setLoading(true);
      await createFeedback({
        customer_id: customerPhone,
        branch_id: branchId,
        type: feedbackType as "Complaint" | "Suggestion", // cần ép kiểu
        content: description
      });
      navigate("/feedback");
    } catch (error) {
      alert(t("feedback.addError"));
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <div className="main-content">
          <div className="dashboard-body p-6">
            <div className="mx-auto max-w-4xl w-full">
              <h1 className="text-2xl font-bold text-neutral-800 mb-6">
                {t("feedback.addNewFeedback")}
              </h1>

              <div className="bg-white rounded-xl p-8 shadow-md">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">{t("feedback.status")}</label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as any)}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white text-sm"
                      >
                        <option value="pending">{t("feedback.pending")}</option>
                        <option value="published">{t("feedback.published")}</option>
                        <option value="hidden">{t("feedback.hidden")}</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium mb-1">
                        {t("feedback.customerPhone")} <span className="text-red-500">*</span>
                      </label>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className="w-full sm:flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm"
                          placeholder="077-XXX-XXXX"
                        />
                        <button
                          type="button"
                          onClick={handleCheckPhone}
                          className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm"
                        >
                          {t("common.check")}
                        </button>
                      </div>
                      {errors.customerPhone && <p className="text-red-500 text-xs mt-1">{errors.customerPhone}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {t("feedback.customerName")} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
                        placeholder={`${t("common.enter")} ${t("feedback.customerName")}`}
                      />
                      {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">{t("feedback.orderCode")}</label>
                      <select
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white text-sm"
                      >
                        <option value="">{t("feedback.chooseOrders")}</option>
                        <option value="order1">Order #1</option>
                        <option value="order2">Order #2</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">{t("feedback.productCode")}</label>
                      <select
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white text-sm"
                      >
                        <option value="">{t("feedback.chooseProducts")}</option>
                        {products.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium mb-1">{t("feedback.customerRequest")}</label>
                      <select
                        value={requestType}
                        onChange={(e) => setRequestType(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white text-sm"
                      >
                        <option value="">{t("feedback.chooseRequest")}</option>
                        <option value="refund">{t("feedback.refund")}</option>
                        <option value="exchange">{t("feedback.exchange")}</option>
                        <option value="complaint">{t("feedback.complaint")}</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium mb-1">{t("feedback.description")}</label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 h-32 text-sm"
                        placeholder={`${t("common.enter")} ${t("feedback.description")}`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">{t("feedback.branchResponsible")}</label>
                      <select
                        value={branchId}
                        onChange={(e) => setBranchId(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white text-sm"
                      >
                        <option value="">{t("feedback.chooseBranch")}</option>
                        {branches.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.address}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">{t("feedback.staffResponsible")}</label>
                      <select
                        value={staffResponsible}
                        onChange={(e) => setStaffResponsible(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white text-sm"
                      >
                        <option value="">{t("feedback.chooseStaff")}</option>
                        <option value="staff1">Lenora Benson</option>
                        <option value="staff2">John Smith</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">{t("feedback.staffFollow")}</label>
                      <select
                        value={staffFollow}
                        onChange={(e) => setStaffFollow(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white text-sm"
                      >
                        <option value="">{t("feedback.chooseStaff")}</option>
                        <option value="staff1">Lenora Benson</option>
                        <option value="staff2">John Smith</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {t("feedback.type")} <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={feedbackType}
                        onChange={(e) => setFeedbackType(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white text-sm"
                      >
                        <option value="">{t("feedback.chooseType")}</option>
                        <option value="KHIẾU NẠI">{t("feedback.complaint")}</option>
                        <option value="GÓP Ý">{t("feedback.suggestion")}</option>
                        <option value="KHEN NGỢI">{t("feedback.praise")}</option>
                      </select>
                      {errors.feedbackType && <p className="text-red-500 text-xs mt-1">{errors.feedbackType}</p>}
                    </div>
                  </div>

                  <div className="text-center pt-4">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-8 py-2 rounded-md hover:bg-blue-600 text-sm"
                    >
                      {t("feedback.addFeedback")}
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

export default AddFeedback;
