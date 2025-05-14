import React, { useState } from "react";
import styles from "./AddCustomer.module.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../redux/hooks";
import { addCustomer } from "../../redux/slices/customerSlice";
import { useLoading } from "../../contexts/LoadingContext";

const AddCustomer: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { setLoading } = useLoading();
  const { t } = useTranslation();

  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoBase64, setPhotoBase64] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!fullName.trim()) newErrors.fullName = "Required";
    if (!email.trim()) newErrors.email = "Required";
    if (!password.trim()) newErrors.password = "Required";
    if (!phone.trim()) newErrors.phone = "Required";
    if (!photo) newErrors.photo = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhoto(file);
      try {
        const base64 = await convertFileToBase64(file);
        setPhotoBase64(base64);
      } catch (error) {
        console.error("Error converting file to base64:", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);

      await dispatch(
        addCustomer({
          full_name: fullName,
          username: email.split("@")[0], // Generate username from email
          password: password,
          role: "customer",
          email: email,
          phone: phone,
          gender: gender || "Not specified",
          address: "",
          member_information_id: "",
          brand_id: "",
          status: "Active",
        })
      ).unwrap();

      navigate("/customer");
    } catch (error) {
      console.error("Failed to add customer:", error);
      alert(t("customer.deleteError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        {/* <Sidebar /> */}
        <div className="main-content">
          {/* <Header /> */}
          <div className="dashboard-body p-6">
            <div className=" mx-auto space-y-6">
              {/* Breadcrumb / Back */}
              <div
                className="text-sm text-blue-600 cursor-pointer"
                onClick={() => navigate("/customer")}
              >
                ← {t("customer.customerList")}
              </div>

              <h1 className="text-3xl font-bold text-neutral-800">
                {t("customer.addNewCustomer")}
              </h1>

              <div className="bg-white rounded-xl p-8 shadow-md px-[250px]">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Upload Photo */}
                  <div className="flex flex-col items-center space-y-2">
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      <div className="w-[72px] h-[72px] rounded-full bg-gray-100 flex items-center justify-center">
                        <img
                          src="/assets/icons/camera-icon.png"
                          alt="Upload"
                          className="w-6 h-6 object-contain"
                        />
                      </div>
                      <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoChange}
                      />
                    </label>
                    {/* Label + Error inline */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-blue-600 font-medium">
                        {t("products.uploadImage")}{" "}
                        <span className="text-red-500">*</span>
                      </span>
                      {errors.photo && (
                        <span className="text-red-500 text-xs">
                          {errors.photo}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Input Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-sm font-medium">
                          {t("customer.fullName")}{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        {errors.fullName && (
                          <span className="text-red-500 text-xs">
                            {errors.fullName}
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-sm font-medium">
                          {t("common.password")}{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        {errors.password && (
                          <span className="text-red-500 text-xs">
                            {errors.password}
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          autoComplete="new-password"
                        />
                        <img
                          src={`/assets/icons/${showPassword ? "eye-on.png" : "eye-off.png"}`}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                          alt="Toggle Password"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-sm font-medium">
                          {t("customer.email")}{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        {errors.email && (
                          <span className="text-red-500 text-xs">
                            {errors.email}
                          </span>
                        )}
                      </div>
                      <input
                        type="email"
                        placeholder="student@example.com"
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-sm font-medium">
                          {t("customer.phone")}{" "}
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
                        placeholder="Enter your phone number"
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-1 font-medium">
                        {t("customer.dateOfBirth")}
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className={`w-full border border-gray-300 rounded-md px-4 py-2 ${styles.dateInput}`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-1 font-medium">
                        {t("customer.gender")}
                      </label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="border border-gray-300 rounded-md h-[42px] px-4 text-sm text-gray-700 bg-white w-full custom-select"
                      >
                        <option value="">
                          {t("customer.search.allStatuses")}
                        </option>
                        <option value="Male">{t("customer.male")}</option>
                        <option value="Female">{t("customer.female")}</option>
                        <option value="Other">{t("customer.other")}</option>
                      </select>
                    </div>
                  </div>

                  <div className="text-center pt-4">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-8 py-2 rounded-md hover:bg-blue-600"
                    >
                      {t("customer.addCustomer")}
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

export default AddCustomer;
