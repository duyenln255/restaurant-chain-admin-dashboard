import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchBranchById, editBranch } from "../../redux/slices/branchSlice";
import { fetchBrands } from "../../redux/slices/brandSlice";
import { useLoading } from "../../contexts/LoadingContext";
import type { RootState } from "../../redux/store";

const EditBranch: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { setLoading } = useLoading();
  const { t } = useTranslation();
  const { selectedBranch, loading, error } = useAppSelector(
    (state: RootState) => state.branches
  );
  const { items: brands } = useAppSelector((state: RootState) => state.brands);

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [brand, setBrand] = useState("");
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      dispatch(fetchBranchById(id)).finally(() => {
        setLoading(false);
      });
    }
  }, [id]);

  useEffect(() => {
    if (selectedBranch) {
      setAddress(selectedBranch.address);
      setPhone(selectedBranch.phone);
      setBrand(selectedBranch.brand_id);
      setStatus(selectedBranch.status);
    }
  }, [selectedBranch]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!address.trim()) newErrors.address = "Required";
    if (!phone.trim()) newErrors.phone = "Required";
    if (!brand.trim()) newErrors.brand = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !id || !selectedBranch) return;

    try {
      setLoading(true);

      await dispatch(
        editBranch({
          id,
          branch: {
            brand_id: brand,
            address: address,
            phone: phone,
            status: status,
          },
        })
      ).unwrap();

      navigate("/branch");
    } catch (error) {
      console.error("Failed to update branch:", error);
      alert(t("branch.updateError"));
    } finally {
      setLoading(false);
    }
  };

  if (error)
    return (
      <div className="p-4 text-red-500">
        {t("common.error")}: {error}
      </div>
    );
  if (!selectedBranch && !loading)
    return (
      <div className="p-4 text-red-500">{t("branch.noBranchesFound")}</div>
    );

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <div className="main-content">
          <div className="dashboard-body p-6">
            <div className="mx-auto space-y-6">
              <div
                className="text-sm text-blue-600 cursor-pointer"
                onClick={() => navigate("/branch")}
              >
                ← {t("branch.branchList")}
              </div>

              <h1 className="text-3xl font-bold text-neutral-800">
                {t("branch.editBranch")}
              </h1>

              <div className="bg-white rounded-xl p-8 shadow-md px-[250px]">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Brand */}
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-sm font-medium">
                          {t("branch.brand")}{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        {errors.brand && (
                          <span className="text-red-500 text-xs">
                            {errors.brand}
                          </span>
                        )}
                      </div>
                      <select
                        className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                      >
                        <option value="">{t("branch.search.allBrands")}</option>
                        {brands.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Status */}
                    <div>
                      <label className="block text-sm mb-1 font-medium">
                        {t("branch.status")}
                      </label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border border-gray-300 rounded-md h-[42px] px-4 text-sm text-gray-700 bg-white w-full"
                      >
                        <option value="Active">{t("branch.active")}</option>
                        <option value="Inactive">{t("branch.inactive")}</option>
                        <option value="Prepare">Prepare</option>
                      </select>
                    </div>

                    {/* Phone */}
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-sm font-medium">
                          {t("branch.phone")}{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        {errors.phone && (
                          <span className="text-red-500 text-xs">
                            {errors.phone}
                          </span>
                        )}
                      </div>
                      <input
                        type="tel"
                        placeholder={`${t("common.enter")} ${t("branch.phone")}`}
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2">
                      <div className="flex justify-between mb-1">
                        <label className="text-sm font-medium">
                          {t("branch.address")}{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        {errors.address && (
                          <span className="text-red-500 text-xs">
                            {errors.address}
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder={`${t("common.enter")} ${t("branch.address")}`}
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="text-center pt-4">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-8 py-2 rounded-md hover:bg-blue-600"
                    >
                      {t("common.save")}
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

export default EditBranch;
